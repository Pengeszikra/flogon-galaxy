import {setupMarkerViews} from "./marker";
setupMarkerViews();

const markdownEditor = document.querySelector('textarea');
const markdownView = document.querySelector('markdown-view');

markdownEditor.addEventListener("input", e => {
  e.stopPropagation();
  // @ts-ignore
  markdownView.changeContent(e?.target?.value);
})