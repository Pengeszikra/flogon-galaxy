import { fencer, portal } from "./utils/fencer";
import { signal } from "./utils/old-bird-soft";

export const GalaxyRoute = ({front, back}) => (
    <main class={`
      bg-zinc-900
      min-w-full
      aspect-video
      bg-[url(${front}),url(${back})]
      grid
      place-items-center
    `}>
    </main>
  );

// portal(<Route front={front} back={back} />);
export const routeController = () => {
  /** @type {HTMLElement} */
  const map = document.querySelector('main');
  map.style.backgroundBlendMode = "screen, normal";
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
