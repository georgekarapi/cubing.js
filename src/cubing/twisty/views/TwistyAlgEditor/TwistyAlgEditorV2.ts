/**
 * Warning: the current implementation of <twisty-alg-editor-v2> is *not good*,
 * but it is *good enough*. The important parts is that:
 *
 * - The editor can be used in apps without much effort.
 * - The editor handles alg validation and move highlighting *okay* when not
 *   connected to a `<twisty-player>`.
 * - The editor stays in sync if it's connected to a `<twisty-player>`.
 *
 * The current implementation still has some race conditions and edge cases. A
 * proper rewrite with a better model would be very welcome.
 */

import type { ExperimentalParsed } from "../../../alg";
import { Alg, Move, Pause } from "../../../alg";
import type { Parsed } from "../../../alg/parse";
import type { AlgProp, AlgWithIssues } from "../../model/depth-0/AlgProp";
import type { CurrentLeavesSimplified } from "../../model/depth-9/CurrentLeavesSimplified";
import { ClassListManager } from "../../old/dom/element/ClassListManager";
import { ManagedCustomElement } from "../../old/dom/element/ManagedCustomElement";
import { customElementsShim } from "../../old/dom/element/node-custom-element-shims";
import { TwistyPlayer } from "../TwistyPlayer";
import { HighlightInfo, TwistyAlgEditorModel } from "./model";
import { twistyAlgEditorCSS } from "./TwistyAlgEditor.css_";

const ATTRIBUTE_FOR_TWISTY_PLAYER = "for-twisty-player";
const ATTRIBUTE_PLACEHOLDER = "placeholder";
const ATTRIBUTE_TWISTY_PLAYER_PROP = "twisty-player-prop";

type TwistyPlayerAlgProp = "algProp" | "setupProp";

export class TwistyAlgEditorV2 extends ManagedCustomElement {
  model = new TwistyAlgEditorModel();

  // #alg: Alg = new Alg();
  #textarea: HTMLTextAreaElement = document.createElement("textarea");
  #carbonCopy: HTMLDivElement = document.createElement("div");
  #carbonCopyPrefix: HTMLSpanElement = document.createElement("span");
  #carbonCopyHighlight: HTMLSpanElement = document.createElement("span");
  #carbonCopySuffix: HTMLSpanElement = document.createElement("span");

  // #textareaClassListManager: ClassListManager<"none" | "warning" | "error"> =
  //   new ClassListManager(this, "issue-", ["none", "warning", "error"]);

  #textareaClassListValidForPuzzleManager: ClassListManager<
    "none" | "warning" | "error"
  > = new ClassListManager(this, "valid-for-puzzle-", [
    "none",
    "warning",
    "error",
  ]);

