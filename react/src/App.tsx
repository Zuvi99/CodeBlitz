import {
    Box,
    Button,
    Card,
    CardBody,
    Grid,
    GridItem,
    Heading,
    HStack, Link,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Text,
    Textarea,
    useColorMode,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsFillPlayFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { editor } from "monaco-editor";
import { SupportedLanguage } from "./types.ts";
import CodeEditor from "./CodeEditor.tsx";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

function App() {
	const { colorMode, toggleColorMode } = useColorMode();

	const [selectedLanguage, setSelectedLanguage] =
		useState<SupportedLanguage>("java");

	const [selectedExecutor, setSelectedExecutor] = useState<string>("Piston");

	const handleLanguageChange = (language: SupportedLanguage) => {
		setSelectedLanguage(language);
	};

	const handleExecutorChange = (executor: string) => {
		setSelectedExecutor(executor);
	};

	const [executionOutput, setExecutionOutput] = useState<string>("");

	const clearTextArea = () => {
		setExecutionOutput("");
	};

    const pistonStdIn = useRef<HTMLTextAreaElement>(null);

    const pistonCommandLineRef = useRef<HTMLTextAreaElement>(null);

    const judgeStdIn = useRef<HTMLTextAreaElement>(null);

    const judgeCommandLineRef = useRef<HTMLTextAreaElement>(null);


    const executeCode = () => {
		fetch("http://localhost:8080/api/execute", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
				language: selectedLanguage.toUpperCase(),
				sourceCode: editorRef.current?.getValue(),
				executor: selectedExecutor.toUpperCase(),
                pistonStandardInput: pistonStdIn.current?.value,
                pistonCommandLineArguments: pistonCommandLineRef.current?.value.split(/\r?\n/),
			}),
		})
			.then((response) =>
				response.json().then((data) => setExecutionOutput(data.output)),
			)
			.catch((e) => {
				console.error(e);
				setExecutionOutput("Error executing code. Try again.");
			});
	};



	const editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null> =
		useRef<IStandaloneCodeEditor | null>(null);

	function copyEditorCode() {
		if (editorRef.current) {
			const selectedText = editorRef.current.getValue();
			if (selectedText) {
				void navigator.clipboard.writeText(selectedText).then();
			}
		}
	}

	const toast = useToast();

	return (
        <>
            <Grid
                templateColumns="repeat(4, 1fr)"
                gap={4}
                minWidth={"1050px"}
                margin={"35px"}
            >
                <GridItem colSpan={3}>
                    <Box>
                        <VStack>
                            <Box paddingTop={"10px"} w={"100%"}>
                                <Card variant={"elevated"}>
                                    <CardBody>
                                        <Heading>CodeSculpt</Heading>
                                    </CardBody>
                                </Card>
                            </Box>
                            <Card w="100%" variant={"elevated"}>
                                <CardBody>
                                    <HStack justify={"space-between"}>
                                        <Box>
                                            <Menu>
                                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                    Language: {selectedLanguage}
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuOptionGroup type={"radio"}>
                                                        <MenuItemOption
                                                            id={"1"}
                                                            onClick={() => {
                                                                handleLanguageChange("java");
                                                                clearTextArea();
                                                            }}
                                                            value={"java"}
                                                        >
                                                            Java
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("python");
                                                                clearTextArea();
                                                            }}
                                                            value={"python"}
                                                        >
                                                            Python
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("javascript");
                                                                clearTextArea();
                                                            }}
                                                            value={"javascript"}
                                                        >
                                                            JavaScript
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("typescript");
                                                                clearTextArea();
                                                            }}
                                                            value={"typescript"}
                                                        >
                                                            TypeScript
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("ruby");
                                                                clearTextArea();
                                                            }}
                                                            value={"ruby"}
                                                        >
                                                            Ruby
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("cpp");
                                                                clearTextArea();
                                                            }}
                                                            value={"cpp"}
                                                        >
                                                            C++
                                                        </MenuItemOption>
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </Box>
                                        <Box>
                                            <HStack spacing={"24px"}>
                                                <Button
                                                    rightIcon={<IoCopy />}
                                                    onClick={() => {
                                                        toast({
                                                            title: "Copied to clipboard!",
                                                            status: "success",
                                                            position: "top",
                                                            duration: 1500,
                                                            isClosable: true,
                                                        });
                                                        copyEditorCode();
                                                    }}
                                                >
                                                    Copy code to clipboard
                                                </Button>
                                                <Button
                                                    rightIcon={<BsFillPlayFill />}
                                                    onClick={() => {
                                                        toast({
                                                            title: "Executing....",
                                                            status: "info",
                                                            position: "top",
                                                            duration: 1000,
                                                            isClosable: true,
                                                        });
                                                        executeCode();
                                                        clearTextArea();
                                                    }}
                                                >
                                                    Run
                                                </Button>
                                            </HStack>
                                        </Box>
                                    </HStack>
                                </CardBody>
                            </Card>
                            <Box w={"100%"}>
                                <CodeEditor language={selectedLanguage} editorRef={editorRef} />
                            </Box>
                            <Card w={"100%"} variant={"elevated"}>
                                <CardBody>
                                    <HStack gap={25}>
                                        <Box>
                                            <Textarea
                                                ref={pistonStdIn}
                                                w={"200px"}
                                                placeholder={"Standard Input (Piston)"}
                                            />
                                        </Box>
                                        <Box>
                                            <Textarea
                                                ref={pistonCommandLineRef}
                                                w={"200px"}
                                                placeholder={"CMD Args (Piston)"}
                                            />
                                        </Box>
                                        <Box>
                                            <Textarea
                                                ref={judgeStdIn}
                                                w={"200px"}
                                                placeholder={"Standard Input (Judge0)"}
                                            />
                                        </Box>
                                        <Box>
                                            <Textarea
                                                ref={judgeCommandLineRef}
                                                w={"200px"}
                                                placeholder={"CMD Args (Judge0)"}
                                            />
                                        </Box>
                                    </HStack>
                                </CardBody>
                            </Card>
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem width={"450px"}>
                    <Box w={"100%"} paddingLeft={'300px'} paddingBottom={'150px'}>
                        <Button size={"md"} onClick={toggleColorMode}>
                            {colorMode === "light" ? "Dark" : "Light"} Mode
                        </Button>
                    </Box>
                    <Box>
                        <Card variant={"elevated"}>
                            <CardBody>
                                <VStack spacing={10}>
                                    <Box w={"100%"}>
                                        <Menu>
                                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                                API: {selectedExecutor}
                                            </MenuButton>
                                            <MenuList>
                                                <MenuOptionGroup type={"radio"}>
                                                    <MenuItemOption
                                                        onClick={() => {
                                                            handleExecutorChange("Judge0");
                                                            clearTextArea();
                                                        }}
                                                        value={"Judge0"}
                                                    >
                                                        Judge0
                                                    </MenuItemOption>
                                                    <MenuItemOption
                                                        onClick={() => {
                                                            handleExecutorChange("Piston");
                                                            clearTextArea();
                                                        }}
                                                        value={"Piston"}
                                                    >
                                                        Piston
                                                    </MenuItemOption>
                                                </MenuOptionGroup>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                    <Box w={"100%"}>
                                        <Textarea
                                            placeholder={"Result"}
                                            value={executionOutput}
                                            onChange={(e) => setExecutionOutput(e.target.value)}
                                            width={"100%"}
                                            height={"350px"}
                                            readOnly
                                            fontFamily={"monospace"}
                                        />
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Box>
                </GridItem>
            </Grid>
            <Box as={'footer'} textAlign={'center'}>
                <Text fontWeight={"bold"}>
                    Developed by{" "}
                    <Link href={"https://www.linkedin.com/in/adedoyin-adepetun-42a18a1a5"} color={"blue"} isExternal>
                        Adedoyin Adepetun
                    </Link>
                </Text>
            </Box>
        </>
	);
}

export default App;
