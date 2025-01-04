import { fragment, signal } from '../utils/old-bird-soft';
import {assetList} from './shoot';
import {assets} from './asset';
import {scifiUI} from './ui-elements';

let scroll = 0;
const tableSpeed = 2;
const HIDDEN = "hidden";

/**
 * @typedef {{
*  id: string
*  crd: HTMLElement
*  order: number
*  score: number
*  power: number
*  isInHand: Boolean
* }} Card
*/

/**
 * @typedef {{
 *  run: number | null
 *  score: number
 *  scoreTo: number
 *  deck: Card[]
 *  opponent: Card[]
 *  itIsOver: boolean
 *  scrollSpeed: number
 *  img: string
 * }} State
 */

const initialState = {
  run: 0,
  score: 0,
  scoreTo: 0,
  deck: [],
  itIsOver: false,
  scrollSpeed: tableSpeed,
  img: "",
}

const toolInitState = {
  x: 0,  y: 0,
  w: 5,  h: 5,
  sheetIndex: 0,
  shoot: [],
  m: 10, // important number for sprite editor
         // which is depend on main font size, currently: 10px;
  n: 2,  // less importan the 2 is always seems good.
         // figure out by number tweak
};

const spriteBgImg = index => `url(${spriteSheetList[index]})`;

const dice = (side = 6) => Math.random() * side + 1 | 0;

const drawSprite = ({
  x, y, w, h,
  m = toolInitState.m,
  n = toolInitState.n,
  sheetIndex = 0
}) => (frg) => {
  frg.style.width = `${w}rem`;
  frg.style.height = `${h}rem`;
  frg.style.backgroundImage = spriteBgImg(sheetIndex);
  frg.style.backgroundSize = `${w * 4 / ( w/5)}rem ${h * 4 / (h /5)}rem`;
  const pos = `${(x/-m) + (w/n)}rem ${(y /-m) + (h/n)}rem`;
  frg.style.backgroundPosition = pos;
}

const toolRender = (tState) => {
  const {x, y, w, h, m, n, sheetIndex} = tState;
  sel.style.left =  `calc(${x}px - ${w/2}rem)`;
  sel.style.top =  `calc(${y}px - ${h/2}rem)`;
  sel.style.width = `${w}rem`;
  sel.style.height = `${h}rem`;
  sprite.style.backgroundImage = spriteBgImg(tool.sheetIndex);
  drawSprite(tState)(frg);
  log({m,n, sheetIndex})
};

const storeSprite = () => {
  const {x,y,w,h,sheetIndex, shoot} = tool;
  shoot.push({x,y,w,h,sheetIndex})
  const frg = fragment("#mob-o", "#gallery", `frg-${2000 + shoot.length}`);
  drawSprite(tool)(frg);
  frg.style.position = "relative";
  localStorage.setItem('-shoot-', JSON.stringify(shoot));
}

/** @type {(state:State) => void} */
const render = (state) => {;
  highScore.innerText = state.scoreTo;
  const {score, run, img, scrollSpeed} = state;
  log({score, run, img, scrollSpeed})
}

const state = signal(render)(initialState);
const tool = signal(toolRender)(toolInitState);


// globalThis.state = state;

const questImageList = Array(295).fill('../mid/flogon')
  .map((fn, idx) => fn + (4000 + idx) + '.jpeg')
  .sort(_ => Math.random() - 0.5);

const spriteSheetList = Array(37).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')

let counter = 0;

const body = document.querySelector('body');
const visual1 = document.querySelector('#visual-1');
const sprite = document.querySelector('#sprite-sheet');
const sel = document.getElementById('selector');
const debug = document.getElementById('monitor');
const nextButton = document.querySelector("button");
nextButton.classList.add(HIDDEN)
const highScore = document.querySelector("#high-score");
const desk = document.querySelector("#desk");
const centerNumber = document.querySelector("#center-number");
const topNumber = document.querySelector("#top-number");
const headupDisplay = document.querySelector("#headup-display");

