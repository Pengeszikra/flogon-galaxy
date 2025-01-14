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
  <section class="grid place-items-center" />
    <section class="grid place-items-center w-[100vw] aspect-video">
      <figure class="
        aspect-video
        w-[80%]
        bg-[url(../ui-elements/ship-no-bg.png)]
        bg-cover
        relative
      ">
        <PointAndClick id="captain" bg="bg-emerald-700/50" w={9} h={5} top={7} left={5} nextUrl="mine.html" />
        <PointAndClick id="captain" bg="bg-orange-700/50" w={7} h={5} top={7.5} left={22} nextUrl="adventure.html" />
        <PointAndClick id="captain" bg="bg-sky-700/50" w={9} h={6} top={18} left={26} nextUrl="library.html" />
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
