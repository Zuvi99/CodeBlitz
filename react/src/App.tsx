import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	Grid,
	GridItem,
	Heading,
	HStack,
	Link,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	Switch,
	Text,
	Textarea,
	useColorMode,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsFillPlayFill } from "react-icons/bs";
import React, { useMemo, useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { editor } from "monaco-editor";
import { SupportedLanguage } from "./types.ts";
import CodeEditor from "./CodeEditor.tsx";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { LuSunMoon } from "react-icons/lu";
import { MenuLanguages } from "./menu.ts";

function App() {
	const { colorMode, toggleColorMode } = useColorMode();

	const [selectedLanguage, setSelectedLanguage] =
		useState<SupportedLanguage>("java");

	const [selectedExecutor, setSelectedExecutor] = useState<string>("Public");

	const [expectedOutput] = useState<string>("");

	const [executionOutput, setExecutionOutput] = useState<string>("");

	const [outputCheckMessage, setOutputCheckMessage] = useState<string>("");

	const [outputCheckMessageColor, setOutputCheckMessageColor] =
		useState<string>("");

	const [taskSwitchStateMessage, setTaskSwitchStateMessage] =
		useState<string>("Task Inactive");

	const [menuLanguage, setMenuLanguage] = useState<MenuLanguages>("Java");

	const pistonStdIn = useRef<HTMLTextAreaElement>(null);

	const pistonCommandLineRef = useRef<HTMLTextAreaElement>(null);

	const editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null> =
		useRef<IStandaloneCodeEditor | null>(null);

	const taskSwitchRef = useRef<HTMLInputElement | null>(null);

	const expectedOutputRef = useRef<HTMLTextAreaElement | null>(null);

	const executionOutputRef = useRef<HTMLTextAreaElement | null>(null);

	const readOnly = useMemo(
		() => !taskSwitchRef.current?.checked,
		[taskSwitchRef.current?.checked],
	);

	const toast = useToast();

	const handleLanguageChange = (language: SupportedLanguage) => {
		setSelectedLanguage(language);
	};

	const handleExecutorChange = (executor: string) => {
		setSelectedExecutor(executor);
	};

	const handleTaskSwitchStateMessage = () => {
		if (taskSwitchRef.current?.checked) {
			setTaskSwitchStateMessage("Task Active");
		} else {
			setTaskSwitchStateMessage("Task Inactive");
		}
	};

	const clearTextArea = () => {
		setExecutionOutput("");
	};

	const clearOutputCheckMessage = () => {
		setOutputCheckMessage("");
	};

	const changeMenuLanguage = (menuLang: MenuLanguages) => {
		setMenuLanguage(menuLang);
	};

	const executeCode = () => {
		fetch(
			"https://bucket4j-dot-axial-crane-395116.uc.r.appspot.com/api/execute",
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					language: selectedLanguage.toUpperCase(),
					sourceCode: editorRef.current?.getValue(),
					executor: selectedExecutor.toUpperCase(),
					pistonStandardInput: pistonStdIn.current?.value,
					pistonCommandLineArguments:
						pistonCommandLineRef.current?.value.split(/\r?\n/),
				}),
			},
		)
			.then((response) =>
				response.json().then((data) => {
					const executionOutput = data.output;
					setExecutionOutput(executionOutput);
					if (taskSwitchRef.current?.checked) {
						if (executionOutputRef.current && expectedOutputRef.current) {
							if (
								executionOutput.trim() ==
								expectedOutputRef.current?.value.trim()
							) {
								setOutputCheckMessage("Output Matched! Well done!");
								setOutputCheckMessageColor("green");
							} else {
								setOutputCheckMessage("Output does not match. Retry.");
								setOutputCheckMessageColor("red");
							}
						}
					}
				}),
			)
			.catch((e) => {
				console.error(e);
				setExecutionOutput("Error executing code. Try again.");
			});
	};

	function copyEditorCode() {
		if (editorRef.current) {
			const selectedText = editorRef.current.getValue();
			if (selectedText) {
				void navigator.clipboard.writeText(selectedText).then();
			}
		}
	}

	return (
		<>
			<Grid
				templateColumns="repeat(4, 1fr)"
				gap={4}
				minWidth={"1050px"}
				margin={"25px"}
			>
				<GridItem colSpan={3}>
					<Box>
						<VStack>
							<Box w={"100%"}>
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
													Language: {menuLanguage}
												</MenuButton>
												<MenuList>
													<MenuOptionGroup type={"radio"}>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("java");
																changeMenuLanguage("Java");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"java"}
														>
															Java (OpenJDK 15.0.2)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("python");
																changeMenuLanguage("Python");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"python"}
														>
															Python (3.10.0)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("typescript");
																changeMenuLanguage("TypeScript");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"typescript"}
														>
															TypeScript (5.0.3)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("ruby");
																changeMenuLanguage("Ruby");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"ruby"}
														>
															Ruby (3.0.1)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("cpp");
																changeMenuLanguage("C++");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"cpp"}
														>
															C++ (GCC 10.2.0)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("dart");
																changeMenuLanguage("Dart");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"dart"}
														>
															Dart (2.19.6)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("pascal");
																changeMenuLanguage("Pascal");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"pascal"}
														>
															Pascal (3.2.2)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("swift");
																changeMenuLanguage("Swift");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"swift"}
														>
															Swift (5.3.3)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("c");
																changeMenuLanguage("C");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"c"}
														>
															C (GCC 3.2.2)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("elixir");
																changeMenuLanguage("Elixir");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"elixir"}
														>
															Elixir (1.11.3)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("perl");
																changeMenuLanguage("Perl");
																clearTextArea();
																clearOutputCheckMessage();
															}}
															value={"perl"}
														>
															Perl (5.36.0)
														</MenuItemOption>
														<MenuItemOption
															onClick={() => {
																handleLanguageChange("rust");
																changeMenuLanguage("Rust");
																clearTextArea();
																clearOutputCheckMessage();
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
															duration: 1500,
															isClosable: true,
														});
														clearTextArea();
														clearOutputCheckMessage();
														executeCode();
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
												_placeholder={{
													fontFamily: "sans-serif",
												}}
											/>
										</Box>
										<Box>
											<Textarea
												ref={pistonCommandLineRef}
												w={"200px"}
												placeholder={"CMD Args"}
												_placeholder={{
													fontFamily: "sans-serif",
												}}
											/>
										</Box>
									</HStack>
								</CardBody>
							</Card>
						</VStack>
					</Box>
				</GridItem>
				<GridItem width={"450px"}>
					<Box w={"100%"} paddingLeft={"315px"} paddingBottom={"20px"}>
						<Button
							size={"md"}
							onClick={toggleColorMode}
							rightIcon={<LuSunMoon />}
						>
							{colorMode === "light" ? "Dark" : "Light"} Mode
						</Button>
					</Box>
					<Box>
						<Card variant={"elevated"}>
							<CardBody>
								<VStack spacing={2.5}>
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
															clearOutputCheckMessage();
														}}
														value={"Public"}
													>
														Public
													</MenuItemOption>
													<MenuItemOption
														onClick={() => {
															handleExecutorChange("SelfHosted");
															clearTextArea();
															clearOutputCheckMessage();
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
										<Badge color={outputCheckMessageColor} fontSize={"14px"}>
											{outputCheckMessage}
										</Badge>
									</Box>
									<Box w={"100%"}>
										<Text
											fontWeight={"bold"}
											paddingLeft={"4px"}
											paddingBottom={"4px"}
										>
											Result
										</Text>
										<Textarea
											ref={executionOutputRef}
											placeholder={"Results would be displayed here:"}
											_placeholder={{
												fontFamily: "sans-serif",
											}}
											value={executionOutput}
											onChange={(e) => setExecutionOutput(e.target.value)}
											width={"100%"}
											height={"200px"}
											readOnly={true}
											fontFamily={"monospace"}
										/>
									</Box>
								</VStack>
							</CardBody>
						</Card>
					</Box>
					<Box paddingTop={"10px"}>
						<Card variant={"elevated"}>
							<CardBody>
								<Box>
									<Text
										fontWeight={"bold"}
										paddingLeft={"4px"}
										paddingBottom={"4px"}
									>
										{" "}
										Task Description
									</Text>
									<Textarea
										placeholder={"Describe task here:"}
										_placeholder={{
											fontFamily: "sans-serif",
										}}
										width={"100%"}
										height={"200px"}
										isDisabled={readOnly}
									/>
								</Box>
								<Box paddingTop={"10px"}>
									<Text
										fontWeight={"bold"}
										paddingLeft={"4px"}
										paddingBottom={"4px"}
									>
										Expected Output
									</Text>
									<Textarea
										ref={expectedOutputRef}
										placeholder={"Define the expected output here:"}
										_placeholder={{
											fontFamily: "sans-serif",
										}}
										defaultValue={expectedOutput}
										width={"100%"}
										height={"100px"}
										isDisabled={readOnly}
									/>
								</Box>
								<Box paddingTop={"10px"}>
									<HStack>
										<Box>
											<Switch
												ref={taskSwitchRef}
												onChange={handleTaskSwitchStateMessage}
											></Switch>
										</Box>
										<Box paddingTop={"4px"}>
											<Text fontWeight={"bold"}>{taskSwitchStateMessage}</Text>
										</Box>
									</HStack>
								</Box>
							</CardBody>
						</Card>
					</Box>
				</GridItem>
			</Grid>
			<Box as={"footer"} textAlign={"center"} bottom={"0"} width={"100%"}>
				<Text fontWeight={"bold"}>
					Developed by{" "}
					<Link
						href={"https://www.linkedin.com/in/adedoyin-adepetun-42a18a1a5"}
						color={"blue"}
						isExternal
					>
						Adedoyin Adepetun
					</Link>
				</Text>
			</Box>
		</>
	);
}

export default App;
