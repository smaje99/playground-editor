import { encode, decode } from 'js-base64';
import * as monaco from 'monaco-editor';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';

import { $ } from './utils/dom.js';

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'html') return new HtmlWorker();
  }
}

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

const htmlEditor = monaco.editor.create($html, {
  value: '',
  language: 'html',
  theme: 'vs-dark'
});

const createHTML = ({ html, js, css }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    ${js}
  </script>
</body>
</html>`
}

const update = () => {
  const html = $html.value;
  const js = $js.value;
  const css = $css.value;

  // Base64 encryption of editors content
  const hashedCode = `${encode(html)}|${encode(js)}|${encode(css)}`;

  // URL modification
  window.history.replaceState(null, null, `/${hashedCode}`);

  const htmlForPreview = createHTML({ html, js, css });
  $('.playground').setAttribute('srcdoc', htmlForPreview);
}

const init = () => {
  const { pathname } = window.location;

  const [html, js, css] = pathname.slice(1)
                                  .split(encodeURI('|'))
                                  .map(content => decode(content));
  $html.value = html;
  $js.value = js;
  $css.value = css;

  const htmlForPreview = createHTML({ html, js, css });
  $('.playground').setAttribute('srcdoc', htmlForPreview);
}

$js.addEventListener('input', update);
$css.addEventListener('input', update);
htmlEditor.onDidChangeModelContent(update);

init();
