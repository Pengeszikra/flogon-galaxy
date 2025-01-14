import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { pick, rnd } from "./utils/old-bird-soft";
import { trackList } from "./media-assets";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../ui-elements/evidence-of-history.png`}
    zoom={250}
  >
    <section class="grid select-none">
      <h1 class="text-emerald-200 text-[5vw]">C R E D I T</h1>
      <p class="text-orange-300 text-[3vw] text-right min-w-max">... a long list comming</p>
    </section>
  </GalaxyRoute>
).then((page) => {
  const [state] = routeController("multiply");
  state.ySpeed = Math.random() - .5;
  useKeyboardCurse(state);
  page.onclick = () => {
    globalThis.location.replace('ship.html');
    // const [,randomTrack] = pick(trackList);
    // const WoraShard = new Audio(randomTrack);
    // WoraShard.play();
  }
});
