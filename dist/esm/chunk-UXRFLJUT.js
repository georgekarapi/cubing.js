import {
  from
} from "./chunk-AJS6B74K.js";

// src/cubing/twisty/debug.ts
var twistyDebugGlobals = {
  shareAllNewRenderers: "auto",
  showRenderStats: false
};
function setTwistyDebug(options) {
  for (const [key, value] of Object.entries(options)) {
    if (key in twistyDebugGlobals) {
      twistyDebugGlobals[key] = value;
    }
  }
}

// src/cubing/twisty/model/PromiseFreshener.ts
var StaleDropper = class {
  #latestAssignedIdx = 0;
  #latestResolvedIdx = 0;
  queue(p) {
    return new Promise(async (resolve, reject) => {
      try {
        const idx = ++this.#latestAssignedIdx;
        const result = await p;
        if (idx > this.#latestResolvedIdx) {
          this.#latestResolvedIdx = idx;
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
};

// src/cubing/twisty/model/props/TwistyProp.ts
var globalSourceGeneration = 0;
var TwistyPropParent = class {
  constructor() {
    this.#children = /* @__PURE__ */ new Set();
    this.lastSourceGeneration = 0;
    this.#rawListeners = /* @__PURE__ */ new Set();
    this.#rawDispatchPending = false;
    this.#freshListeners = /* @__PURE__ */ new Map();
  }
  canReuse(v1, v2) {
    return v1 === v2 || this.canReuseValue(v1, v2);
  }
  canReuseValue(_v1, _v2) {
    return false;
  }
  debugGetChildren() {
    return Array.from(this.#children.values());
  }
  #children;
  addChild(child) {
    this.#children.add(child);
  }
  removeChild(child) {
    this.#children.delete(child);
  }
  markStale(sourceEvent) {
    if (sourceEvent.detail.generation !== globalSourceGeneration) {
      throw new Error("A TwistyProp was marked stale too late!");
    }
    if (this.lastSourceGeneration === sourceEvent.detail.generation) {
      return;
    }
    this.lastSourceGeneration = sourceEvent.detail.generation;
    for (const child of this.#children) {
      child.markStale(sourceEvent);
    }
    this.#scheduleRawDispatch();
  }
  #rawListeners;
  addRawListener(listener, options) {
    this.#rawListeners.add(listener);
    if (options?.initial) {
      listener();
    }
  }
  removeRawListener(listener) {
    this.#rawListeners.delete(listener);
  }
  #scheduleRawDispatch() {
    if (!this.#rawDispatchPending) {
      this.#rawDispatchPending = true;
      setTimeout(() => this.#dispatchRawListeners(), 0);
    }
  }
  #rawDispatchPending;
  #dispatchRawListeners() {
    if (!this.#rawDispatchPending) {
      throw new Error("Invalid dispatch state!");
    }
    for (const listener of this.#rawListeners) {
      listener();
    }
    this.#rawDispatchPending = false;
  }
  #freshListeners;
  addFreshListener(listener) {
    const staleDropper = new StaleDropper();
    let lastResult = null;
    const callback = async () => {
      const result = await staleDropper.queue(this.get());
      if (lastResult !== null && this.canReuse(lastResult, result)) {
        return;
      }
      lastResult = result;
      listener(result);
    };
    this.#freshListeners.set(listener, callback);
    this.addRawListener(callback, { initial: true });
  }
  removeFreshListener(listener) {
    this.removeRawListener(this.#freshListeners.get(listener));
    this.#freshListeners.delete(listener);
  }
};
var TwistyPropSource = class extends TwistyPropParent {
  #value;
  constructor(initialValue) {
    super();
    this.#value = from(() => this.getDefaultValue());
    if (initialValue) {
      this.#value = this.deriveFromPromiseOrValue(initialValue, this.#value);
    }
  }
  set(input) {
    this.#value = this.deriveFromPromiseOrValue(input, this.#value);
    const sourceEventDetail = {
      sourceProp: this,
      value: this.#value,
      generation: ++globalSourceGeneration
    };
    this.markStale(
      new CustomEvent("stale", {
        detail: sourceEventDetail
      })
    );
  }
  async get() {
    return this.#value;
  }
  async deriveFromPromiseOrValue(input, oldValuePromise) {
    return this.derive(await input, oldValuePromise);
  }
};
var SimpleTwistyPropSource = class extends TwistyPropSource {
  derive(input) {
    return input;
  }
};
var NO_VALUE = Symbol("no value");
var TwistyPropDerived = class extends TwistyPropParent {
  constructor(parents, userVisibleErrorTracker) {
    super();
    this.userVisibleErrorTracker = userVisibleErrorTracker;
    this.#parents = parents;
    for (const parent of Object.values(parents)) {
      parent.addChild(this);
    }
  }
  #parents;
  #cachedLastSuccessfulCalculation = null;
  #cachedLatestGenerationCalculation = null;
  async get() {
    const generation = this.lastSourceGeneration;
    if (this.#cachedLatestGenerationCalculation?.generation === generation) {
      return this.#cachedLatestGenerationCalculation.output;
    }
    const latestGenerationCalculation = {
      generation,
      output: this.#cacheDerive(
        this.#getParents(),
        generation,
        this.#cachedLastSuccessfulCalculation
      )
    };
    this.#cachedLatestGenerationCalculation = latestGenerationCalculation;
    this.userVisibleErrorTracker?.reset();
    return latestGenerationCalculation.output;
  }
  async #getParents() {
    const inputValuePromises = {};
    for (const [key, parent] of Object.entries(this.#parents)) {
      inputValuePromises[key] = parent.get();
    }
    const inputs = {};
    for (const key in this.#parents) {
      inputs[key] = await inputValuePromises[key];
    }
    return inputs;
  }
  async #cacheDerive(inputsPromise, generation, cachedLatestGenerationCalculation = null) {
    const inputs = await inputsPromise;
    const cache = (output) => {
      this.#cachedLastSuccessfulCalculation = {
        inputs,
        output: Promise.resolve(output),
        generation
      };
      return output;
    };
    if (!cachedLatestGenerationCalculation) {
      return cache(await this.derive(inputs));
    }
    const cachedInputs = cachedLatestGenerationCalculation.inputs;
    for (const key in this.#parents) {
      const parent = this.#parents[key];
      if (!parent.canReuse(inputs[key], cachedInputs[key])) {
        return cache(await this.derive(inputs));
      }
    }
    return cachedLatestGenerationCalculation.output;
  }
};
var FreshListenerManager = class {
  #disconnectionFunctions = [];
  addListener(prop, listener) {
    let disconnected = false;
    const wrappedListener = (value) => {
      if (disconnected) {
        return;
      }
      listener(value);
    };
    prop.addFreshListener(wrappedListener);
    this.#disconnectionFunctions.push(() => {
      prop.removeFreshListener(wrappedListener);
      disconnected = true;
    });
  }
  addMultiListener3(props, listener) {
    this.addMultiListener(props, listener);
  }
  addMultiListener(props, listener) {
    let disconnected = false;
    let initialIgnoresLeft = props.length - 1;
    const wrappedListener = async (_) => {
      if (initialIgnoresLeft > 0) {
        initialIgnoresLeft--;
        return;
      }
      if (disconnected) {
        return;
      }
      const promises = props.map(
        (prop) => prop.get()
      );
      const values = await Promise.all(promises);
      listener(values);
    };
    for (const prop of props) {
      prop.addFreshListener(wrappedListener);
    }
    this.#disconnectionFunctions.push(() => {
      for (const prop of props) {
        prop.removeFreshListener(wrappedListener);
      }
      disconnected = true;
    });
  }
  disconnect() {
    for (const disconnectionFunction of this.#disconnectionFunctions) {
      disconnectionFunction();
    }
  }
};

