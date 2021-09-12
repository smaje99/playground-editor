import { encode, decode } from 'js-base64';

import { $ } from './utils/dom.js';
import { createEditor } from './editor.js'

import './split.js';

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

const { pathname } = window.location;

const [html, js, css] = pathname.slice(1)
                                .split(encodeURI('|'))
                                .map(value => value ? decode(value) : '');

const htmlEditor = createEditor({ domElement: $html, language: 'html', value: html });
const cssEditor = createEditor({ domElement: $css, language: 'css', value: css });
const jsEditor = createEditor({ domElement: $js, language: 'javascript', value: js });

htmlEditor.focus();
htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidChangeModelContent(update);

updateValues( { htmlValue: html, jsValue: js, cssValue: css })

function createHTML({ htmlValue, jsValue, cssValue }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    ${cssValue}
  </style>
</head>
<body>
  ${htmlValue}
  <script>
    ${jsValue}
  </script>
</body>
</html>`
}

function update() {
  const htmlValue = htmlEditor.getValue();
  const jsValue = jsEditor.getValue();
  const cssValue = cssEditor.getValue();

  updateURL({ htmlValue, jsValue, cssValue });
  updateValues({ htmlValue, jsValue, cssValue });
}

function updateURL({ htmlValue, jsValue, cssValue }) {
  // Base64 encryption of editors content
  const hashedCode = `${encode(htmlValue)}|${encode(jsValue)}|${encode(cssValue)}`;

  // URL modification
  window.history.replaceState(null, null, `/${hashedCode}`);
}

function updateValues( { htmlValue, jsValue, cssValue }) {
  $('.playground').setAttribute(
    'srcdoc',
    createHTML({ htmlValue, jsValue, cssValue })
  );
}
