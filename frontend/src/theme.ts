import {extendTheme, StyleFunctionProps, type ThemeConfig} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const config: ThemeConfig = ({
	initialColorMode: "light",
	useSystemColorMode: false,
});

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            bg:mode('white.', 'black.500')(props),
        },
    }),
};




const theme = extendTheme({ config, styles });
export default theme;