// src/cubing/twisty/controllers/RenderScheduler.ts
var RenderScheduler = class {
  constructor(callback) {
    this.callback = callback;
    this.animFrameID = null;
    this.animFrame = this.animFrameWrapper.bind(this);
  }
  requestIsPending() {
    return !!this.animFrameID;
  }
  requestAnimFrame() {
    if (!this.animFrameID) {
      this.animFrameID = requestAnimationFrame(this.animFrame);
    }
  }
  cancelAnimFrame() {
    if (this.animFrameID) {
      cancelAnimationFrame(this.animFrameID);
      this.animFrameID = 0;
    }
  }
  animFrameWrapper(timestamp) {
    this.animFrameID = 0;
    this.callback(timestamp);
  }
};

// src/cubing/twisty/model/props/puzzle/display/HintFaceletProp.ts
var hintFaceletStyles = {
  floating: true,
  none: true
};
var HintFaceletProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/views/3D/TAU.ts
var TAU = Math.PI * 2;
var DEGREES_PER_RADIAN = 360 / TAU;

// src/cubing/twisty/views/node-custom-element-shims.ts
var HTMLElementStub = class {
};
var HTMLElementShim;
if (globalThis.HTMLElement) {
  HTMLElementShim = HTMLElement;
} else {
  HTMLElementShim = HTMLElementStub;
}
var CustomElementsStub = class {
  define() {
  }
};
var customElementsShim;
if (globalThis.customElements) {
  customElementsShim = customElements;
} else {
  customElementsShim = new CustomElementsStub();
}

