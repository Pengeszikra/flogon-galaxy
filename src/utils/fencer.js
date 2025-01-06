/** @type {(tag: string | function, attrs?: object, ...children: any[]) => HTMLElement | DocumentFragment} */
export const fencer = (tag, attrs, ...children) => {
  if (typeof tag === 'function') return tag({ ...attrs, children });
  if (typeof tag === 'string') {
    const fragments = document.createDocumentFragment();
    const element = document.createElement(tag);

    children.forEach(child => {
      if (child instanceof Node) {
        fragments.appendChild(child);
      } else if (typeof child === 'string') {
        fragments.appendChild(document.createTextNode(child));
      } else if (Array.isArray(child)) {
        child.forEach(nestedChild => {
          if (nestedChild instanceof Node) fragments.appendChild(nestedChild);
        });
      } else {
        console.warn('Unhandled child type:', child);
      }
    });

    element.appendChild(fragments);

    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class' && value) {
          // Handle dynamic class
          if (typeof value === 'string') {
            element.className = value; // Assign string directly
          } else if (Array.isArray(value)) {
            element.className = value.filter(Boolean).join(' '); // Join array into string
          } else if (typeof value === 'object') {
            element.className = Object.entries(value)
              .filter(([_, isActive]) => isActive)
              .map(([className]) => className)
              .join(' '); // Convert object keys with truthy values to class list
          }
        } else if (key === 'style' && typeof value === 'object') {
          // Handle `style` object
          Object.entries(value).forEach(([styleKey, styleValue]) => {
            element.style[styleKey] = styleValue;
          });
        } else if (key.startsWith('on') && typeof value === 'function') {
          // Add event listeners
          element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          // Set other attributes
          element.setAttribute(key, value);
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
    if (child instanceof Node) {
      fragment.appendChild(child);
    } else if (typeof child === 'string') {
      fragment.appendChild(document.createTextNode(child));
    } else if (Array.isArray(child)) {
      child.forEach(nestedChild => {
        if (nestedChild instanceof Node) fragment.appendChild(nestedChild);
      });
    } else {
      console.warn('Unhandled Fragment child type:', child);
    }
  });

  return fragment;
};

/** @type {(view: HTMLElement | DocumentFragment) => Promise<HTMLElement | DocumentFragment>} */
export const portal = view => {
  return new Promise(resolve => {
    document.body.appendChild(view);
    resolve(view); // Resolve the promise with the appended element
  });
};

const spriteSheetList = Array(37).fill('../sheets/sprite-')
  .map((fn, idx) => fn + (7000 + idx) + '.png')

/** @type {(index:number) => string} */
const spriteBgImg = index => `url(${spriteSheetList[index]})`;

/** @typedef {{
  * x: number,
  * y: number,
  * w: number,
  * h: number,
  * sheetIndex?: number
  * }} SpriteProps
  */

/** @typedef {SpriteProps & {
  * class?: string,
  * style?: Record<string, string | number>
  * }} ExtendedSpriteProps
  */

/** @type
  * {(props:SpriteProps, m?:number, n?:number) =>
  * (frg: HTMLElement | DocumentFragment) => void}
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
  frg.style.backgroundSize = `${w * 4 / (w / 5)}rem ${h * 4 / (h / 5)}rem`;
  const pos = `${(x / -m) + (w / n)}rem ${(y / -m) + (h / n)}rem`;
  frg.style.backgroundPosition = pos;
};

/** @type {(props: ExtendedSpriteProps) => HTMLElement | DocumentFragment} */
export const Sprite = ({ x, y, w, h, sheetIndex=0, class:className = '', style = {} }) => {
  const spriteElement = fencer('div', {
    class: className,
    style: {...style},
  });
  drawSprite({ x, y, w, h, sheetIndex })(spriteElement);
  return spriteElement;
};
