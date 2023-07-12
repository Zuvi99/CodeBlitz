import Editor from '@monaco-editor/react';

function CodeEditor() {
    return (
        <Editor
            height="200px"
            width={"500px"}
            defaultLanguage="javascript"
            theme="vs-light"
        />
    )
}

export default CodeEditor