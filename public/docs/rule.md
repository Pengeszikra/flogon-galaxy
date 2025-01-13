/*

This is a semi solitare game rule is:

Each card have 1 important value which is a number between -21 -> 22

player have deck of 20 -> 25 cards of a random values

quest have a deck of 30 cards of a random values

each player hand is open

- if player deck are less than a 4 card then shuffle their drop to deck
- player draw a 4 cards
- quest draw a 2 cards ( END-RULE ) ( QUEST-REVENGE )

---- play phase ---

  player may play card from hand according following pairing rules:

  - pair any positive odd card to quest positive even card
  - pair any positive even card to quest positive odd card

  - pair any negative odd card to quest negative odd card
  - pair any negative even card to quest negative even card

  the score is sum of two card abs value

  - pair any zero card to quest any non-zero card
  - pair any non-zero card to quest zero card

  the score is sum of two card abs value multiple by three

  - pair any card with their inverse, means abs(player.card) === abd(quest.card),
    but cannot pair 0 with 0

  the score is the positive card value multiple by four

  player played card goes to player drop
  quest paired card goes to quest drop

  this process can repeat until player can pair card.

---- end play phase ----

- END-RULE: if quest don't have deck game is end with a collected score - quest score

QUEST-REVENGE
- quest draw 2 cards up to 4
- if quest reach 4 hand then quest on action
- player drop their hand
- quest score the sum abs of cards
- player draw 4 cards
- quest play against player according play phase rules and gains scores
- if quest cannot able to play any card, then drop their hand abs sum scored by player
- quest draw 2 cards up to four ( game end rule are active )
- if end of that phase quest hand goes below four then play right back to the player


*/


const rnd = (n) => Math.random() * n | 0;

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
  *  score: number
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
    score: 0,
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
    score: 0,
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
