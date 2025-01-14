import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";
import { shuffle } from "./utils/old-bird-soft";
import { trackList } from "./media-assets";
import { targetSystem } from "./throw/targetSystem";

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
    <Sprite {...targetSystem[6]} class="
      absolute top-[1rem] right-[1rem]
      mix-blend-lighten
      transition-all
      duration-300
      hover:brightness-200
    "
    onClick={() => globalThis.location.replace('ship.html')}
    />

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