// src/cubing/twisty/views/ManagedCustomElement.ts
var CSSSource = class {
  constructor(sourceText) {
    this.sourceText = sourceText;
  }
  getAsString() {
    return this.sourceText;
  }
};
var ManagedCustomElement = class extends HTMLElementShim {
  constructor(options) {
    super();
    this.#cssSourceMap = /* @__PURE__ */ new Map();
    this.shadow = this.attachShadow({ mode: options?.mode ?? "closed" });
    this.contentWrapper = document.createElement("div");
    this.contentWrapper.classList.add("wrapper");
    this.shadow.appendChild(this.contentWrapper);
  }
  #cssSourceMap;
  addCSS(cssSource) {
    const existing = this.#cssSourceMap.get(cssSource);
    if (existing) {
      return existing;
    }
    const cssElem = document.createElement("style");
    cssElem.textContent = cssSource.getAsString();
    this.#cssSourceMap.set(cssSource, cssElem);
    this.shadow.appendChild(cssElem);
    return cssElem;
  }
  removeCSS(cssSource) {
    const cssElem = this.#cssSourceMap.get(cssSource);
    if (!cssElem) {
      return;
    }
    this.shadow.removeChild(cssElem);
    this.#cssSourceMap.delete(cssSource);
  }
  addElement(element) {
    return this.contentWrapper.appendChild(element);
  }
  prependElement(element) {
    this.contentWrapper.prepend(element);
  }
  removeElement(element) {
    return this.contentWrapper.removeChild(element);
  }
};
customElementsShim.define(
  "twisty-managed-custom-element",
  ManagedCustomElement
);

// src/cubing/vendor/mit/three/examples/jsm/libs/stats.modified.module.ts
var performance = globalThis.performance;
var Stats = class {
  constructor() {
    this.mode = 0;
    this.dom = document.createElement("div");
    this.beginTime = (performance || Date).now();
    this.prevTime = this.beginTime;
    this.frames = 0;
    this.fpsPanel = this.addPanel(new StatsPanel("FPS", "#0ff", "#002"));
    this.msPanel = this.addPanel(new StatsPanel("MS", "#0f0", "#020"));
    this.memPanel = performance?.memory ? this.addPanel(new StatsPanel("MB", "#f08", "#201")) : null;
    this.REVISION = 16;
    this.dom.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
    this.dom.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        this.showPanel(++this.mode % this.dom.children.length);
      },
      false
    );
    this.showPanel(0);
  }
  addPanel(panel) {
    this.dom.appendChild(panel.dom);
    return panel;
  }
  showPanel(id) {
    for (let i = 0; i < this.dom.children.length; i++) {
      this.dom.children[i].style.display = i === id ? "block" : "none";
    }
    this.mode = id;
  }
  begin() {
    this.beginTime = (performance || Date).now();
  }
  end() {
    this.frames++;
    const time = (performance || Date).now();
    this.msPanel.update(time - this.beginTime, 200);
    if (time >= this.prevTime + 1e3) {
      this.fpsPanel.update(this.frames * 1e3 / (time - this.prevTime), 100);
      this.prevTime = time;
      this.frames = 0;
      if (this.memPanel) {
        const memory = performance.memory;
        this.memPanel.update(
          memory.usedJSHeapSize / 1048576,
          memory.jsHeapSizeLimit / 1048576
        );
      }
    }
    return time;
  }
  update() {
    this.beginTime = this.end();
  }
};
var PR = Math.round(globalThis?.window?.devicePixelRatio ?? 1);
var WIDTH = 80 * PR;
var HEIGHT = 48 * PR;
var TEXT_X = 3 * PR;
var TEXT_Y = 2 * PR;
var GRAPH_X = 3 * PR;
var GRAPH_Y = 15 * PR;
var GRAPH_WIDTH = 74 * PR;
var GRAPH_HEIGHT = 30 * PR;
var StatsPanel = class {
  constructor(name, fg, bg) {
    this.name = name;
    this.fg = fg;
    this.bg = bg;
    this.min = Infinity;
    this.max = 0;
    this.dom = document.createElement("canvas");
    this.context = this.dom.getContext("2d");
    this.dom.width = WIDTH;
    this.dom.height = HEIGHT;
    this.dom.style.cssText = "width:80px;height:48px";
    this.context.font = `bold ${9 * PR}px Helvetica,Arial,sans-serif`;
    this.context.textBaseline = "top";
    this.context.fillStyle = bg;
    this.context.fillRect(0, 0, WIDTH, HEIGHT);
    this.context.fillStyle = fg;
    this.context.fillText(name, TEXT_X, TEXT_Y);
    this.context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    this.context.fillStyle = bg;
    this.context.globalAlpha = 0.9;
    this.context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
  }
  update(value, maxValue) {
    this.min = Math.min(this.min, value);
    this.max = Math.max(this.max, value);
    this.context.fillStyle = this.bg;
    this.context.globalAlpha = 1;
    this.context.fillRect(0, 0, WIDTH, GRAPH_Y);
    this.context.fillStyle = this.fg;
    this.context.fillText(
      `${Math.round(value)} ${this.name} (${Math.round(this.min)}-${Math.round(
        this.max
      )})`,
      TEXT_X,
      TEXT_Y
    );
    this.context.drawImage(
      this.dom,
      GRAPH_X + PR,
      GRAPH_Y,
      GRAPH_WIDTH - PR,
      GRAPH_HEIGHT,
      GRAPH_X,
      GRAPH_Y,
      GRAPH_WIDTH - PR,
      GRAPH_HEIGHT
    );
    this.context.fillRect(
      GRAPH_X + GRAPH_WIDTH - PR,
      GRAPH_Y,
      PR,
      GRAPH_HEIGHT
    );
    this.context.fillStyle = this.bg;
    this.context.globalAlpha = 0.9;
    this.context.fillRect(
      GRAPH_X + GRAPH_WIDTH - PR,
      GRAPH_Y,
      PR,
      Math.round((1 - value / maxValue) * GRAPH_HEIGHT)
    );
  }
};

