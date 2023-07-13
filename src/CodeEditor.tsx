import Editor from '@monaco-editor/react';
import {useColorMode} from "@chakra-ui/react";

function CodeEditor() {
    const {colorMode} = useColorMode()
    return (
        <Editor
            height="500px"
            defaultLanguage="java"
            theme={colorMode === "light" ? "vs-light" : "vs-dark"}
        />
    )
}

export default CodeEditor