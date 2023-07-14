import {
    Box,
    Button, Heading,
    HStack,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuOptionGroup,
    MenuList,
    Switch, Textarea,
    useColorMode, VStack,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BsFillPlayFill} from "react-icons/bs";
// import CodeEditor from "./CodeEditor.tsx";
import {useMemo, useState} from "react";
import Editor from "@monaco-editor/react";

// import CodeEditor from "./editor.tsx";

type SupportedLanguage = "javascript" | "java" | "python" | "c++"

const SampleCode: Record<SupportedLanguage, string> = {
    "javascript":  `function hello() {
	alert('Hello world!');
}`,
    "java": `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}`,
    "python": "//python",
    "c++": "//c++",
}


function App() {
    const {colorMode, toggleColorMode} = useColorMode()
    const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("javascript");
    const sampleCode = useMemo(() => SampleCode[selectedLanguage], [selectedLanguage])

    const handleLanguageChange = (language : SupportedLanguage) => {
        setSelectedLanguage(language);
    };

    console.log(selectedLanguage);
    console.log(colorMode);

    return (
        <>
            <div>
                <Heading paddingTop={'40px'} paddingLeft={'80px'}>CodeSculpt</Heading>
            </div>
                <HStack w={'100%'} paddingLeft={'80px'} paddingTop={'40px'} spacing={4}>
                    <Box w={'65%'}>
                        <VStack>
                            <HStack w='100%' padding={'10px'} justify={'space-between'} border={'1px'} borderColor={'grey'} borderRadius={'md'}>
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
                                                    onClick={() => handleLanguageChange("c++")}
                                                    value={"c++"}
                                                >C++</MenuItemOption>
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
                            <Box w={'100%'} paddingTop={'20px'} paddingBottom={'20px'} border={'1px'} borderColor={'gray'} borderRadius={'md'}>
                                <Editor
                                    height="500px"
                                    language={selectedLanguage}
                                    value={sampleCode}
                                    theme={colorMode === "light" ? "vs-light" : "vs-dark"}
                                />
                            </Box>
                            <HStack w={'100%'} gap={25}>
                                <Box>
                                    <Textarea w={'200px'} placeholder={"Standard Input"}/>
                                </Box>
                                <Box>
                                    <Textarea w={'200px'} placeholder={"Command Line Arguments"}/>
                                </Box>
                            </HStack>
                            <Box w={"100%"} paddingTop={'50px'}>
                                <Switch colorScheme={"red"} size={"md"} onChange={toggleColorMode}>
                                    {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                                </Switch>
                            </Box>
                        </VStack>
                    </Box>
                    <Box border={'1px'} borderColor={'gray'} borderRadius={'md'}>
                        <VStack padding={'20px'}>
                            <Box paddingBottom={'400px'}>
                                <Textarea placeholder={"Result"}/>
                            </Box>
                            <Box alignSelf={'flex-end'}>
                                <Textarea placeholder={"Feedback"}/>
                            </Box>
                            <Box w={'100%'}>
                                <Button>Share Feedback</Button>
                            </Box>
                        </VStack>
                    </Box>
                </HStack>
        </>
    )
}

export default App


