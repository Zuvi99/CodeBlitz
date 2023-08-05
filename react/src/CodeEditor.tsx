import { Card, CardBody, useColorMode } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { SupportedLanguage } from "./types.ts";
import { useMemo } from "react";
import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const SampleCode: Record<SupportedLanguage, string> = {
	javascript: `var hello = "Hello, JavaScript!";
console.log(hello);`,
	java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
	python: `print("Hello, Python!");`,
	typescript: `const hello : string = "Hello, TypeScript!";
console.log(hello);`,
    ruby: `puts 'Hello, Ruby!'`,
	cpp: `#include <iostream>
int main() {
    std::cout << "Hello, C++!";
    return 0;
}`,
};

type CodeEditorProps = {
	language: SupportedLanguage;
	editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
};

const CodeEditor = ({ language, editorRef }: CodeEditorProps) => {
	const { colorMode } = useColorMode();
	const sampleCode = useMemo(() => SampleCode[language], [language]);

	function handleEditorDidMount(
		editor: IStandaloneCodeEditor,
		_monaco: Monaco,
	): void {
		editorRef.current = editor;
	}
	return (
		<Card w={"100%"} variant={"elevated"}>
			<CardBody>
				<Editor
					height="500px"
					language={language}
					value={sampleCode}
					theme={colorMode === "light" ? "vs-light" : "vs-dark"}
					onMount={handleEditorDidMount}
					options={{ fontSize: 15 }}
				/>
			</CardBody>
		</Card>
	);
};

export default CodeEditor;
