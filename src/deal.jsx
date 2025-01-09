import { fencer, portal, Fragment, Sprite } from "./utils/fencer";
import { GalaxyRoute, galaxyTextureList, routeController, useKeyboardCurse } from "./GalaxyRoute";
import { assetList } from "./throw/shoot";
import { flogons } from "./flogonsSprites";
import { rnd } from "./utils/old-bird-soft";

/**
 * @typedef {{
 *  x: number
 *  y: number
 *  z: number
 *  rX: number
 *  rY: number
 *  rZ: number
 * }} Pos3D
 */


/** @type {Pos3D} */
const origo = {x:0, y:0, z:0, rX: 0, rY:0, rZ: 0};

/**
  *  @typedef {{
  *   id: string
  *   value: number
  *   name?: string
  *   description?: string
  *   skill?: string
  *   order: number
  * }} CardInfo
  */

/** @typedef {CardInfo & Pos3D} SingleCard */

/**
  * @typedef {{
  *  whoyou: string
  *  description?: string
  *  deck: SingleCard[]
  *  hand: SingleCard[]
  *  drop: SingleCard[]
  *  select: SingleCard | null
  *  play: SingleCard | null
  *  target: SingleCard | null
  * }} Entity
  */

export const gameMechanism = async () => {
  /** @type {Entity} */
  const player = {
    whoyou: "player",
    deck: [],
    hand: [],
    drop: [],
    select: null,
    play: null,
    target: null,
  };

  /** @type {Entity} */
  const quest = {
    whoyou: "quest",
    description: "save the word",
    deck: [], // Array(20).fill().map((_,idx) => ({id:idx, value:rnd(41) - 21}, order:0, ...origo})),
    hand: [],
    drop: [],
    select: null,
    play: null,
    target: null,
  };

  player.deck = Array(20)
    .fill()
    .map((_,idx) => ({
        id:idx.toString(),
        value: rnd(41) - 21,
        order:0,
        ...origo
    }));

  quest.deck = Array(20)
    .fill()
    .map((_,idx) => ({
        id:idx.toString(),
        value: rnd(41) - 21,
        order:0,
        ...origo
    }));



  };

/** @type {(props: { id: number, value: number }) => HTMLElement} */
const Card = ({id, value}) => (
  <div class="relative scale-[4] transition-all duration-500 pointer-events-auto hover:scale-[5]">
    <Sprite
      {...assetList[id]}
      class="rounded-xl outline outline-1 outline-zinc-900">
    </Sprite>
    <div class="
      text-neutral-700
      text-[1rem]
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
    <section id="desk" class="
      w-[100vw] h-[100vw]
      grid grid-cols-4 gap-x-[1rem] gap-y-[10rem]
      place-items-center
      bg-yellow-700
    "
    >
      {assetList.slice(0,8).map((_, idx) => <Card id={idx} value={idx - 11} />)}
    </section>
  </GalaxyRoute>
).then(() => {
  const [state] = routeController("screen");
  useKeyboardCurse(state);
});
