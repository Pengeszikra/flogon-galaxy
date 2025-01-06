import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    // back={`../sheets/texture-${gBeta}.png`}
    back={`https://cdn.midjourney.com/7443e9b9-be5c-4f2e-b827-4e99df50c9c3/0_1.png`}
    // back={`https://cdn.midjourney.com/ff9127f3-fb8c-451f-b93c-3386a813ec3d/0_0.png`}
    // back={`https://cdn.midjourney.com/90169e44-5de1-4552-9b2f-21666434e9b9/0_3.png`}
    // back={`https://cdn.midjourney.com/36f8411c-2385-4d00-9890-a260a56205f2/0_1.png`}
    // back={`https://cdn.midjourney.com/eaf9305a-1b58-483d-b745-509cb928202b/0_2.png`}
    // back={`https://cdn.midjourney.com/5eefaecd-4e5b-46dd-acdb-0b9400a31b91/0_3.png`}
    // back={`https://cdn.midjourney.com/f0537074-bf73-4b0e-99ab-88f3c11fcd0c/0_2.png`}
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
