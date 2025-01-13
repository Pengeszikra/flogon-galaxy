import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";
import { shuffle } from "./utils/old-bird-soft";
import { trackList } from "./media-assets";

const [gAlfa, gBeta] = galaxyTextureList();

export const WoraShard = ({pngImageUrl}) => (
  <figure class="
      WoraShardOnGalaxy
      bg-cover min-w-[100vw] aspect-video
      pointer-events-auto
    "
    style={{backgroundImage:`url(${pngImageUrl})`}}
  ></figure>
);

const [[cover, song]] = trackList.sort(shuffle);

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    {/* <WoraShard pngImageUrl="WoraPlayOnPiano.png" /> */}
    <WoraShard pngImageUrl={cover} />
    <button id="hangar"
      class="bg-emerald-700/0 absolute w-[6rem] h-[6rem] top-0 right-0 pointer-events-auto"
      onClick={() => globalThis.location.replace('ship.html')}
    ></button>

  </GalaxyRoute>
).then((page) => {
  const [state] = routeController("color-dodge");
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
  let isPlay = false;
  page.onclick = () => {
    if (isPlay) {
      return;
    }
    const WoraShardSinging = new Audio(song);
    WoraShardSinging.play();
    isPlay = true;
  }
});
