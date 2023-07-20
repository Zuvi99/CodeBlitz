import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup, Text,
    Textarea,
    useColorMode, useToast,
    VStack
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BsFillPlayFill} from "react-icons/bs";
import {useRef, useState} from "react";
import {IoCopy} from "react-icons/io5";
import {editor} from "monaco-editor";
import {SupportedLanguage} from "./types.ts";
import CodeEditor from "./CodeEditor.tsx";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import axios, {AxiosResponse} from "axios";

type Language = {
    language: string
}

function App() {
    const {colorMode, toggleColorMode} = useColorMode()

    const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript");


    const [selectedExecutor, setSelectedExecutor] = useState<string>("Judge0");

    const handleLanguageChange = (language: SupportedLanguage) => {
        setSelectedLanguage(language);
    };

    const handleExecutorChange = (executor: string) => {
        setSelectedExecutor(executor);
    };

    const getAPI = () => {
        void axios.get("https://emkc.org/api/v2/piston/runtimes").then(
            (response: AxiosResponse<Language>) => {
                console.log(response);
            })
    }

    const editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null> = useRef<IStandaloneCodeEditor | null>(null);

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
            <HStack w={'100%'} paddingLeft={'100px'} spacing={4}>
                <Box w={'65%'}>
                    <VStack>
                        <Box paddingTop={'20px'} w={'100%'}>
                            <Card variant={'elevated'}>
                                <CardBody>
                                    <Heading>CodeSculpt</Heading>
                                </CardBody>
                            </Card>
                        </Box>
                        <Card w='100%' variant={'elevated'}>
                            <CardBody>
                                <HStack justify={'space-between'}>
                                    <Box>
                                        <Menu>
                                            <MenuButton
                                                as={Button}
                                                rightIcon={<ChevronDownIcon/>}>
                                                Language: {selectedLanguage}
                                            </MenuButton>
                                            <MenuList>
                                                <MenuOptionGroup defaultValue={"javascript"} type={"radio"}>
                                                    <MenuItemOption id={'1'}
                                                        onClick={() => handleLanguageChange("java")}
                                                        value={"java"}
                                                    >Java</MenuItemOption>
                                                    <MenuItemOption
                                                        onClick={() => handleLanguageChange("python")}
                                                        value={"python"}
                                                    >Python</MenuItemOption>
                                                    <MenuItemOption
                                                        onClick={() => handleLanguageChange("javascript")}
                                                        value={"javascript"}
                                                    >JavaScript</MenuItemOption>
                                                    <MenuItemOption
                                                        onClick={() => handleLanguageChange("kotlin")}
                                                        value={"kotlin"}
                                                    >Kotlin</MenuItemOption>
                                                    <MenuItemOption
                                                        onClick={() => handleLanguageChange("typescript")}
                                                        value={"typescript"}
                                                    >TypeScript
                                                    </MenuItemOption>
                                                </MenuOptionGroup>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                    <Box>
                                        <HStack spacing={'24px'}>
                                            <Button rightIcon={<IoCopy/>}
                                                    onClick={() => {
                                                        toast({
                                                            title: "Copied to clipboard!",
                                                            status: "success",
                                                            position: "top",
                                                            duration: 1500,
                                                            isClosable: true,
                                                        }); copyEditorCode()
                                                    }}
                                            >Copy code to clipboard</Button>
                                            <Button rightIcon={<BsFillPlayFill/>} onClick={getAPI}>
                                                Run
                                            </Button>
                                        </HStack>
                                    </Box>
                                </HStack>
                            </CardBody>
                        </Card>
                        <Box
                            w={'100%'}
                        >
                            <CodeEditor language={selectedLanguage} editorRef={editorRef}/>
                        </Box>
                        <Card w={'100%'} variant={"elevated"}>
                            <CardBody>
                                <HStack gap={25}>
                                    <Box>
                                        <Textarea w={'200px'} placeholder={"Standard Input"}/>
                                    </Box>
                                    <Box>
                                        <Textarea w={'200px'} placeholder={"Command Line Arguments"}/>
                                    </Box>
                                </HStack>
                            </CardBody>
                        </Card>
                        <Box w={"100%"}>
                            <Button size={"md"} onClick={toggleColorMode}>
                                {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                            </Button>
                        </Box>
                    </VStack>
                </Box>
                <Box>
                    <Card variant={'elevated'}>
                        <CardBody>
                            <VStack spacing={10}>
                                <Box w={'100%'}>
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<ChevronDownIcon/>}>
                                            API: {selectedExecutor}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuOptionGroup defaultValue={"Judge0"} type={"radio"}>
                                                <MenuItemOption
                                                    onClick={() => handleExecutorChange("Judge0")}
                                                    value={"Judge0"}
                                                >Judge0</MenuItemOption>
                                                <MenuItemOption
                                                    onClick={() => handleExecutorChange("Piston")}
                                                    value={"Piston"}
                                                >Piston</MenuItemOption>
                                            </MenuOptionGroup>
                                        </MenuList>
                                    </Menu>
                                </Box>
                                <Box>
                                    <Textarea placeholder={"Result"}/>
                                </Box>
                                <Box width={"100%"}>
                                    <Text>Execution Time:</Text>
                                </Box>
                            </VStack>
                        </CardBody>
                    </Card>
                </Box>
            </HStack>
        </>
    )
}

export default App


