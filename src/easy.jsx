import { fencer, portal } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
    zoom={250}
  >
    Hello Responsivity
  </GalaxyRoute>
).then((page) => {
  const [state] = routeController("soft-light");
  state.ySpeed = (Math.random() - .5) / 3;
  state.xSpeed = Math.random();
  useKeyboardCurse(state);
});