const log = info => debug.innerText = JSON.stringify(info);

let drag = false;

/** @type {(e:MouseEvent) => void} */
sprite.onmousemove = (e) => {
  if (!drag) return;
  e.preventDefault();
  const {offsetX, offsetY} = e;
  // screenX, screenY, clientX, clientY,
  tool.x = offsetX;
  tool.y = offsetY;
}

const nextDay = () => {
  const img = questImageList[counter % questImageList.length];
  state.img = img;
  console.log(`current BG is: ${img}`);
  visual1.style.backgroundImage = `url(${img})`;
  counter ++ ;
};

const toggleUI = () => {
  frg.classList.contains(HIDDEN)
    ? body.classList.add("bg-sky-500")
    : body.classList.add("bg-black");
  frg.classList.toggle(HIDDEN);
  sprite.classList.toggle(HIDDEN);
  sel.classList.toggle(HIDDEN);
  visual1.classList.toggle(HIDDEN);
  headupDisplay.classList.toggle(HIDDEN);

  desk.classList.toggle(HIDDEN);
}

document.addEventListener("keydown",
  /** @type {(event:KeyboardEvent) => any} */
  (event) => {
    const {key} = event;
    switch (key) {
      case "c": return drag = !drag;

      case "n": return nextDay();
      case "z": return toggleUI();
      case "[": return selectSheet(-1);
      case "]": return selectSheet(+1);
      case "a": return tool.w = (+ tool.w - 0.1).toFixed(2);
      case "w": return tool.h = (+ tool.h - 0.1).toFixed(2);
      case "s": return tool.h = (+ tool.h + 0.1).toFixed(2);
      case "d": return tool.w = (+ tool.w + 0.1).toFixed(2);
      case "A": return tool.w = (+ tool.w - 1).toFixed(2);
      case "W": return tool.h = (+ tool.h - 1).toFixed(2);
      case "S": return tool.h = (+ tool.h + 1).toFixed(2);
      case "D": return tool.w = (+ tool.w + 1).toFixed(2);
      case "j": return tool.m ++;
      case "h": return tool.m --;
      case "k": return tool.n ++;
      case "l": return tool.n --;
      case "v": return storeSprite();

      case ",":
      case ";": return interactionToLeft();

      case " ":
      case "'": return interactionCallCard();

      case ".":
      case "\\": return interactionToRight();
    }
  }
);

const interactionToLeft = () => {
  state.scrollSpeed = ( state.scrollSpeed === 0 )
  ? + tableSpeed
  : 0
  ;
};

const interactionToRight = () => {
  state.scrollSpeed = ( state.scrollSpeed === 0 )
    ? - tableSpeed
    : 0
    ;
};

const interactionCallCard = () => {
  callCard();
  state.scrollSpeed = 0;
};

/** @type {HTMLElement} */
document.querySelector("#left-side").onclick = interactionToLeft;
document.querySelector("#center-area").onclick = interactionCallCard;
document.querySelector("#right-side").onclick = interactionToRight;

const callCard = () => {
  const [id] = centerCard() || [];
  try {
    state.deck[id].isInHand = false;
    const who = state.deck[id];
    return callCardToPlay(who);
  } catch (error) {
    state.itIsOver = true;
  }
}

const selectSheet = (direction) => {
  if (tool.sheetIndex + direction < 0) {
    tool.sheetIndex = spriteSheetList.length -1;
    return;
  }
  tool.sheetIndex = (tool.sheetIndex + direction) % spriteSheetList.length;
}

const frg = fragment("#mob-o", "#gallery", "frg-2000");
frg.style.position = 'relative';
frg.classList.add(HIDDEN);


const shuffle23 = () => Array(23)
  .fill(0)
  .map((_, idx) => idx)
  .sort(() => Math.random() - .5);

const shuffledSet = shuffle23();

