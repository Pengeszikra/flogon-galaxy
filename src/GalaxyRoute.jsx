import { fencer, portal } from "./utils/fencer";
import { shuffle, signal } from "./utils/old-bird-soft";

/**
 * @typedef {(
 *   "normal" | "multiply" | "screen" | "overlay" |
 *   "darken" | "lighten" | "color-dodge" | "color-burn" |
 *   "hard-light" | "soft-light" | "difference" | "exclusion" |
 *   "hue" | "saturation" | "color" | "luminosity"
 * )} BlendMode
 */


/** @type {(props: { front:string, back:string, zoom?:number, children?:any }) => HTMLElement} */
export const GalaxyRoute = ({front, back, children, zoom=150}) => (
    <main
      class="
        bg-zinc-900 w-[100vw] h-[56.25vw] overflow-hidden
        relative grid place-items-center
      "
      style={{
        backgroundImage:`url(${front}),url(${back})`,
        backgroundSize: `${zoom}vw`
      }}
    >
      <section id="video-aspect" class="
        aspect-video
        portrait:w-screen
        landscape:min-h-screen
        mx-auto
        max-w-[100vw]
        max-h-[56.25vw]

        grid place-items-center
        pointer-events-none

        bg-rose-700/40
      ">
        {children}
      </section>
    </main>
  );

/** @typedef {{ x:number, y:number, z:number, xSpeed:number, ySpeed:number, zSpeed:number }} MoveIn3D */

/** @type {(blend:BlendMode, afterLoop?:Function) => [object, ()=>void]} */
export const routeController = (blend = "screen", afterLoop = () => { }) => {
  /** @type {HTMLElement} */
  const map = document.querySelector('main');
  map.style.backgroundBlendMode = `${blend}, normal`;
  /** @type {MoveIn3D} */
  const initial = { x: 0, y: 0, z: 0, xSpeed: 0, ySpeed: 0, zSpeed: 0 };
  const ship = signal(p => p)(initial);
  const loop = () => {
    ship.x += ship.xSpeed;
    ship.y += ship.ySpeed;
    ship.z += ship.zSpeed;
    map.style.backgroundPosition = `${ship.x}% ${ship.y}%,${ship.x / 1.7}% ${ship.y / 1.7}%`;
    afterLoop(ship);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  return [ship, loop];
}

export const galaxyTextureList = () => Array(31).fill(2000).map((m, i) => m + i).sort(shuffle);

/** @type {(state:MoveIn3D) => any} */
export const useKeyboardCurse = (state) => {
  document.addEventListener("keydown",
    /** @type {(event:KeyboardEvent) => any} */
    (event) => {
      const { key } = event;
      switch (key) {
        case "a": return state.xSpeed -= .1;
        case "d": return state.xSpeed += .1;
        case "w": return state.ySpeed -= .1;
        case "s": return state.ySpeed += .1;
        case " ": {
          state.xSpeed = 0;
          state.ySpeed = 0;
          state.zSpeed = 0;
          return;
        };
      }
    }
  );
}

/** @type {(state: MoveIn3D, line:SVGLineElement) => void} */
export const useStarshipNavigation = (state, line) => {
  // Center of the screen as the origin
  const origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  /** @type {(clientX: number, clientY: number) => void} */
  const updateSpeed = (clientX, clientY) => {
    line.x2.baseVal.value = clientX;
    line.y2.baseVal.value = clientY;

      state.xSpeed = (line.x2.baseVal.value - line.x1.baseVal.value) / 50;
      state.ySpeed = (line.y2.baseVal.value - line.y1.baseVal.value) / 50;
  };

  /** @type {(e:MouseEvent) => void} */
  const handleMouseMove = (event) => updateSpeed(event.clientX, event.clientY);
  /** @type {(e:TouchEvent) => void} */
  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    if (touch) updateSpeed(touch.clientX, touch.clientY);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleTouchMove);
};


/** @type {(xSpeed:number, ySpeed:number) => number} */
export const calculateShipRotation = (xSpeed, ySpeed) => {
  const angleRadians = Math.atan2(ySpeed, xSpeed);
  return angleRadians;
  // const angleDegrees = (angleRadians * 180) / Math.PI - 90;
  // return (angleDegrees + 360) % 360;
};


/** @type {(x1: number, y1: number, x2: number, y2: number) => number} */
export const shipRotation = (x1, y1, x2, y2) => {
  // Számítsuk ki a két pont közötti vektor szögét radiánban
  const angleRadians = Math.atan2(y2 - y1, x2 - x1);

  // Alakítsuk át fokokká, és normalizáljuk 0-360 fokra
  const angleDegrees = (angleRadians * 180) / Math.PI;
  return (angleDegrees + 360) % 360;
};
