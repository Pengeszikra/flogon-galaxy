import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, routeController } from "./GalaxyRoute";
import { rnd, shuffle } from "./utils/old-bird-soft";

const [gAlfa, gBeta] = Array(31).fill(2000).map((m, i) => m + i).sort(shuffle);

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <section class="grid">
      <h1 class="text-emerald-200 text-2xl select-none">F L O G O N - G A L A X Y</h1>
      <p class="text-orange-300 text-sm text-right min-w-max">first contact</p>
    </section>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController();
  state.ySpeed = .3;

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
});