// src/cubing/twisty/heavy-code-imports/3d.ts
var cachedConstructorProxy = null;
async function proxy3D() {
  return cachedConstructorProxy ?? (cachedConstructorProxy = import("./twisty-dynamic-3d-DLSFC2R3.js"));
}
var THREEJS = from(
  async () => (await proxy3D()).T3I
);

// src/cubing/twisty/views/canvas.ts
var globalPixelRatioOverride = null;
function pixelRatio() {
  return globalPixelRatioOverride ?? (devicePixelRatio || 1);
}

// src/cubing/twisty/views/3D/Twisty3DVantage.css.ts
var twisty3DVantageCSS = new CSSSource(
  `
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  place-content: center;
  contain: strict;
}

.loading {
  width: 4em;
  height: 4em;
  border-radius: 2.5em;
  border: 0.5em solid rgba(0, 0, 0, 0);
  border-top: 0.5em solid rgba(0, 0, 0, 0.7);
  border-right: 0.5em solid rgba(0, 0, 0, 0.7);
  animation: fade-in-delayed 4s, rotate 1s linear infinite;
}

@keyframes fade-in-delayed {
  0% { opacity: 0; }
  25% {opacity: 0; }
  100% { opacity: 1; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* TODO: This is due to stats hack. Replace with \`canvas\`. */
.wrapper > canvas {
  max-width: 100%;
  max-height: 100%;
  // animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.wrapper.invisible {
  opacity: 0;
}

.wrapper.drag-input-enabled > canvas {
  cursor: grab;
}

.wrapper.drag-input-enabled > canvas:active {
  cursor: grabbing;
}
`
);

