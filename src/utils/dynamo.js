const API = 'http://localhost:3000';
const method = "POST";
const headers = {'Content-Type': 'application/json'};

/** @typedef {(source: string) => string | PromiseLike<string>} TextRender */
/** @typedef {(source: object) => object | PromiseLike<object>} ObjectRender */

/** @type {(render:TextRender) => (id:string) => Promise} */
export const textGet = render => id => fetch(`${API}/get`, {
  method, headers, body: JSON.stringify({id}),
})
  .then(r=>r.text())
  .then(render)
  .catch(console.error)
;

/** @type {(render:ObjectRender) => (id:string) => Promise} */
export const objectGet = render => id => fetch(`${API}/get`, {
  method, headers, body: JSON.stringify({id}),
})
  .then(r=>r.json())
  .then(render)
  .catch(console.error)
;