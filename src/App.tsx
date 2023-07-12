import {
    Box,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup, Switch, Textarea,
    useColorMode, VStack,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BsFillPlayFill} from "react-icons/bs";
import CodeEditor from "./editor.tsx";
// import CodeEditor from "./editor.tsx";

function App() {
    const {colorMode, toggleColorMode} = useColorMode()
    console.log(colorMode)
    return (
        <>
            <HStack w={'100%'} padding={'30px'}>
                <Box w={'50%'}>
                    <VStack>
                        <HStack w='100%' justify={'space-between'}>
                            <Box>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rightIcon={<ChevronDownIcon/>}>
                                        Select a Language
                                    </MenuButton>
                                    <MenuList>
                                        <MenuOptionGroup defaultValue={'java'} type={'radio'}>
                                            <MenuItemOption value='java'>Java</MenuItemOption>
                                            <MenuItemOption value='python'>Python</MenuItemOption>
                                            <MenuItemOption value='js'>JavaScript</MenuItemOption>
                                            <MenuItemOption value='c++'>C++</MenuItemOption>
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                            </Box>
                            <Box>
                                <Button justifySelf={"flex-end"} rightIcon={<BsFillPlayFill/>}
                                        onClick={toggleColorMode}>Run </Button>
                            </Box>
                        </HStack>
                        <Box w={'100%'} paddingTop={'20px'} border={'1px'} borderColor={'gray'}>
                            <CodeEditor />
                        </Box>
                        <HStack w={'100%'} gap={25}>
                            <Box>
                                <Textarea placeholder={"Standard Input"}/>
                            </Box>
                            <Box>
                                <Textarea placeholder={"Command Line Arguments"}/>
                            </Box>
                        </HStack>
                        <Box w={"100%"} paddingTop={'50px'}>
                            <Switch colorScheme={"red"} size={"md"} onChange={toggleColorMode}>Dark Mode</Switch>
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </>
    )
}

export default App


