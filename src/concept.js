import { setupMarkerViews } from "./marker";

/**
 * Sets up the environment for a markdown editor with CLI commands.
 * 
 * Features:
 *  1) Updates a <markdown-view> element as the user types in a <textarea>.
 *  2) On pressing ESC in the <textarea>, toggles an <input> CLI field.
 *  3) CLI commands:
 *     - e:someName => fetch content with given ID and load into editor
 *     - w:someName => save editor content with given ID
 *     - l:         => a placeholder list command
 *
 * Assumes an API server is running at 'http://localhost:3000' with:
 *    POST /get  => expects { "id": string }, returns JSON { "content": string }
 *    POST /put  => expects { "id": string, "content": string }
 */
(function main() {
  // Initialize marker views
  setupMarkerViews();

  // Query elements from DOM
  /** @type {HTMLTextAreaElement | null} */
  const markdownEditor = document.querySelector("textarea");

  /** @type {Element & { changeContent: (arg0: string) => void } | null} */
  const markdownView = document.querySelector("markdown-view");

  /** @type {HTMLInputElement | null} */
  const cli = document.querySelector("input");

  const HIDDEN = "hidden";

  // Basic sanity checks to ensure elements exist before proceeding
  if (!markdownEditor || !markdownView || !cli) {
    console.error("Required elements are missing from the page: 'textarea', 'markdown-view', and/or 'input'.");
    return;
  }

  // Constants for fetching
  const API = "http://localhost:3000";
  const method = "POST";
  const headers = { "Content-Type": "application/json" };

  /**
   * Safely parse or handle text from a fetch response
   * @param {Response} res
   * @returns {Promise<string>}
   */
  const textReader = (res) => res.text();

  /**
   * Handles changing the local markdown view's content
   * @param {string} newContent
   */
  const updateMarkdownView = (newContent) => {
    markdownView.changeContent(newContent);
    // Also keep <textarea> synced
    markdownEditor.value = newContent;
  };

  /**
   * Fetches content from the server by ID, then updates the editor.
   * @param {string} line - The identifier for the content
   */
  const editMark = async (line) => {
    console.log(`edit: ${line}`);
    try {
      const res = await fetch(`${API}/get`, {
        method,
        headers,
        body: JSON.stringify({ id: line }),
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch. Status: ${res.status} - ${res.statusText}`);
      }
      const { content } = await res.json();
      updateMarkdownView(content);
      console.warn("editMark complete");
    } catch (error) {
      console.error("editMark error:", error);
    }
  };

  /**
   * Sends the current editor content to the server to store under a given ID
   * @param {string} line - The identifier under which to store the content
   */
  const writeMark = async (line) => {
    console.log(`write: ${line}`);
    try {
      const res = await fetch(`${API}/put`, {
        method,
        headers,
        body: JSON.stringify({ id: line, content: markdownEditor.value }),
      });
      if (!res.ok) {
        throw new Error(`Failed to write. Status: ${res.status} - ${res.statusText}`);
      }
      const text = await textReader(res);
      console.log(`Server response: ${text}`);
      console.warn("writeMark complete");
    } catch (error) {
      console.error("writeMark error:", error);
    }
  };

  /**
   * Interprets commands in the CLI. Accepts commands like:
   *   "e:myDocument" => calls editMark("myDocument")
   *   "w:myDocument" => calls writeMark("myDocument")
   *   "l:" => logs "list"
   * @param {string} source 
   */
  const runEditorCommand = (source) => {
    // " e:someName " => "e%someName" => ["e", "someName"]
    const normalized = source.replace(/^\s*(\S{1})\:\s*([^\s:^]+)\s*$/, "$1%$2");
    const [command, line] = normalized.split("%");

    // If user typed "l:" -> show "list"
    if (/^\s*l\:\s*$/.test(source)) {
      console.log("list");
      return;
    }

    // If line doesn't exist, do nothing
    if (!line) return;

    switch (command) {
      case "e":
        editMark(line);
        break;
      case "w":
        writeMark(line);
        break;
      default:
        console.log(`Unknown command: ${command}`);
        break;
    }
  };

  // MAIN EVENT HANDLERS

  // 1) On text input, update <markdown-view>
  markdownEditor.addEventListener("input", (event) => {
    event.stopPropagation();
    updateMarkdownView(markdownEditor.value);
  });

  // 2) On pressing keys in the editor
  markdownEditor.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Escape":
        cli.classList.toggle(HIDDEN);
        cli.focus();
        break;
      default:
        break;
    }
  });

  // 3) On pressing keys in the CLI
  cli.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "Enter":
        runEditorCommand(cli.value);
        // For debugging, show CLI content in <markdown-view> if you want
        // markdownView.changeContent(cli.value);

        // Hide CLI and refocus the editor
        cli.classList.add(HIDDEN);
        markdownEditor.focus();
        break;
      case "Escape":
        cli.classList.add(HIDDEN);
        markdownEditor.focus();
        break;
      default:
        break;
    }
  });
})();