state.deck = Object.fromEntries(shuffledSet.map((value, idx) => {
  const id = `crd-${9000 + value}`;
  const crd = fragment("#card", "#desk", id);
  drawSprite(assetList[value])(crd);
  const order = idx * 16 - (16 * 12);
  crd.style.transform = `translateX(${order}rem) translateY(22rem) scale(3)`;
  const score = dice(50) * 10 + 10;
  const power = value - 11
  crd.querySelector('div').innerText = power;
  return [id, {crd, order, score, power,  isInHand: true}];
}));

const opponentSet = shuffle23();

state.opponent = opponentSet.map((value, idx) => {
  const id = `opp-${8000 + value}`;
  const opp = fragment("#card", "#desk", id);
  drawSprite(assetList[value])(opp);
  const order = 0;
  opp.style.transform = `translateX(${order}rem) translateY(-11rem) scale(3) translateZ(${idx/6}rem`;
  // const score = dice(50) * 10 + 10;
  const power = value - 11
  opp.querySelector('div').innerText = power;
  return {opp, order, power, idx, value};
});

const flyOut = (order) => [
  `translateX(${order}rem) translateY(-22rem) scale(3) translateZ(-2rem)  rotateX(-50deg)`,
  `translateX(${order}rem) translateY(-22rem) scale(3) translateZ(-4rem)  rotateX(-60deg)`,
  `translateX(${order}rem) translateY(-22rem) scale(3) translateZ(20rem)  rotateX(-80deg)`,
  `translateX(${order}rem) translateY(10rem)  scale(3) translateZ(20rem)  rotateX(-60deg)`,
  `translateX(${order}rem) translateY(8rem)   scale(3) translateZ(20rem)  rotateX(-60deg)`,
  `translateX(${order}rem) translateY(9rem)  scale(3) translateZ(20rem)  rotateX(-55deg)`,
  `translateX(${order}rem) translateY(9rem)  scale(3) translateZ(20rem)  rotateX(-60deg)`,
  `translateX(${order}rem) translateY(10rem)  scale(3) translateZ(20rem)  rotateX(-60deg)`,
  `translateX(${order}rem) translateY(11rem) scale(3) translateZ(0rem)  rotateX(0deg)`,
  `translateX(${order}rem) translateY(11rem) scale(3) translateZ(0rem)  rotateX(0deg)`,
]

const flyToMatch = (order) => [
  `translateX(0rem)              translateY(-22rem) scale(3) translateZ(7rem)   rotateX(-50deg)   `,
  `translateX(${order/1.3}rem)   translateY(0rem)   scale(3) translateZ(12rem)   rotateX(-60deg)`,
  `translateX(${order/1.1}rem)   translateY(35rem)  scale(3) translateZ(14rem)  rotateX(-60deg)`,
  `translateX(${order * 1.1}rem)   translateY(39rem)  scale(3) translateZ(15rem)  rotateX(-60deg)`,
  `translateX(${order}rem)       translateY(16rem)  scale(3) translateZ(17rem)  rotateX(-60deg)`,
  `translateX(${order}rem)       translateY(16rem)  scale(3) translateZ(17rem)  rotateX(-60deg)`,
  `translateX(${order}rem)       translateY(16rem)  scale(3) translateZ(17rem)  rotateX(-60deg)`,
  `translateX(${order}rem)       translateY(16rem)  scale(3) translateZ(17rem)  rotateX(-60deg)`,
  `translateX(${order}rem)       translateY(16rem)  scale(3) translateZ(17rem)  rotateX(-60deg)`,
  `translateX(${order}rem)       translateY(22rem)  scale(3) translateZ(1rem)  rotateX(0deg)`,
]

/** @type {(who:Card) => void} */
const callCardToPlay = async(who) => {
  const cardSpeed = 200;
  const {crd, order, power} = who;
  const {opp, power: opw} = state.opponent.pop();
  // console.log(opp, opw);
  const sequence = [...flyOut(order)];
  const matchSeq = [...flyToMatch(order)];
  const stop = setInterval(() => {
    const ani = sequence.shift();
    const aoo = matchSeq.shift();
    crd.style.transition = `transform ${cardSpeed}ms linear`;
    opp.style.transition = `transform ${cardSpeed}ms linear`;
    crd.style.transform = ani;
    opp.style.transform = aoo;
    if (sequence.length === 4) {
      state.score += calcScore(power, opw);
    }
    if (!sequence.length) { clearInterval(stop) }
  }, cardSpeed);
};

