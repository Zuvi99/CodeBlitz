import { Card, CardBody, Text, useColorMode } from "@chakra-ui/react";
import Editor, { Monaco } from "@monaco-editor/react";
import { SupportedLanguage } from "./types.ts";
import { useMemo } from "react";
import { editor } from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

const SampleCode: Record<SupportedLanguage, string> = {
	java: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
	python: `# CodeSculpt - Designed and Developed by Adedoyin Adepetun
print("Hello, Python!");`,
	typescript: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
const hello : string = "Hello, TypeScript!";
console.log(hello);`,
	ruby: `# CodeSculpt - Designed and Developed by Adedoyin Adepetun
puts 'Hello, Ruby!'`,
	cpp: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
#include <iostream>
int main() {
    std::cout << "Hello, C++!";
    return 0;
}`,
	dart: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
void main() {
    print('Hello, Dart!');
}`,
	pascal: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
program Hello;
begin
  writeln ('Hello, Pascal!');
end.`,
	swift: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
print("Hello, Swift!")`,
	c: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, C!");
   return 0;
}
`,
	elixir: `# CodeSculpt - Designed and Developed by Adedoyin Adepetun
IO.puts("Hello, Elixir!")`,
	perl: `# CodeSculpt - Designed and Developed by Adedoyin Adepetun
# Modules used
use strict;
use warnings;
  
# Print function 
print("Hello, Perl!\\n");`,
	rust: `// CodeSculpt - Designed and Developed by Adedoyin Adepetun
fn main() {
    // Statements here are executed when the compiled binary is called.
    // Print text to the console.
    println!("Hello, Rust!");
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
				<Text fontWeight={"bold"} paddingBottom={"10px"} paddingLeft={"10px"}>
					Code Editor
				</Text>
				<Editor
					height="485px"
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
