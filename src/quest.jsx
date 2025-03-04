import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <section>
    <GalaxyRoute
      front={`../sheets/texture-${gAlfa}.png`}
      back={`./ui-elements/fare-and-beyond-statue.png`}
      zoom={250}
    >
      <section class="grid select-none">
        <h1 class="text-emerald-200 text-[5rem] ">F L O G O N - G A L A X Y</h1>
        <p class="text-orange-300 text-[4rem] text-right min-w-max">first contact</p>
      </section>
    </GalaxyRoute>
  </section>
).then((page) => {
  page.onclick = () => globalThis.location.replace('ship.html');
  const [state] = routeController("multiply");
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
});
