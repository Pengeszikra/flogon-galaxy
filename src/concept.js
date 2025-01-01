import { setupMarkerViews } from "./marker";
setupMarkerViews();

/** @type {HTMLTextAreaElement} */
const markdownEditor = document.querySelector('textarea');
/** @type {Element & {changeContent: function}} */
const markdownView = document.querySelector('markdown-view');
const cli = document.querySelector('input');
const HIDDEN = "hidden";

markdownEditor.addEventListener("input", 
  (event) => {
  event.stopPropagation();
  markdownView.changeContent(markdownEditor.value);
})

// VIM ??

markdownEditor.addEventListener("keydown",
  /** @type {(event:KeyboardEvent) => any} */
  (event) => {
    const { key } = event;
    switch (key) {
      case "Escape": {
        cli.classList.toggle(HIDDEN);
        cli.focus();
        return;
      }
      default: return;
    }
  }
);

const API = 'http://localhost:3000';
const method = "POST";
const headers = {'Content-Type': 'application/json'};

/** @type {(result:{text:function}) => string} */
const textReader = result => result.text();

/** @type {(line:string) => any} */
const editMark = (line) => {
  console.log(`edit: ${line}`);
  fetch(`${API}/get`, {method, headers,body: JSON.stringify({id:line})})
    .then(result => result.json())
    .then(({content}) => {
      markdownView.changeContent(content);
      markdownEditor.value = content;
    })
    .then(console.warn);
}

/** @type {(line:string) => any} */
const writeMark = (line) => {
  console.log(`write: ${line}`);
  fetch(`${API}/put`, {method, headers,
    body: JSON.stringify({id:line, content: markdownEditor.value})
  })
    .then(textReader)
    .then(console.log)
    .then(console.warn);
}

/** @type {(source: string) => any} */
const runEditorCommand = (source) => {
  const [command, line] = source
    .replace(/^\s*(\S{1})\:\s*([^\s|^\:]+)\s*$/, "$1%$2")
    .split('%');

  if (/^\s*l\:\s*$/.test(source)) return console.log(`list`);
  if (!line) return;

  switch (command) {
    case "e": return editMark(line);
    case "w": return writeMark(line);
  }
}; 

cli.addEventListener("keydown",
  /** @type {(event:KeyboardEvent) => any} */
  (event) => {
    const { key } = event;
    // console.log(key);
    switch (key) {
      case "Enter": {
        runEditorCommand(cli.value);
        markdownView.changeContent(cli.value);
        cli.classList.add(HIDDEN);
        markdownEditor.focus();
        return 
      }
      case "Escape": {
        cli.classList.add(HIDDEN);
        markdownEditor.focus();
        return;
      }
      default: return;
    }
  }
);