  #twistyPlayer: TwistyPlayer | null = null;
  #twistyPlayerProp: TwistyPlayerAlgProp;
  get #algProp(): AlgProp | null {
    if (this.#twistyPlayer === null) {
      return null;
    } else {
      return this.#twistyPlayer.experimentalModel[this.#twistyPlayerProp];
    }
  }

  constructor(options?: {
    twistyPlayer?: TwistyPlayer;
    twistyPlayerProp?: TwistyPlayerAlgProp;
  }) {
    super();
    this.#carbonCopy.classList.add("carbon-copy");
    this.addElement(this.#carbonCopy);
    this.#textarea.rows = 1;
    this.addElement(this.#textarea);
    this.#carbonCopyPrefix.classList.add("prefix");
    this.#carbonCopy.appendChild(this.#carbonCopyPrefix);
    this.#carbonCopyHighlight.classList.add("highlight");
    this.#carbonCopy.appendChild(this.#carbonCopyHighlight);
    this.#carbonCopySuffix.classList.add("suffix");
    this.#carbonCopy.appendChild(this.#carbonCopySuffix);

    // Prevent iOS from defaulting to smart quotes.
    this.#textarea.setAttribute("spellcheck", "false");

    this.addCSS(twistyAlgEditorCSS);

    // TODO: What set of events should we register? `change`? `keydown`?
    this.#textarea.addEventListener("input", () => this.onInput());
    this.#textarea.addEventListener("blur", () => this.onBlur());
    document.addEventListener("selectionchange", () =>
      this.onSelectionChange(),
    );

    if (options?.twistyPlayer) {
      this.twistyPlayer = options.twistyPlayer;
    }
    this.#twistyPlayerProp = options?.twistyPlayerProp ?? "algProp";

    this.model.leafToHighlight.addFreshListener(
      (highlightInfo: HighlightInfo | null) => {
        if (highlightInfo) {
          this.highlightLeaf(highlightInfo.leafInfo.leaf);
        }
      },
    );
  }

  // TODO
  set algString(s: string) {
    this.#textarea.value = s;
    this.onInput();
  }

  // TODO: remove?
  get algString(): string {
    return this.#textarea.value;
  }

  // To we need a getter?
  set placeholder(placeholderText: string) {
    this.#textarea.placeholder = placeholderText;
  }

  onInput(): void {
    this.#carbonCopyHighlight.hidden = true;
    this.highlightLeaf(null);

    // TODO: This is a hack so that the you don't get a warning when the cursor
    // is after the space while typing `R U`. It would be nice to have something
    // cursor-aware that can also ignore whitespace warnings (or other syntax
    // errors due to normal input) adjacent to the cursor when it's in the
    // middle, but this is suffuciently useful for now.
    const endTrimmed = this.#textarea.value.trimEnd();
    this.model.valueProp.set(endTrimmed);
    this.#algProp?.set(endTrimmed);
  }

  async onSelectionChange(): Promise<void> {
    if (
      document.activeElement !== this ||
      this.shadow.activeElement !== this.#textarea
    ) {
      return;
    }
    if (this.#twistyPlayerProp !== "algProp") {
      return;
    }

    const { selectionStart, selectionEnd } = this.#textarea;
    this.model.selectionProp.set({
      selectionStart,
      selectionEnd,
    });
  }

  async onBlur(): Promise<void> {
    // TODO: Figure out how not to make the cursor jump.
    // const parsed = Alg.fromString(this.algString);
    // this.algString = parsed.toString();
    // const [currentLeavesSimplified, indexer] = await Promise.all([
    //   this.#twistyPlayer!.model.currentLeavesSimplifiedProp.get(),
    //   this.#twistyPlayer!.model.indexerProp.get(),
    // ]);
    // const leaf = indexer.getAnimLeaf(currentLeavesSimplified.stateIndex);
    // this.highlightLeaf(leaf as Parsed<Move | Pause> | null);
  }

  setAlgIssueClassForPuzzle(issues: "none" | "warning" | "error") {
    this.#textareaClassListValidForPuzzleManager.setValue(issues);
  }

  // `white-space: pre;` mostly matches the formatting of the `<textarea>`, *except* when we end with a newline.
  // So we add an space to ensure that there is a character on the final line (that is very unlikely to trigger extra line wrapping).
  #padSuffix(s: string): string {
    return s.endsWith("\n") ? s + " " : s;
  }

  #highlightedLeaf: ExperimentalParsed<Move | Pause> | null = null;
  // TODO: support a primary highlighted move and secondary ones.
  highlightLeaf(leaf: ExperimentalParsed<Move | Pause> | null): void {
    if (leaf === null) {
      this.#carbonCopyPrefix.textContent = "";
      this.#carbonCopyHighlight.textContent = "";
      this.#carbonCopySuffix.textContent = this.#padSuffix(
        this.#textarea.value,
      );
      return;
    }
    if (leaf === this.#highlightedLeaf) {
      return;
    }
    this.#highlightedLeaf = leaf;
    this.#carbonCopyPrefix.textContent = this.#textarea.value.slice(
      0,
      leaf.startCharIndex,
    );
    this.#carbonCopyHighlight.textContent = this.#textarea.value.slice(
      leaf.startCharIndex,
      leaf.endCharIndex,
    );
    this.#carbonCopySuffix.textContent = this.#padSuffix(
      this.#textarea.value.slice(leaf.endCharIndex),
    );
    this.#carbonCopyHighlight.hidden = false;
  }

  get twistyPlayer(): TwistyPlayer | null {
    return this.#twistyPlayer;
  }

  // TODO: spread out this impl over private methods instead of self-listeners.
  set twistyPlayer(twistyPlayer: TwistyPlayer | null) {
    if (this.#twistyPlayer) {
      // TODO: support reassigment/clearing
      console.warn("twisty-player reassignment/clearing is not supported");
      return;
    }
    this.#twistyPlayer = twistyPlayer;
    if (!twistyPlayer) {
      return;
    }
    (async () => {
      this.algString = this.#algProp
        ? (await this.#algProp.get()).alg.toString()
        : "";
    })();

    if (this.#twistyPlayerProp === "algProp") {
      // this.model.leafToHighlight.addFreshListener(
      //   this.highlightLeaf.bind(this),
      // );

      // TODO: listen to puzzle prop?
      this.#twistyPlayer?.experimentalModel.puzzleAlgProp.addFreshListener(
        (algWithIssues: AlgWithIssues) => {
          // console.log(JSON.stringify(algWithIssues));
          if (algWithIssues.issues.errors.length === 0) {
            this.setAlgIssueClassForPuzzle(
              // TODO: Allow trailing spaces.
              algWithIssues.issues.warnings.length === 0 ? "none" : "warning",
            );
            const newAlg = algWithIssues.alg;
            const oldAlg = Alg.fromString(this.algString);
            if (!newAlg.isIdentical(oldAlg)) {
              this.algString = newAlg.toString();
              this.onInput();
            } else {
              // this.model.algInputProp.set(oldAlg);
            }
          } else {
            this.setAlgIssueClassForPuzzle("error");
          }
        },
      );

      this.model.leafToHighlight.addFreshListener(
        async (highlightInfo: HighlightInfo | null) => {
          if (highlightInfo === null) {
            return;
          }
          // TODO: This indexer can be out of date!
          const [indexer, timestampRequest] = await Promise.all([
            await twistyPlayer.experimentalModel.indexerProp.get(),
            await twistyPlayer.experimentalModel.timestampRequestProp.get(),
          ]);
          if (timestampRequest === "end") {
            return;
          }
          const moveStartTimestamp = indexer.indexToMoveStartTimestamp(
            highlightInfo.leafInfo.idx,
          );
          const duration = indexer.moveDuration(highlightInfo.leafInfo.idx);

          let newTimestamp: number;
          switch (highlightInfo.where) {
            case "before":
              newTimestamp = moveStartTimestamp;
              break;
            case "start":
            case "inside":
              newTimestamp = moveStartTimestamp + duration / 4;
              break;
            case "end":
            case "after":
              newTimestamp = moveStartTimestamp + duration;
              break;
            default:
              console.log("invalid where");
              throw new Error("Invalid where!");
          }
          twistyPlayer.experimentalModel.timestampRequestProp.set(newTimestamp);
        },
      );

      twistyPlayer.experimentalModel.currentLeavesSimplifiedProp.addFreshListener(
        async (currentLeavesSimplified: CurrentLeavesSimplified) => {
          const indexer =
            await twistyPlayer.experimentalModel.indexerProp.get();
          const leaf = indexer.getAnimLeaf(currentLeavesSimplified.stateIndex);
          this.highlightLeaf(leaf as Parsed<Move | Pause> | null);
        },
      );
    }
  }

  protected attributeChangedCallback(
    attributeName: string,
    _oldValue: string,
    newValue: string,
  ): void {
    switch (attributeName) {
      case ATTRIBUTE_FOR_TWISTY_PLAYER:
        const elem = document.getElementById(newValue);
        if (!elem) {
          console.warn(`${ATTRIBUTE_FOR_TWISTY_PLAYER}= elem does not exist`);
          return;
        }
        if (!(elem instanceof TwistyPlayer)) {
          // TODO: avoid assuming single instance of lib?
          console.warn(`${ATTRIBUTE_FOR_TWISTY_PLAYER}=is not a twisty-player`);
          return;
        }
        this.twistyPlayer = elem;
        return;
      case ATTRIBUTE_PLACEHOLDER:
        this.placeholder = newValue;
        return;
      case ATTRIBUTE_TWISTY_PLAYER_PROP:
        if (this.#twistyPlayer) {
          console.log("cannot set prop");
          throw new Error("cannot set prop after twisty player");
        }
        this.#twistyPlayerProp = newValue as TwistyPlayerAlgProp;
        return;
    }
  }

  static get observedAttributes(): string[] {
    return [
      ATTRIBUTE_FOR_TWISTY_PLAYER,
      ATTRIBUTE_PLACEHOLDER,
      ATTRIBUTE_TWISTY_PLAYER_PROP,
    ];
  }
}

customElementsShim.define("twisty-alg-editor-v2", TwistyAlgEditorV2);
