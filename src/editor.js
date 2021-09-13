import * as monaco from 'monaco-editor';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const COMMON_EDITOR_OPTIONS = {
    fontFamily: 'JetBrains Mono',
    theme: 'vs-dark',
    automaticLayout: true,
    padding: {
        top: 16
    }
}

const workers = {
    'html': () => new HtmlWorker(),
    'javascript': () => new JsWorker(),
    'css': () => new CssWorker()
}

window.MonacoEnvironment = {
    getWorker (_, label) {
        return workers[label];
    }
}

export const createEditor = ({domElement, language, value}) => {
    return monaco.editor.create(domElement, {
        value,
        language,
        ...COMMON_EDITOR_OPTIONS
    });
}
