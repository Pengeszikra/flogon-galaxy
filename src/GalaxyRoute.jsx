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


/** @type {(props: { front:string, back:string, children?:any }) => HTMLElement} */
export const GalaxyRoute = ({front, back, children}) => (
    <main class="
        bg-zinc-900
        min-w-full
        aspect-video
        grid
        place-items-center
      "
      style={{backgroundImage:`url(${front}),url(${back})`}}
    >
      {children}
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
    map.style.backgroundPosition = `${ship.x}% ${ship.y}%,${ship.x / 1.4}% ${ship.y / 1.4}%`;
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

/** @type {(state: MoveIn3D) => void} */
export const useStarshipNavigation = (state) => {
  // Middle-bottom origin
  const origin = { x: window.innerWidth / 2, y: window.innerHeight };

  const updateSpeed = (clientX, clientY) => {
    const dx = clientX - origin.x; // Horizontal distance from origin
    const dy = origin.y - clientY; // Vertical distance from origin (invert y-axis)

    // Normalize the speed
    state.xSpeed = dx / origin.x; // Scaled between -1 and 1
    state.ySpeed = dy / origin.y; // Scaled between 0 and 1
  };

  // Handle mouse movement
  const handleMouseMove = (event) => {
    updateSpeed(event.clientX, event.clientY);
  };

  // Handle touch movement
  const handleTouchMove = (event) => {
    const touch = event.touches[0]; // Use the first touch point
    if (touch) {
      updateSpeed(touch.clientX, touch.clientY);
    }
  };

  // Add event listeners
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleTouchMove);

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchmove', handleTouchMove);
  };
};

/** @type {(xSpeed:number, ySpeed:number) => number} */
export const calculateShipRotation = (xSpeed, ySpeed) => {
  const angleRadians = Math.atan2(ySpeed, xSpeed);
  const angleDegrees = (angleRadians * 180) / Math.PI - 90;
  return (angleDegrees + 360) % 360;
};
