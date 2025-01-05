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

// VIM ?? not now!

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

const API = 'http://localhost:3000'; //  `${process.env.API}:${process.env.api.PORT}`   ///
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
    body: JSON.stringify({id:line, content: markdownEditor.value, upDated: Date.now()})
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
        event.preventDefault();
        runEditorCommand(cli.value);
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


/** @type {(event:DragEvent) => any} */
const handleImageDrop = (event) => {
  event.preventDefault();
  const {items} = event.dataTransfer;
  for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'string' && item.type.match('^text/plain')) {
          item.getAsString(function (url) {
              // Check if the dropped text is an image URL
              if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                  const imageMarkdown = `![](${url})`;
                  const start = cli.selectionStart;
                  const end = cli.selectionEnd;
                  const text = cli.value;
                  cli.value = text.substring(0, start) + imageMarkdown + text.substring(end);                  
                  // Trigger change event to update preview
                  cli.dispatchEvent(new Event('input'));
              }
          });
      }
  }
}