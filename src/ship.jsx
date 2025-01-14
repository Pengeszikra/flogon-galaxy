import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { PointAndClick } from "./PointAndClick";

const [gAlfa, gBeta] = galaxyTextureList();

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
    zoom={250}
  >
    <section class="grid place-items-center">
      <figure class="
        w-[90rem] portrait:w-[60rem] aspect-video
        bg-[url(../ui-elements/ship-no-bg.png)]
        bg-cover
        relative
      ">

        <PointAndClick id="captain" bg="bg-emerald-700/50" w={16} h={9} top={12} left={8} nextUrl="mine.html" />
        <PointAndClick id="captain" bg="bg-orange-700/50" w={13} h={9} top={12} left={50} nextUrl="adventure.html" />
        <PointAndClick id="captain" bg="bg-sky-700/50" w={16} h={8} top={22} left={59} nextUrl="library.html" />
        <button id="bridge"></button>
        <button id="cantine"></button>
        <button id="storage"></button>
        <button id="meeting-hall"></button>
        <button id="relax"></button>
      </figure>
    </section>
  </GalaxyRoute>
).then((page) => {
  const [state] = routeController("soft-light");
  state.ySpeed = (Math.random() - .5) / 3;
  state.xSpeed = Math.random();
  useKeyboardCurse(state);
});
