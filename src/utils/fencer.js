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
        if (key === 'style' && typeof value === 'object') {
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

export const Fragment = (...children) => children.flat(); // Optional if you use fragments

/** @type {(view: HTMLElement | DocumentFragment) => HTMLElement | DocumentFragment} */
export const portal = view => document.body.appendChild(view);
