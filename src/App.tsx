import {
    Box,
    Button,
    ChakraProvider,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    HStack, VStack,
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {BsFillPlayFill} from "react-icons/bs";
import CodeEditor from "./editor.tsx";
import {useColorMode} from "@chakra-ui/react";
function App() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <ChakraProvider>
                <HStack justify='space-between' w='50%' padding={'10px'}>
                    <Box>
                        <Menu>
                            <MenuButton
                                px={4}
                                py={2}
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
                        <Button justifySelf={"flex-end"} rightIcon={<BsFillPlayFill/>} onClick={toggleColorMode}>Run {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
                    </Box>
                </HStack>
                <VStack w='50%' padding={'10px'}>
                    <Box>
                        <CodeEditor />
                    </Box>
                </VStack>
        </ChakraProvider>
    )
}

export default App


