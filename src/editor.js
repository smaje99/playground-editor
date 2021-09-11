import * as monaco from 'monaco-editor';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const COMMON_EDITOR_OPTIONS = {
    fontFamily: 'JetBrains Mono',
    theme: 'vs-dark',
    padding: {
        top: 16
    }
}

window.MonacoEnvironment = {
    getWorker (_, label) {
        if (label === 'html') return new HtmlWorker();
        if (label === 'javascript') return new JsWorker();
        if (label === 'css') return new CssWorker();
    }
}

export const createEditor = ({domElement, language, value}) => {
    return monaco.editor.create(domElement, {
        value,
        language,
        ...COMMON_EDITOR_OPTIONS
    });
}
