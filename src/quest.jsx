import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    // back={`../sheets/texture-${gBeta}.png`}
    back={`https://cdn.midjourney.com/7443e9b9-be5c-4f2e-b827-4e99df50c9c3/0_1.png`}
    // back={`https://cdn.midjourney.com/cf0c1c6c-af2e-429d-9c0a-6ae74a856b82/0_2.png`}
  >
    <section class="grid">
      <h1 class="text-emerald-200 text-2xl select-none">F L O G O N - G A L A X Y</h1>
      <p class="text-orange-300 text-sm text-right min-w-max">first contact</p>
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
