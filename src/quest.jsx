import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`https://cdn.midjourney.com/7443e9b9-be5c-4f2e-b827-4e99df50c9c3/0_1.png`}
    zoom={250}
  >
    <section class="grid">
      <h1 class="text-emerald-200 text-[5vw] select-none">F L O G O N - G A L A X Y</h1>
      <p class="text-orange-300 text-[3vw] text-right min-w-max">first contact</p>
    </section>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("multiply");
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);

  // const WoraShard = new Audio('media/Tomorrow.mp3');
  // WoraShard.play();
});
