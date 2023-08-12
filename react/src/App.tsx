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

	const [selectedExecutor, setSelectedExecutor] = useState<string>("Public");

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


    const executeCode = () => {
		fetch("https://spring-reactive-web-vizuwgtgsa-uc.a.run.app/api/execute", {
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
                                                            Java (OpenJDK 15.0.2)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("python");
                                                                clearTextArea();
                                                            }}
                                                            value={"python"}
                                                        >
                                                            Python (3.10.0)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("typescript");
                                                                clearTextArea();
                                                            }}
                                                            value={"typescript"}
                                                        >
                                                            TypeScript (5.0.3)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("ruby");
                                                                clearTextArea();
                                                            }}
                                                            value={"ruby"}
                                                        >
                                                            Ruby (3.0.1)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("cpp");
                                                                clearTextArea();
                                                            }}
                                                            value={"cpp"}
                                                        >
                                                            C++ (GCC 10.2.0)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("dart");
                                                                clearTextArea();
                                                            }}
                                                            value={"dart"}
                                                        >
                                                            Dart (2.19.6)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("pascal");
                                                                clearTextArea();
                                                            }}
                                                            value={"pascal"}
                                                        >
                                                            Pascal (3.2.2)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("swift");
                                                                clearTextArea();
                                                            }}
                                                            value={"swift"}
                                                        >
                                                            Swift (5.3.3)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("c");
                                                                clearTextArea();
                                                            }}
                                                            value={"c"}
                                                        >
                                                            C (GCC 3.2.2)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("elixir");
                                                                clearTextArea();
                                                            }}
                                                            value={"elixir"}
                                                        >
                                                            Elixir (1.11.3)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("perl");
                                                                clearTextArea();
                                                            }}
                                                            value={"perl"}
                                                        >
                                                            Perl (5.36.0)
                                                        </MenuItemOption>
                                                        <MenuItemOption
                                                            onClick={() => {
                                                                handleLanguageChange("rust");
                                                                clearTextArea();
                                                            }}
                                                            value={"rust"}
                                                        >
                                                            Rust (1.68.2)
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
                                                placeholder={"Standard Input"}
                                            />
                                        </Box>
                                        <Box>
                                            <Textarea
                                                ref={pistonCommandLineRef}
                                                w={"200px"}
                                                placeholder={"CMD Args"}
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
                                                            handleExecutorChange("Public");
                                                            clearTextArea();
                                                        }}
                                                        value={"Public"}
                                                    >
                                                        Public
                                                    </MenuItemOption>
                                                    <MenuItemOption
                                                        onClick={() => {
                                                            handleExecutorChange("SelfHosted");
                                                            clearTextArea();
                                                        }}
                                                        value={"SelfHosted"}
                                                    >
                                                        SelfHosted
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
