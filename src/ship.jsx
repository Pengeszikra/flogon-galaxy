import { fencer, portal, Fragment } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { PointAndClick, PointClickPercent } from "./PointAndClick";

const [gAlfa, gBeta] = galaxyTextureList();

const room = "rounded-2xl hover:outline-1 hover:outline-dashed hover:outline-emerald-500 hover:bg-black/0";

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
        <PointClickPercent id="captain" bg={`bg-emerald-700/50 ${room}`} w={17} h={18} top={24} left={9} nextUrl="mine.html" />
        <PointClickPercent id="captain" bg={`bg-orange-700/50 ${room}`}  w={16} h={18} top={24} left={55} nextUrl="adventure.html" />
        <PointClickPercent id="captain" bg={`bg-sky-700/50 ${room}`} w={16} h={16} top={43} left={65} nextUrl="library.html" />
        <PointClickPercent id="captain" bg={`bg-rose-700/50 ${room}`} w={31} h={16} top={43} left={34} nextUrl="deal.html" />
        <PointClickPercent id="captain" bg={`bg-yellow-700/50 ${room}`} w={17} h={16} top={43} left={9} nextUrl="credit.html" />
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
