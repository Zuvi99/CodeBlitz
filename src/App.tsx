import {
    Box,
    Button, Heading,
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
function App() {
    const {colorMode, toggleColorMode} = useColorMode()
    console.log(colorMode)
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
                                    <Button justifySelf={"flex-end"} rightIcon={<BsFillPlayFill/>}>
                                        Run
                                    </Button>
                                </Box>
                            </HStack>
                            <Box w={'100%'} paddingTop={'20px'} paddingBottom={'20px'} border={'1px'} borderColor={'gray'} borderRadius={'md'}>
                                <CodeEditor />
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


