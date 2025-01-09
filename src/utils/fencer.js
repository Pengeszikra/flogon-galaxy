    //   F E N C E R - T H E - F R A M E W O R K    \\
   //                                                \\
  // - - - - - - - - - - - - - - - [ pure web ] - - - \\

/**
 * @type {(
 *   tag: string | function,
 *   attrs?: {
 *     class?: string,
 *     style?: object,
 *     [key: string]: any
 *   },
 *   ...children: any[]
 * ) => HTMLElement }
 */
export const fencer = (tag, attrs, ...children) => {
  if (typeof tag === 'function') return tag({ ...attrs, children });

  if (typeof tag === 'string') {
    const fragments = document.createDocumentFragment();
    const element = document.createElement(tag);

    children.flat().forEach(child => {
      switch (true) {
        case (child instanceof Node)
          : fragments.appendChild(child);
          ; break ;
        case (typeof child === 'string' || typeof child === 'number')
          : fragments.appendChild(document.createTextNode(child.toString()));
          ; break ;
        case (Array.isArray(child))
          : child.forEach(nestedChild => {
              if (nestedChild instanceof Node) fragments.appendChild(nestedChild);
            });
          ; break ;
        case (child !== null && child !== undefined)
          : fragments.appendChild(document.createTextNode(String(child)));
          ; break ;
        default:
          console.warn('Unhandled child type:', child);
      }
    });

    element.appendChild(fragments);

    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        switch (true) {
          case (key === 'class' && value)
            : element.className = value ;
            ; break ;
          case (key === 'style' && typeof value === 'object')
            : Object.entries(value).forEach(([styleKey, styleValue]) => {
                element.style[styleKey] = styleValue;
              });
            ; break ;
          case (key.startsWith('on') && typeof value === 'function')
            : element.addEventListener(key.slice(2).toLowerCase(), value);
            ; break ;
          default
            : element.setAttribute(key, value);
        }
      });
    }

    return element;
  }
};

/** @type {(children: any) => DocumentFragment} */
export const Fragment = (...children) => {
  const fragment = document.createDocumentFragment();

  // Normalize children to always be an array
  const normalizedChildren = Array.isArray(children[0]) ? children[0] : children;

  normalizedChildren.flat().forEach(child => {
    switch (true) {
      case (child instanceof Node)
        : fragment.appendChild(child);
        ; break ;
      case (typeof child === 'string')
        : fragment.appendChild(document.createTextNode(child));
        ; break ;
      case (Array.isArray(child))
        : child.forEach(nestedChild => {
            if (nestedChild instanceof Node) fragment.appendChild(nestedChild);
          });
        ; break ;
      default
        : console.warn('Unhandled Fragment child type:', child);
    }
  });

  return fragment;
};

/** @type {(view: HTMLElement ) => Promise<HTMLElement >} */
export const portal = view => new Promise(resolve => {
  document.body.appendChild(view);
  resolve(view); // Resolve the promise with the appended element
});


const spriteSheetList = Array(37).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')

/** @type {(index:number) => string} */
const spriteBgImg = index => `url(${spriteSheetList[index]})`;

/** 
  * @typedef {{
  * x: number,
  * y: number,
  * w: number | string,
  * h: number | string,
  * sheetIndex?: number
  * }} SpriteProps
  */

/** 
  * @typedef {SpriteProps & {
  * class?: string,
  * style?: Record<string, string | number>
  * }} ExtendedSpriteProps
  */

/** 
  * @type {(props:SpriteProps, m?:number, n?:number) 
  *   => (frg: HTMLElement ) => void}
  */
const drawSprite = ({
  x, y, w, h,
  sheetIndex = 0
},
  m = 10,
  n = 2
) => (frg) => {
  frg.style.width = `${w}rem`;
  frg.style.height = `${h}rem`;
  frg.style.backgroundImage = spriteBgImg(sheetIndex);
  frg.style.backgroundSize = `${+w * 4 / (+w / 5)}rem ${+h * 4 / (+h / 5)}rem`;
  const pos = `${(x / -m) + (+w / n)}rem ${(y / -m) + (+h / n)}rem`;
  frg.style.backgroundPosition = pos;
};

/** @type {(props: ExtendedSpriteProps) => HTMLElement } */
export const Sprite = ({ x, y, w, h, sheetIndex=0, class:className = '', style = {} }) => {
  const spriteElement = fencer('div', {
    class: className,
    style: {...style},
  });
  drawSprite({ x, y, w, h, sheetIndex })(spriteElement);
  return spriteElement;
};
