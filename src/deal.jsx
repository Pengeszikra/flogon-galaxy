import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { delay, pick, rnd, shuffle, signal, zignal } from "./utils/old-bird-soft";
import { gameLoop, gameSetup, randomDeck, freshState, logger, allPossibleMoves, cardMatcher } from "./core-game";
import { FortyTwo } from "./utils/UniversalHarmonyNumber";
import { dealToPlayer, dealToQuest, FLOOR, move, POS, SIZE, SKY, tr3D } from "./deal-animations";

/** @typedef {import('../src/core-game').SingleCard} SingleCard */
/** @typedef {import('../src/core-game').InteractionClick} InteractionClick */
/** @typedef {import('../src/core-game').PhasesKey} PhasesKey */

// ------------------------- 3D ----------------------------------

const allCard = randomDeck(FortyTwo * 2);

/** @type {(props: { id: string, value: number, style:object, onClick:Function }) => HTMLElement} */
const Card = ({id, value, style, onClick}) => (
  <div
    onClick={onClick}
    style={style}
    id={id}
    class="
      card
      absolute top-8 left-0;
      scale-[3.2]
      transition-all duration-500
      pointer-events-auto
      hover:outline-2
      hover:outline-dashed
      hover:outline-sky-300
      rounded-lg
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

    <section id="desk" class="
      absolute top-[60%] left-[50%]
      w-[0] h-[0]
      --grid --grid-cols-4 gap-x-[2rem] gap-y-[17rem]
      place-items-center
      --bg-black/75
    "
    >
      <div class="
        p-2 grid place-items-center min-w-[30rem] bg-sky-900/50
        outline outline-1 outline-sky-300 rounded text-sky-200 select-none"
        style={tr3D({ x: 10, y: 20, z: -3, rX: -30, zoom: 2 })}
      >
        <p>phase: <span id="phase" class="text-emerald-300"></span></p>
      </div>
      <div id="p-score" class="absolute top-0 left-0 text-sky-300 py-1 w-[3rem]
        outline outline-1 outline-sky-300 rounded bg-sky-900/50 text-center select-none"
        style={tr3D({ x: -36, y: -22, z: 10, rX: -30, rY:-4, zoom: 3 })}
      ></div>
      <div id="q-score" class="absolute top-0 left-0 text-amber-300 py-1 w-[3rem]
        outline outline-1 outline-amber-300 rounded bg-amber-900/50 text-center
        pointer-events-auto select-none"
        style={tr3D({ x: 47, y: -22, z: 10, rX: -30, rY:3, zoom: 3 })}
        onClick={() => globalThis.location.replace('ship.html')}
      ></div>

      {allCard.map(({ value, id }, idx) => (
        <Card id={id} value={value} style={tr3D({
          x: idx % 2 == 0 ? -30 : 10,
          y: idx % 2 == 0 ? -10 : 10,
          z: idx / 10 + SKY,
          zoom: SIZE
        })}
          onClick={() => {
            bindState.click = id;
            bindState.clickTime = performance.now();
          }}
        />
      ))}
    </section>
  </GalaxyRoute>
).then((page) => {
  const [galaxy] = routeController("screen");
  galaxy.ySpeed = (Math.random() - .5) / .7;
  galaxy.xSpeed = (Math.random() - .5) / .7;
  useKeyboardCurse(galaxy);

  /** @type {HTMLElement} */ const pScore = page.querySelector('#p-score');
  /** @type {HTMLElement} */ const qScore = page.querySelector('#q-score');
  /** @type {HTMLElement} */ const dPhase = page.querySelector('#phase');

  /** @type {SingleCard | null} */
  let prevSelect = null;
  let prevClickHapend = 0;
  /** @type {PhasesKey} */
  let prevPhase = "THE_FIRST_DAY";
  /** @typedef {import('./core-game').State} State */
  /** @type {(st:State) => any} */
  const render = (st) => {
    if (st.clickTime !== prevClickHapend) {
      prevClickHapend = st.clickTime;
      console.log(`click the: ${st.click} phase: ${st.phase}`);

      if (["START_PLAY", "PLAY_MORE"].includes(st.phase)) {
        // const possibleMoves = allPossibleMoves(st.player, st.quest);
        /** @type {SingleCard} */
        const inHand = st.player.hand.find(card => card.id === st.click);
        /** @type {SingleCard} */
        const asEnemy = st.quest.hand.find(card => card.id === st.click);
        if (prevSelect && asEnemy) {
          const result = cardMatcher(prevSelect, asEnemy);
          if (result.kind !== "FAIL") {
            asEnemy.rX = -20;
            return;
          }
        }
        if (prevSelect) prevSelect.rX = 0;
        if (inHand) {
          inHand.rX = -20;
          prevSelect = inHand;
        };
      }
    }

    if (st.phase !== prevPhase) {
      console.log(`chage from ${prevPhase} -> ${st.phase}`)
      prevPhase = st.phase;
      gameLoop(st);
    }

    pScore.innerText = st?.player?.score?.toString() ?? "0";
    qScore.innerText = st?.quest?.score?.toString() ?? "0";
    dPhase.innerText = st?.phase;
    logger(st);
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
  bindState = state;
  const movingCards = allCard.map(card => signal(newOrder)(card));
  gameSetup(state, movingCards.slice(0,12), movingCards.slice(12, 12 + 21));

  const stop = setInterval(() => {
    if (state.phase == "THE_END") clearInterval(stop);
    state.beat = performance.now()
  },FortyTwo * 4);
});

var bindState;
