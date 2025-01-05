import { fragment, signal } from './utils/old-bird-soft';
import {assets} from './throw/asset';
import { scifiUI } from './throw/ui-elements';


const map = document.querySelector('main');
/** @type {HTMLDivElement} */
const origo = document.querySelector('#origo');
/** @type {HTMLDivElement} */
const bLeft = document.querySelector('#btn-left');
/** @type {HTMLDivElement} */
const bRight = document.querySelector('#btn-right');

map.style.backgroundBlendMode = "screen, normal";

const initial = {x:0, y:0, z:0, xSpeed:0, ySpeed:0, zSpeed:0};
const ship = signal(p=>p)(initial);
const loop = () => {
  ship.x += ship.xSpeed;
  ship.y += ship.ySpeed;
  ship.z += ship.zSpeed;
  map.style.backgroundPosition = `${ship.x}% ${ship.y}%,${ship.x/1.4}% ${ship.y/1.4}%`;
  origo.style.transform = `
    translateX(${-ship.x/2}rem)
    translateY(${-ship.y/2}rem)
    translateZ(${ship.z/4}rem)
  `;
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

document.addEventListener("keydown",
  /** @type {(event:KeyboardEvent) => any} */
  (event) => {
    const {key} = event;
    switch (key) {
      case "a": return ship.xSpeed += .1;
      case "w": return ship.ySpeed -= .1;
      case "s": return ship.ySpeed += .1;
      case "d": return ship.xSpeed -= .1;
      case "r": return ship.zSpeed += .1;
      case "e": return ship.zSpeed -= .1;
      case " ": {
        ship.xSpeed = 0;
        ship.ySpeed = 0;
        ship.zSpeed = 0;
        return;
      };
    }
  }
);

bLeft.onclick  = () => ship.xSpeed -= .1;
bRight.onclick = () => ship.xSpeed += .1;

// extra items

const dice = (side = 6) => Math.random() * side + 1 | 0;

const spriteSheetList = Array(37).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')

const spriteBgImg = index => `url(${spriteSheetList[index]})`;

const drawSprite = ({
  x, y, w, h,
  m = 10,
  n = 2,
  sheetIndex = 0
}) => (frg) => {
  frg.style.width = `${w}rem`;
  frg.style.height = `${h}rem`;
  frg.style.backgroundImage = spriteBgImg(sheetIndex);
  frg.style.backgroundSize = `${w * 4 / ( w/5)}rem ${h * 4 / (h /5)}rem`;
  const pos = `${(x/-m) + (w/n)}rem ${(y /-m) + (h/n)}rem`;
  frg.style.backgroundPosition = pos;
}


[
  ...assets,
  ...assets,
  ...assets,
  ...assets,
].map((src, idx) => {
  const frg = fragment("#mob", "#origo", `frg-${5000 + idx}`);
  drawSprite(src)(frg);
  frg.style.outline = "none;"
  frg.style.transform = `
    translateX(${dice(200) - 100}rem)
    translateY(${dice(200) - 100}rem)
    translateZ(${dice(800) - 400}rem)
    scale(2)
    rotateX(-50deg)
  `;
});
