    //   M A R K E R - T H E - C O N S T R U C T O R  \\
   //                                                  \\
  // - - - - - - - - - - - - - - - - [ pure web ] - - - \\

  // @ts-nocheck

  /**
   * https://mateam.net/html-escape-characters/
   *
   * @type {(str:string) => string}
   */
  const encodCodeBlockToSafeHtml = str => str
    .replaceAll(/[\&|<|>|\\|']/g,
      specialCharacter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "\\": "&#92",
        "'": "&apos;",
        "`": "&#96",
        "|": "|"
      }[specialCharacter]));

  /** @type {(safeCode:string) => string} */
  const syntaxHighlight = safeCode => {
    return encodCodeBlockToSafeHtml(safeCode)
      .replaceAll(/("[^&]*"|`[^&]*`|&apos;[^&]*&apos;)/g, "<st>$1</st>")
      .replaceAll(/(&lt;[^\s|^&]*&gt;)/g, "<wt>$1</wt>")
      .replaceAll(/(&lt;[^\s|^&|^\!]*)(\s+)/g, "<wt>$1</wt>$2")
      .replaceAll(/(\/&gt;)/g, "<wt>$1</wt>")
      .replaceAll(/(\{|\}|\(|\)|\[|\])/g, "<sw>$1</sw>")
      .replaceAll(/(\s*|\n*)(const|let|return|function|var|for|if|while|\?|\:)(\s+|\n+)/g, "$1<rw>$2</rw>$3")
      .replaceAll(/(\s*|\n*)(className|class|onClick|onInput|export|import|@type|@typedef|string|number|object|false|true)(\s+|\n+|\=)/g, "$1<ew>$2</ew>$3")
      .replaceAll(/(\=&gt;|\=|\|)/g, "<uw>$1</uw>")
      .replaceAll(/(\/\/(.*)$)/g, "<rm>$1</rm>") // .replaceAll(/(\<([^\>|^rm]*)\>)/g,"")
      .replaceAll(/(\/\*\*[^\*|.]*\*\/)/g, "<jd>$1</jd>")
      .replaceAll(/(&lt;\!--[.|^&]*--&gt;)/g, "<rm>$1</rm>")
      ;
  }

  const inlineMarkdown = str => encodCodeBlockToSafeHtml(str)
    .replaceAll(
      /`([^`]*)`/g,
      `<span class="text-[--code-sm]">$1</span>`
    )
    .replaceAll(
      /^\!\[([^\]]*)\]\(([^\)]+)\)/g,
      `<image src="$2" alt="$1" class="h-auto" loading="lazy" />`
    )
    .replaceAll(
      /\[([^\]]+)\]\(([^\)].+)\)/g,
      `<a class="
       transition-all
       duration-500
       text-white
       hover:text-sky-400
       hover:bg-sky-800
       p-2 rounded"
       href="$2"
       target="_blank">$1</a>
      `
    );

  // const debugMs = document.querySelector('#debug-ms');

  /**
   * Very Earluy POC level Parser
   * @type {(source:string) => string}
   */
  const markdownParser = (source) => {
    const start = performance.now();
    let codeBlock = false;
    const CR = '\n';
    const lines = source.split(CR);
    const colorCode = lines.map(
      line => {
        if (codeBlock) switch (true) {
          case /^\s*```\.\.\./.test(line): {
              const code = codeBlock.join('\n');
              codeBlock = false;
              const NO = Symbol('NO');
              let result;
              let error;
              try {
                result = (new Function(
                  code.includes('return')
                    ? code
                    : "return " + code
                ))();
                if (typeof result === "object") result = JSON.stringify(result, 2, null);
                if (result?.toString() === undefined) error = "result.toStirng() :: undefined"
              } catch(err) {
                error = err
              }

              return `</pre><pre class="overflow-x-scroll p-2 mt-1 whitespace-pre-wrap overflow-auto
                ${!error ? 'bg-emerald-900' : 'bg-rose-900'}"
                >${result ?? error}</pre>
              `;
            }
          case /^\s*```/.test(line):
            codeBlock = false;
            return '</pre>'
          default:
            codeBlock.push(line)
            return syntaxHighlight(line);
        }

        if (!codeBlock) switch (true) {
          case /^\s*```/.test(line):
            codeBlock = [];
            return '<pre class="bg-zinc-950 p-4 text-emerald-200 overflow-x-scroll">'
          case /^\s*#\s/.test(line):
            return `<h1 class="text-orange-200 text-[2rem]">${inlineMarkdown(
              line.slice(line.indexOf('#') + 2 ?? 0)
            )}</h1>`;
          case /^\s*#+\s/.test(line):
            return `<h2 class="text-orange-400 text-xl">${inlineMarkdown(
              line.slice(line.indexOf('#') + 2 ?? 0)
            )}</h2>`;
          case /^\s*_[^_]+_/.test(line):
            return `<em>${inlineMarkdown(
              line.replaceAll('_', '')
            )}</em>`;
          case /^\s*>\s/.test(line):
            return `<p class="bg-zinc-950 p-4 rounded">${inlineMarkdown(
              line.replace('>', '')
            )}</p>`;
          case /\{\%\s*([^%]+)\s*\%\}/.test(line):
            return line.replaceAll(
              /(\{\%\s*)([^%]+)(\s*\%\})/g,
              `<iframe width="100%" class="h-[45rem] bg-black" src="$2" frameborder="0" scrolling="no"></iframe>`
            )
          case /\{\%\s*([^\%]+)\s*\%[^\}]+\}/.test(line):
            return line.replaceAll(
              /(\{\%\s*)([^\%]+)(\s*\%)([^\}]+)(\})/g,
              `<iframe style="width:100%; aspect-ratio:$4;" class="bg-black" src="$2" frameborder="0" scrolling="no"></iframe>`
            )
          default:
            return inlineMarkdown(line);
        }
      }
    )
      .join(CR);
    // debugMs.innerHTML = `run: ${performance.now() - start} ms`;
    return colorCode;
  }

export const setupMarkerViews = () => {
  const marker = customElements.define('markdown-view', class extends HTMLElement {
    constructor() {
      super();
      const source = this.getAttribute('source');
      if (source) {
        // console.log('markdown ::', source);
        this.loadMarkdown(source);
      }
    }

    loadMarkdown (file) {
      fetch(file)
        .then(r => r.text())
        .then(md => this.changeContent(md))
    }

    changeContent(source) {
      this.innerHTML = markdownParser(source);
    }
  });

  return marker;
};