/** @type {(play:number, base:number) => number} */
const calcScore = (play, base) => {
  const MULTIPLIER = 100;
  switch (true) {
    case  (play > 0 && base > 0 && play % 2 !== base % 2): return MULTIPLIER * (+ play + base);
    case  (play < 0 && base < 0 && play % 2 === base % 2): return MULTIPLIER * (- play - base);
    case  (play === - base): return 2 * MULTIPLIER * Math.abs(play - base);
    case  (play === 0 ): return 5 * MULTIPLIER * Math.abs(base);
    case  (base === 0 ): return 5 * MULTIPLIER * Math.abs(play);
    default: return 0;
  }
}

[
  ...assets,
  ...assets,
  ...assets,
  // ...assets
].map((src, idx) => {
  const frg = fragment("#mob", "#desk", `frg-${5000 + idx}`);
  drawSprite(src)(frg);
  frg.style.outline = "none;"
  frg.style.transform = `
    translateX(${dice(400)-200}rem)
    translateY(${dice(50)-10}rem)
    translateZ(${dice(-7) - 3}rem)
    scale(2)
    rotateX(-50deg)
  `;
})

scifiUI.map((src, idx) => {
  const ui = fragment("#ui-blend", "#desk", `ui-${5000 + idx}`);
  drawSprite(src)(ui);
  ui.style.outline = "none;"
  ui.style.transform = `
    translateX(${dice(800)-400}rem)
    translateY(22rem)
    translateZ(-10rem)
    scale(18)
    rotateX(-10deg)
  `;
})

const deskMotion = (x) => {
   const trans = `
    perspective(60vh)
    translateX(${x}px)
    translateZ(0px)
    rotateX(40deg)
    rotateY(0deg)
    rotateZ(0deg)
    scale(.64)
    `;
    desk.style.transform = trans;
}

setInterval(() => {
  if ( !state.scrollSpeed ) return;
  if (scroll - state.scrollSpeed < - 1200 ||
    scroll - state.scrollSpeed > 1700
  ) {
    state.scrollSpeed = -state.scrollSpeed;
    state.run = dice(21) - 11;
  }
  deskMotion(scroll -= state.scrollSpeed)
}, 5);

body.onmouseleave = () => {
  state.bdrag = false;
}

const highScoreAnim = () => {
  if (state.scoreTo < state.score) state.scoreTo += 50;
  if (state?.opponent?.length) {
    topNumber.innerHTML = state.opponent.at(-1).power;
  }
  const [id] = centerCard() || [];
  if (state?.deck?.[id]) {
    centerNumber.innerHTML = state.deck[id].power;
  }

  requestAnimationFrame(highScoreAnim);
}
requestAnimationFrame(highScoreAnim);

const closeToCenter = (pos, center) => Math.abs(center - (pos.left + pos.width / 2));
/** @type {() => Card} */
const centerCard = () => {
  const center = window.innerWidth / 2;
  const inHand = Object
    .entries(state.deck)
    .filter(([,{isInHand}]) => isInHand)
  if (inHand.length < 1) {
    const endScreen = document.querySelector('#end-screen');
    endScreen.classList.remove(HIDDEN);
    endScreen.querySelector('#score-board').innerHTML = `score: ${state.score}`;
    return
  }
  return inHand
    .reduce((col, itm) => {
      const itmPos = closeToCenter(itm[1].crd.getBoundingClientRect(), center);
      const colPos = closeToCenter(col[1].crd.getBoundingClientRect(), center);
      return itmPos < colPos
        ? itm
        : col
    });
}

const rulePage = document.querySelector('#game-rule');
rulePage.querySelector('button').onclick = () => rulePage.classList.add(HIDDEN);

nextDay();
