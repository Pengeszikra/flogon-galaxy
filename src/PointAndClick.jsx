import { fencer } from "./utils/fencer";

/** @typedef {{ id:string, bg:string, w?: number, h?: number, top?: number ,left?: number, right?:number, nextUrl?:string, bgDyn?:string }} RouteButton */

/** @type {(props:RouteButton) => HTMLElement} */
export const PointAndClick = ({
  id, w=5, h=5, top=0, left=0,
  nextUrl = "", bg ="",
  bgDyn = `pointer-events-auto absolute ${bg}`
}) => (
  <button id={id}
    class={bgDyn}
    style={{
        top: `${top}rem`,
       left: `${left}rem`,
      width: `${w}rem`,
     height: `${h}rem`,
    }}
    onClick={() => globalThis.location.replace(nextUrl)}
  ></button>
);
