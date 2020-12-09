import { BlockMove } from "../../../alg";
import {
  Combine,
  KPuzzleDefinition,
  stateForBlockMove,
  SVG,
  Transformation,
} from "../../../kpuzzle";
import {
  PositionDispatcher,
  PositionListener,
} from "../../animation/cursor/AlgCursor";
import { PuzzlePosition } from "../../animation/cursor/CursorTypes";
import { RenderScheduler } from "../../animation/RenderScheduler";
import { ManagedCustomElement } from "../element/ManagedCustomElement";
import { customElementsShim } from "../element/node-custom-element-shims";
import { twisty2DSVGCSS } from "./Twisty2DSVGView.css";
import { TwistyViewerElement } from "./TwistyViewerElement";

// <twisty-2d-svg>
export class Twisty2DSVG
  extends ManagedCustomElement
  implements TwistyViewerElement, PositionListener {
  private definition: KPuzzleDefinition;
  private svg: SVG;
  private scheduler = new RenderScheduler(this.render.bind(this));
  constructor(
    cursor?: PositionDispatcher,
    def?: KPuzzleDefinition,
    svgSource?: string,
  ) {
    super();
    this.addCSS(twisty2DSVGCSS);

    this.definition = def!;
    this.svg = new SVG(this.definition, svgSource!); // TODO
    this.addElement(this.svg.element);
    cursor!.addPositionListener(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  onPositionChange(position: PuzzlePosition): void {
    if (position.movesInProgress.length > 0) {
      const move = position.movesInProgress[0].move as BlockMove;

      const def = this.definition;
      const partialMove = new BlockMove(
        move.outerLayer,
        move.innerLayer,
        move.family,
        move.amount * position.movesInProgress[0].direction,
      );
      const newState = Combine(
        def,
        position.state as Transformation,
        stateForBlockMove(def, partialMove),
      );
      // TODO: move to render()
      this.svg.draw(
        this.definition,
        position.state as Transformation,
        newState,
        position.movesInProgress[0].fraction,
      );
    } else {
      this.svg.draw(this.definition, position.state as Transformation);
    }
  }

  scheduleRender(): void {
    this.scheduler.requestAnimFrame();
  }

  private render(): void {
    /*...*/
  }
}

customElementsShim.define("twisty-2d-svg", Twisty2DSVG);