// src/cubing/twisty/views/3D/DragTracker.ts
var MOVEMENT_EPSILON = 0.1;
var DragTracker = class extends EventTarget {
  constructor(target) {
    super();
    this.target = target;
  }
  #dragInfoMap = /* @__PURE__ */ new Map();
  start() {
    this.addTargetListener("pointerdown", this.onPointerDown.bind(this));
    this.addTargetListener("contextmenu", (e) => {
      e.preventDefault();
    });
    this.addTargetListener("touchmove", (e) => e.preventDefault());
    this.addTargetListener("dblclick", (e) => e.preventDefault());
  }
  stop() {
    for (const [eventType, listener] of this.#targetListeners.entries()) {
      this.target.removeEventListener(eventType, listener);
    }
    this.#targetListeners.clear();
    this.#lazyListenersRegistered = false;
  }
  #targetListeners = /* @__PURE__ */ new Map();
  addTargetListener(eventType, listener) {
    if (!this.#targetListeners.has(eventType)) {
      this.target.addEventListener(eventType, listener);
      this.#targetListeners.set(eventType, listener);
    }
  }
  #lazyListenersRegistered = false;
  #registerLazyListeners() {
    if (this.#lazyListenersRegistered) {
      return;
    }
    this.addTargetListener("pointermove", this.onPointerMove.bind(this));
    this.addTargetListener("pointerup", this.onPointerUp.bind(this));
    this.#lazyListenersRegistered = true;
  }
  #clear(e) {
    this.#dragInfoMap.delete(e.pointerId);
  }
  #trackDrag(e) {
    const existing = this.#dragInfoMap.get(e.pointerId);
    if (!existing) {
      return { movementInfo: null, hasMoved: false };
    }
    let movementInfo;
    if ((e.movementX ?? 0) !== 0 || (e.movementY ?? 0) !== 0) {
      movementInfo = {
        attachedInfo: existing.attachedInfo,
        movementX: e.movementX,
        movementY: e.movementY,
        elapsedMs: e.timeStamp - existing.lastTimeStamp
      };
    } else {
      movementInfo = {
        attachedInfo: existing.attachedInfo,
        movementX: e.clientX - existing.lastClientX,
        movementY: e.clientY - existing.lastClientY,
        elapsedMs: e.timeStamp - existing.lastTimeStamp
      };
    }
    existing.lastClientX = e.clientX;
    existing.lastClientY = e.clientY;
    existing.lastTimeStamp = e.timeStamp;
    if (Math.abs(movementInfo.movementX) < MOVEMENT_EPSILON && Math.abs(movementInfo.movementY) < MOVEMENT_EPSILON) {
      return { movementInfo: null, hasMoved: existing.hasMoved };
    } else {
      existing.hasMoved = true;
      return { movementInfo, hasMoved: existing.hasMoved };
    }
  }
  onPointerDown(e) {
    this.#registerLazyListeners();
    const newDragInfo = {
      attachedInfo: {},
      hasMoved: false,
      lastClientX: e.clientX,
      lastClientY: e.clientY,
      lastTimeStamp: e.timeStamp
    };
    this.#dragInfoMap.set(e.pointerId, newDragInfo);
    this.target.setPointerCapture(e.pointerId);
  }
  onPointerMove(e) {
    const movementInfo = this.#trackDrag(e).movementInfo;
    if (movementInfo) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("move", {
          detail: movementInfo
        })
      );
    }
  }
  onPointerUp(e) {
    const trackDragResult = this.#trackDrag(e);
    const existing = this.#dragInfoMap.get(e.pointerId);
    this.#clear(e);
    this.target.releasePointerCapture(e.pointerId);
    let event;
    if (trackDragResult.hasMoved) {
      event = new CustomEvent("up", {
        detail: { attachedInfo: existing.attachedInfo }
      });
    } else {
      const { altKey, ctrlKey, metaKey, shiftKey } = e;
      event = new CustomEvent("press", {
        detail: {
          normalizedX: e.offsetX / this.target.offsetWidth * 2 - 1,
          normalizedY: 1 - e.offsetY / this.target.offsetHeight * 2,
          rightClick: !!(e.button & 2),
          keys: {
            altKey,
            ctrlOrMetaKey: ctrlKey || metaKey,
            shiftKey
          }
        }
      });
    }
    this.dispatchEvent(event);
  }
};

