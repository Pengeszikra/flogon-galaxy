import { fencer, portal } from "./utils/fencer";
import { signal } from "./utils/old-bird-soft";

const App = () => (
  <main class="
    bg-zinc-900
    min-w-full
    aspect-video
    bg-[url(../sheets/texture-2002.png),url(../sheets/texture-2001.png)]
    grid
    place-items-center
  ">
    <section class="grid">
      <h1 class="text-emerald-200 text-2xl select-none">F L O G O N - G A L A X Y</h1>
      <p class="text-orange-300 text-sm text-right min-w-max">first contact</p>
    </section>
  </main>
);

portal(<App />);

/** @type {HTMLElement} */
const map = document.querySelector('main');
map.style.backgroundBlendMode = "screen, normal";
const initial = {x:0, y:0, z:0, xSpeed:0, ySpeed:0, zSpeed:0};
const ship = signal(p=>p)(initial);
const loop = () => {
  ship.x += ship.xSpeed;
  ship.y += ship.ySpeed;
  ship.z += ship.zSpeed;
  map.style.backgroundPosition = `${ship.x}% ${ship.y}%,${ship.x/1.4}% ${ship.y/1.4}%`;
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

ship.ySpeed = 0.3;
