import {
    Box,
    Button, Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuOptionGroup,
    MenuList,
    Textarea,
    useColorMode, VStack, Card, CardBody
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BsFillPlayFill} from "react-icons/bs";
import {useMemo, useState} from "react";
import Editor from "@monaco-editor/react";
import {IoCopy} from "react-icons/io5";

// import CodeEditor from "./editor.tsx";

type SupportedLanguage = "javascript" | "java" | "python" | "kotlin"

const SampleCode: Record<SupportedLanguage, string> = {
    "javascript":  `function hello() {
	alert('Hello world!');
}`,
    "java": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}`,
    "python": `print("Hello world!");`,
    "kotlin": `fun main(args : Array<String>) {
    println("Hello world!")
}`,
}


function App() {
    const {colorMode, toggleColorMode} = useColorMode()
    const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript");
    const sampleCode = useMemo(() => SampleCode[selectedLanguage], [selectedLanguage])

    const [selectedExecutor, setSelectedExecutor] = useState<string>("Judge0");

    const handleLanguageChange = (language : SupportedLanguage) => {
        setSelectedLanguage(language);
    };

    const handleExecutorChange = (executor : string) => {
        setSelectedExecutor(executor);
    };

    console.log(selectedLanguage);
    console.log(colorMode);

    return (
        <>
            <HStack w={'100%'} paddingLeft={'80px'} paddingTop={'20px'} spacing={4}>
                <Box w={'65%'}>
                    <VStack>
                        <Box paddingTop={'20px'} w={'100%'}>
                            <Card variant={'outline'}>
                                <CardBody>
                                    <Heading>CodeSculpt</Heading>
                                </CardBody>
                            </Card>
                        </Box>
                        <Card w='100%' variant={'outline'}>
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
                                                    <MenuItemOption
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
                                                </MenuOptionGroup>
                                            </MenuList>
                                        </Menu>
                                    </Box>
                                    <Box>
                                        <Button justifySelf={"flex-end"} rightIcon={<BsFillPlayFill/>}>
                                            Run
                                        </Button>
                                    </Box>
                                </HStack>
                            </CardBody>
                        </Card>
                        <Box
                            w={'100%'}
                        >
                            <Card w={'100%'} variant={'outline'}>
                                <CardBody>
                                    <Editor
                                        height="500px"
                                        language={selectedLanguage}
                                        value={sampleCode}
                                        theme={colorMode === "light" ? "vs-light" : "vs-dark"}
                                        options={{ fontSize: 15 }}
                                    />
                                </CardBody>
                            </Card>
                        </Box>
                        <Card  w={'100%'} variant={"outline"}>
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
                    <Card variant={'outline'}>
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
                                <Box w={'100%'}>
                                    <Button rightIcon={<IoCopy/>}>Copy code to clipboard</Button>
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


