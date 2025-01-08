import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse, useStarshipNavigation } from "./GalaxyRoute";
import { shuffle } from "./utils/old-bird-soft";

const [gAlfa, gBeta] = galaxyTextureList();

const trackList = [
  ["WoraTravelers.png", "media/Travelers.mp3"],
  ["WoraAndVocal.png", "media/Searching the Void.mp3"],
  ["WoraPlayOnPiano.png", "media/Tomorrow.mp3"],
  ["WoraScars.png", "media/Scars on My Stardust.mp3"],
  ["WoraConstellations.png", "media/Constellation.mp3"],
];

export const WoraShard = ({pngImageUrl}) => (
  <figure class="
      WoraShardOnGalaxy
      bg-cover min-w-[100vw] aspect-video
      pointer-events-none
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
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("color-dodge");
  state.ySpeed = Math.random() - .5;
  state.xSpeed = Math.random() - .5;
  useKeyboardCurse(state);
  // useStarshipNavigation(state);
  let isPlay = false;

  document.querySelector('body').onclick = () => {
    if (isPlay) {
      // window.location = 'mine.html';
      return;
    }
    // const WoraShardSinging = new Audio('media/Tomorrow.mp3');
    const WoraShardSinging = new Audio(song);
    WoraShardSinging.play();
    isPlay = true;
  }
});
