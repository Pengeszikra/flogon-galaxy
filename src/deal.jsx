import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { delay, pick, rnd, shuffle, signal, zignal } from "./utils/old-bird-soft";
import { gameLoop, gameSetup, randomDeck, freshState, logger } from "./core-game";
import { FortyTwo } from "./utils/UniversalHarmonyNumber";
import { dealToPlayer, dealToQuest, FLOOR, move, POS, SIZE, SKY } from "./deal-animations";

/** @typedef {import('../src/core-game').SingleCard} SingleCard */

// globalThis.gameTest =  (speed = FortyTwo, pAmunt = 20, qAmount = 25) => {
//   const state = freshState(logger);
//   gameSetup(state, randomDeck(pAmunt), randomDeck(qAmount));
//   globalThis.run = () => gameLoop(state);
//   const stop = setInterval(_ => { if (state.phase == "THE_END") clearInterval(stop); run() }, speed);
// };

// ------------------------- 3D ----------------------------------

const allCard = randomDeck(FortyTwo * 2);

/** @type {(props: { id: string, value: number, style:object }) => HTMLElement} */
const Card = ({id, value, style}) => (
  <div
    style={style}
    id={id}
    class="
      card
      absolute top-8 left-0;
      scale-[3.2]
      transition-all duration-500
      pointer-events-auto
      hover:brightness-150
    ">
    <Sprite
      {...pick(assetList)}
      class="rounded-xl outline outline-1 outline-zinc-900">
    </Sprite>
    <div class="
      text-neutral-700
      text-[.7rem]
      absolute
      top-2
      left-2
      bg-white/40
      rounded-full
      w-[2rem]
      text-center
      select-none
    ">{value}</div>
  </div>
);

/** @type {(props: { id: number }) => HTMLElement} */
const Flogon = ({id}) => <Sprite {...flogons[id]} class="
  hover:scale-[1.5]
  transition-all
  duration-500
  "
></Sprite>;

const [gAlfa, gBeta] = galaxyTextureList();

/** @typedef {import('../src/utils/fencer').SpriteProps} SpriteProps */
/** @type {(props:{card: SpriteProps}) => HTMLElement | DocumentFragment} */

portal(
  <GalaxyRoute
    front={`../sheets/texture-${gAlfa}.png`}
    back={`../sheets/texture-${gBeta}.png`}
  >
    <figure class="
      --hidden
      aspect-video
      min-w-full
      absolute top-0 left-0
      --bg-[url(../sheets/bridge-4400.png)]
      bg-[url(../ui-elements/mission-cabine.png)]
      bg-cover
    "></figure>

    <section id="score-board" class="
      absolute top-0 left-0
      min-w-full
      bg-black/45 text-orange-300
      flex gap-2 p-4
      text-3xl
      justify-evenly
      select-none
    ">
      <p>player: <span id="p-score" class="text-orange-600"></span></p>
      <p>quest: <span id="q-score" class="text-orange-600"></span></p>
      <div class="fixed bottom-4 left-0 text-lg p-2 grid place-items-center min-w-full bg-black/50">
        <p>phase: <span id="phase" class="text-orange-600"></span></p>
      </div>
    </section>
    <section id="desk" class="
      absolute top-[60%] left-[50%]
      w-[0] h-[0]
      --grid --grid-cols-4 gap-x-[2rem] gap-y-[17rem]
      place-items-center
      --bg-black/75
    "
    >
      {allCard.map(({value,id}, idx) => (
        <Card id={id} value={value} style={{transform:`
          translateX(${idx%2==0?30:-30}rem)
          translateY(${idx%2==0?-10:10}rem)
          translateZ(${idx/10 + SKY}rem)
          scale(${SIZE})
        `}}/>
      ))}
    </section>
  </GalaxyRoute>
).then((page) => {
  const [galaxy] = routeController("screen");
  galaxy.ySpeed = (Math.random() - .5) / .3;
  galaxy.xSpeed = (Math.random() - .5) / .3;
  useKeyboardCurse(galaxy);

  /** @type {HTMLElement} */ const pScore = page.querySelector('#p-score');
  /** @type {HTMLElement} */ const qScore = page.querySelector('#q-score');
  /** @type {HTMLElement} */ const dPhase = page.querySelector('#phase');
  /** @type {HTMLElement} */ const deck = page.querySelector('#deck');

  /** @typedef {import('./core-game').State} State */
  /** @type {(st:State) => any} */
  const render = (st) => {
    pScore.innerText = st?.player?.score?.toString() ?? "0";
    qScore.innerText = st?.quest?.score?.toString() ?? "0";
    dPhase.innerText = st?.phase;
    logger(st);
    console.log(st.phase);
    if (st.phase === "READY") {
      state.player.deck.map((crdState, idx) =>
        setTimeout(
          () => move(crdState, {...POS.pDeck, z: idx / 3 + FLOOR})
          , idx * 20
        )
      );

      setTimeout(() =>
        state.quest.deck.map((crdState, idx) =>
          setTimeout(
            () => move(crdState, {...POS.qDeck, z: idx / 3 + FLOOR})
            , idx * 20
          )
        ), 1000);
    }

    // if (st.phase === "PLAYER_DRAW") dealToPlayer(st);
    // if (st.phase === "QUEST_DRAW_WITH_END_CHECK") dealToQuest(st);
  }

  /** @type {(info:SingleCard) => any} */
  const newOrder = (info) => {
    const {id, x,y,z,rX,rY,rZ,zoom} = info;
    /** @type {HTMLElement} */ const card = page.querySelector(`#${id}`); // TODO
    card.style.transition = `transform 300ms linear`;
    card.style.transform = `
      translateX(${x}rem)
      translateY(${y}rem)
      translateZ(${z}rem)
      rotateX(${rX}deg)
      rotateY(${rY}deg)
      rotateZ(${rZ}deg)
      scale(${zoom})
    `;
  }

  const state = freshState(render);
  globalThis.st = state; // TODO
  const movingCards = allCard.map(card => signal(newOrder)(card));
  gameSetup(state, movingCards.slice(0,12), movingCards.slice(12, 12 + 21));

  let prevPhase = "";
  const stop = setInterval( _ => {
    console.log(prevPhase, state.phase);
    if (state.phase == "THE_END") clearInterval(stop);
    if (state.phase !== prevPhase) {
      prevPhase = state.phase;
      gameLoop(state);
    }
  }, FortyTwo * 10);

});