// src/cubing/twisty/views/3D/RendererPool.ts
var renderers = [];
async function rawRenderPooled(width, height, scene, camera) {
  if (renderers.length === 0) {
    renderers.push(newRenderer());
  }
  const renderer = await renderers[0];
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  return renderer.domElement;
}
async function renderPooled(width, height, canvas, scene, camera) {
  if (width === 0 || height === 0) {
    return;
  }
  if (renderers.length === 0) {
    renderers.push(newRenderer());
  }
  const rendererCanvas = await rawRenderPooled(width, height, scene, camera);
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(rendererCanvas, 0, 0);
}
async function newRenderer() {
  const rendererConstructor = (await THREEJS).WebGLRenderer;
  const renderer = new rendererConstructor({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(pixelRatio());
  return renderer;
}

// src/cubing/twisty/views/3D/TwistyOrbitControls.ts
var INERTIA_DEFAULT = true;
var INERTIA_DURATION_MS = 500;
var INERTIA_TIMEOUT_MS = 50;
var VERTICAL_MOVEMENT_BASE_SCALE = 0.75;
function momentumScale(progress) {
  return (Math.exp(1 - progress) - (1 - progress)) / (1 - Math.E) + 1;
}
var Inertia = class {
  constructor(startTimestamp, momentumX, momentumY, callback) {
    this.startTimestamp = startTimestamp;
    this.momentumX = momentumX;
    this.momentumY = momentumY;
    this.callback = callback;
    this.scheduler = new RenderScheduler(this.render.bind(this));
    this.scheduler.requestAnimFrame();
    this.lastTimestamp = startTimestamp;
  }
  render(now) {
    const progressBefore = (this.lastTimestamp - this.startTimestamp) / INERTIA_DURATION_MS;
    const progressAfter = Math.min(
      1,
      (now - this.startTimestamp) / INERTIA_DURATION_MS
    );
    if (progressBefore === 0 && progressAfter > INERTIA_TIMEOUT_MS / INERTIA_DURATION_MS) {
      return;
    }
    const delta = momentumScale(progressAfter) - momentumScale(progressBefore);
    this.callback(this.momentumX * delta * 1e3, this.momentumY * delta * 1e3);
    if (progressAfter < 1) {
      this.scheduler.requestAnimFrame();
    }
    this.lastTimestamp = now;
  }
};
var TwistyOrbitControls = class {
  constructor(model, mirror, canvas, dragTracker) {
    this.model = model;
    this.mirror = mirror;
    this.canvas = canvas;
    this.dragTracker = dragTracker;
    this.experimentalInertia = INERTIA_DEFAULT;
    this.onMovementBound = this.onMovement.bind(this);
    this.experimentalHasBeenMoved = false;
    this.dragTracker.addEventListener("move", this.onMove.bind(this));
    this.dragTracker.addEventListener("up", this.onUp.bind(this));
  }
  temperMovement(f) {
    return Math.sign(f) * Math.log(Math.abs(f * 10) + 1) / 6;
  }
  onMove(e) {
    var _a;
    (_a = e.detail).attachedInfo ?? (_a.attachedInfo = {});
    const { temperedX, temperedY } = this.onMovement(
      e.detail.movementX,
      e.detail.movementY
    );
    const attachedInfo = e.detail.attachedInfo;
    attachedInfo.lastTemperedX = temperedX * 10;
    attachedInfo.lastTemperedY = temperedY * 10;
    attachedInfo.timestamp = e.timeStamp;
  }
  onMovement(movementX, movementY) {
    const scale = this.mirror ? -1 : 1;
    const minDim = Math.min(this.canvas.offsetWidth, this.canvas.offsetHeight);
    const temperedX = this.temperMovement(movementX / minDim);
    const temperedY = this.temperMovement(
      movementY / minDim * VERTICAL_MOVEMENT_BASE_SCALE
    );
    this.model.twistySceneModel.orbitCoordinatesRequest.set(
      (async () => {
        const prevCoords = await this.model.twistySceneModel.orbitCoordinates.get();
        const newCoords = {
          latitude: prevCoords.latitude + 2 * temperedY * DEGREES_PER_RADIAN * scale,
          longitude: prevCoords.longitude - 2 * temperedX * DEGREES_PER_RADIAN
        };
        return newCoords;
      })()
    );
    return { temperedX, temperedY };
  }
  onUp(e) {
    e.preventDefault();
    if ("lastTemperedX" in e.detail.attachedInfo && "lastTemperedY" in e.detail.attachedInfo && "timestamp" in e.detail.attachedInfo && e.timeStamp - e.detail.attachedInfo.timestamp < 60) {
      new Inertia(
        e.timeStamp,
        e.detail.attachedInfo.lastTemperedX,
        e.detail.attachedInfo.lastTemperedY,
        this.onMovementBound
      );
    }
  }
};

// src/cubing/twisty/views/3D/Twisty3DVantage.ts
async function setCameraFromOrbitCoordinates(camera, orbitCoordinates, backView = false) {
  const spherical = new (await THREEJS).Spherical(
    orbitCoordinates.distance,
    (90 - (backView ? -1 : 1) * orbitCoordinates.latitude) / DEGREES_PER_RADIAN,
    ((backView ? 180 : 0) + orbitCoordinates.longitude) / DEGREES_PER_RADIAN
  );
  spherical.makeSafe();
  camera.position.setFromSpherical(spherical);
  camera.lookAt(0, 0, 0);
}
var dedicatedRenderersSoFar = 0;
var DEFAULT_MAX_DEDICATED_RENDERERS = 2;
var sharingRenderers = false;
function shareRenderer() {
  if (twistyDebugGlobals.shareAllNewRenderers !== "auto") {
    if (!twistyDebugGlobals.shareAllNewRenderers) {
      dedicatedRenderersSoFar++;
    }
    return twistyDebugGlobals.shareAllNewRenderers !== "never";
  }
  if (dedicatedRenderersSoFar < DEFAULT_MAX_DEDICATED_RENDERERS) {
    dedicatedRenderersSoFar++;
    return false;
  } else {
    sharingRenderers = true;
    return true;
  }
}
function haveStartedSharingRenderers() {
  return sharingRenderers;
}
var Twisty3DVantage = class extends ManagedCustomElement {
  constructor(model, scene, options) {
    super();
    this.model = model;
    this.options = options;
    this.scene = null;
    this.stats = null;
    this.rendererIsShared = shareRenderer();
    this.loadingElement = null;
    this.#onResizeStaleDropper = new StaleDropper();
    this.#width = 0;
    this.#height = 0;
    this.#cachedRenderer = null;
    this.#cachedCanvas = null;
    this.#cachedDragTracker = null;
    this.#cachedCamera = null;
    this.#cachedOrbitControls = null;
    this.#disconnectionFunctions = [];
    this.#experimentalNextRenderFinishedCallback = null;
    this.#scheduler = new RenderScheduler(this.render.bind(this));
    this.scene = scene ?? null;
    this.loadingElement = this.addElement(document.createElement("div"));
    this.loadingElement.classList.add("loading");
    if (twistyDebugGlobals.showRenderStats) {
      this.stats = new Stats();
      this.stats.dom.style.position = "absolute";
      this.contentWrapper.appendChild(this.stats.dom);
    }
  }
  async connectedCallback() {
    this.addCSS(twisty3DVantageCSS);
    this.addElement((await this.canvasInfo()).canvas);
    this.#onResize();
    const observer = new ResizeObserver(this.#onResize.bind(this));
    observer.observe(this.contentWrapper);
    this.orbitControls();
    this.#setupBasicPresses();
    this.scheduleRender();
  }
  async #setupBasicPresses() {
    const dragTracker = await this.#dragTracker();
    dragTracker.addEventListener("press", async (e) => {
      const movePressInput = await this.model.twistySceneModel.movePressInput.get();
      if (movePressInput !== "basic") {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("press", {
          detail: {
            pressInfo: e.detail,
            cameraPromise: this.camera()
          }
        })
      );
    });
  }
  #onResizeStaleDropper;
  async clearCanvas() {
    if (this.rendererIsShared) {
      const canvasInfo = await this.canvasInfo();
      canvasInfo.context.clearRect(
        0,
        0,
        canvasInfo.canvas.width,
        canvasInfo.canvas.height
      );
    } else {
      const renderer = await this.renderer();
      const context = renderer.getContext();
      context.clear(context.COLOR_BUFFER_BIT);
    }
  }
  #width;
  #height;
  async #onResize() {
    const camera = await this.#onResizeStaleDropper.queue(this.camera());
    const w = this.contentWrapper.clientWidth;
    const h = this.contentWrapper.clientHeight;
    this.#width = w;
    this.#height = h;
    const off = 0;
    let yoff = 0;
    let excess = 0;
    if (h > w) {
      excess = h - w;
      yoff = -Math.floor(0.5 * excess);
    }
    camera.aspect = w / h;
    camera.setViewOffset(w, h - excess, off, yoff, w, h);
    camera.updateProjectionMatrix();
    this.clearCanvas();
    if (this.rendererIsShared) {
      const canvasInfo = await this.canvasInfo();
      canvasInfo.canvas.width = w * pixelRatio();
      canvasInfo.canvas.height = h * pixelRatio();
      canvasInfo.canvas.style.width = `${w.toString()}px`;
      canvasInfo.canvas.style.height = `${h.toString()}px`;
    } else {
      const renderer = await this.renderer();
      renderer.setSize(w, h, true);
    }
    this.scheduleRender();
  }
  #cachedRenderer;
  async renderer() {
    if (this.rendererIsShared) {
      throw new Error("renderer expected to be shared.");
    }
    return this.#cachedRenderer ?? (this.#cachedRenderer = newRenderer());
  }
  #cachedCanvas;
  async canvasInfo() {
    return this.#cachedCanvas ?? (this.#cachedCanvas = (async () => {
      let canvas;
      if (this.rendererIsShared) {
        canvas = this.addElement(document.createElement("canvas"));
      } else {
        const renderer = await this.renderer();
        canvas = this.addElement(renderer.domElement);
      }
      this.loadingElement?.remove();
      const context = canvas.getContext("2d");
      return { canvas, context };
    })());
  }
  #cachedDragTracker;
  async #dragTracker() {
    return this.#cachedDragTracker ?? (this.#cachedDragTracker = (async () => {
      const dragTracker = new DragTracker((await this.canvasInfo()).canvas);
      this.model?.twistySceneModel.dragInput.addFreshListener(
        (dragInputMode) => {
          let dragInputEnabled = false;
          switch (dragInputMode) {
            case "auto": {
              dragTracker.start();
              dragInputEnabled = true;
              break;
            }
            case "none": {
              dragTracker.stop();
              break;
            }
          }
          this.contentWrapper.classList.toggle(
            "drag-input-enabled",
            dragInputEnabled
          );
        }
      );
      return dragTracker;
    })());
  }
  #cachedCamera;
  async camera() {
    return this.#cachedCamera ?? (this.#cachedCamera = (async () => {
      const camera = new (await THREEJS).PerspectiveCamera(
        20,
        1,
        0.1,
        20
      );
      camera.position.copy(
        new (await THREEJS).Vector3(2, 4, 4).multiplyScalar(
          this.options?.backView ? -1 : 1
        )
      );
      camera.lookAt(0, 0, 0);
      return camera;
    })());
  }
  #cachedOrbitControls;
  async orbitControls() {
    return this.#cachedOrbitControls ?? (this.#cachedOrbitControls = (async () => {
      const orbitControls = new TwistyOrbitControls(
        this.model,
        !!this.options?.backView,
        (await this.canvasInfo()).canvas,
        await this.#dragTracker()
      );
      if (this.model) {
        this.addListener(
          this.model.twistySceneModel.orbitCoordinates,
          async (orbitCoordinates) => {
            const camera = await this.camera();
            setCameraFromOrbitCoordinates(
              camera,
              orbitCoordinates,
              this.options?.backView
            );
            this.scheduleRender();
          }
        );
      }
      return orbitControls;
    })());
  }
  addListener(prop, listener) {
    prop.addFreshListener(listener);
    this.#disconnectionFunctions.push(() => {
      prop.removeFreshListener(listener);
    });
  }
  #disconnectionFunctions;
  disconnect() {
    for (const fn of this.#disconnectionFunctions) {
      fn();
    }
    this.#disconnectionFunctions = [];
  }
  #experimentalNextRenderFinishedCallback;
  experimentalNextRenderFinishedCallback(callback) {
    this.#experimentalNextRenderFinishedCallback = callback;
  }
  async render() {
    if (!this.scene) {
      throw new Error("Attempted to render without a scene");
    }
    this.stats?.begin();
    const [scene, camera, canvas] = await Promise.all([
      this.scene.scene(),
      this.camera(),
      this.canvasInfo()
    ]);
    if (this.rendererIsShared) {
      renderPooled(this.#width, this.#height, canvas.canvas, scene, camera);
    } else {
      (await this.renderer()).render(scene, camera);
    }
    this.stats?.end();
    this.#experimentalNextRenderFinishedCallback?.();
    this.#experimentalNextRenderFinishedCallback = null;
  }
  #scheduler;
  scheduleRender() {
    this.#scheduler.requestAnimFrame();
  }
};
customElementsShim.define("twisty-3d-vantage", Twisty3DVantage);

export {
  setTwistyDebug,
  RenderScheduler,
  StaleDropper,
  TwistyPropSource,
  SimpleTwistyPropSource,
  NO_VALUE,
  TwistyPropDerived,
  FreshListenerManager,
  hintFaceletStyles,
  HintFaceletProp,
  TAU,
  DEGREES_PER_RADIAN,
  HTMLElementShim,
  customElementsShim,
  CSSSource,
  ManagedCustomElement,
  rawRenderPooled,
  setCameraFromOrbitCoordinates,
  haveStartedSharingRenderers,
  Twisty3DVantage,
  proxy3D,
  THREEJS
};
//# sourceMappingURL=chunk-UXRFLJUT.js.map
