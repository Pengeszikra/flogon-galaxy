import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    // front={`https://cdn.midjourney.com/7d495377-bc4b-4d88-b30a-663048b682ac/0_3.png`}
    // front={`https://cdn.midjourney.com/cf0c1c6c-af2e-429d-9c0a-6ae74a856b82/0_2.png`}
    // front={`https://cdn.midjourney.com/2d61d37e-c402-4916-884b-790313208edc/0_2.png`}
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
    // back={`https://cdn.midjourney.com/7d495377-bc4b-4d88-b30a-663048b682ac/0_3.png`}
    // back={`https://cdn.midjourney.com/cf0c1c6c-af2e-429d-9c0a-6ae74a856b82/0_2.png`}
    // back={`https://cdn.midjourney.com/06947e48-56a4-4a01-bc36-337a3e636096/0_2.png`}
  >
    <section class="grid">
      <h1 class="text-emerald-200 text-2xl select-none">F L O G O N - G A L A X Y</h1>
      <p class="text-orange-300 text-sm text-right min-w-max">first contact</p>
    </section>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("screen");
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
