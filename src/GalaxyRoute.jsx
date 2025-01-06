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

/** @type {(blend:BlendMode) => [object, ()=>void]} */
export const routeController = (blend="screen") => {
  /** @type {HTMLElement} */
  const map = document.querySelector('main');
  map.style.backgroundBlendMode = `${blend}, normal`;
  const initial = { x: 0, y: 0, z: 0, xSpeed: 0, ySpeed: 0, zSpeed: 0 };
  const ship = signal(p => p)(initial);
  const loop = () => {
    ship.x += ship.xSpeed;
    ship.y += ship.ySpeed;
    ship.z += ship.zSpeed;
    map.style.backgroundPosition = `${ship.x}% ${ship.y}%,${ship.x / 1.4}% ${ship.y / 1.4}%`;
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  return [ship, loop];
}

export const galaxyTextureList = () => Array(31).fill(2000).map((m, i) => m + i).sort(shuffle);
