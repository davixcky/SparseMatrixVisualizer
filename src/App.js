import {useSparseMatrixContext} from "./context/matrixContext";
import {FileReader, InformationArea, ListMethod, MatrixTable} from "./components";
import {
    Box,
    Flex,
    Heading,
    IconButton, Kbd,
    Link,
    Spinner,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import styles from './App.module.css';

function App() {

    const {isLoading} = useSparseMatrixContext();

    return (
        <Flex className={styles.container}>
            <Box
                px={4}
                width='full'
                boxShadow='lg'
                className={styles.header}
                padding={5}
            >
                <ThemeSelector/>
                <Box p={4}>
                    <ConfigurationHeader/>
                    <InformationArea>
                        <Text>
                            The file must have an <Kbd>uninorte</Kbd> extension. Each line defines a row and therefore
                            each
                            column is separated by a space. The number of columns must match between all the rows and
                            their elements must be numbered, otherwise, it will result in an error. If the document
                            presents an error, the system will return a message indicating what happened. You can find
                            some file examples
                            {" "}
                            <Link color="teal.500"
                                  href="https://github.com/davixcky/SparseMatrixVisualizer/tree/master/example_files"
                                  target='blank'>
                                here
                            </Link>.
                        </Text> </InformationArea>
                    <FileReader/>
                    {isLoading && <Spinner size="xl" mt={12}/>}
                </Box>
                <Box borderRadius={10} minH='60%'>
                    <ListMethod/>
                    <MatrixTable/>
                </Box>
            </Box>
        </Flex>
    );
}

const ThemeSelector = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Box textAlign='right' py={4}>
            <IconButton
                icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                onClick={toggleColorMode}
                variant='ghost'
                aria-label='Change color mode'/>
        </Box>
    )
}

const ConfigurationHeader = () => {
    return (
        <Box textAlign='center' marginBottom={5}>
            <Heading>Sparse Matrix</Heading>
            <Text mt={3}>
                Developed with &hearts; for <Link color={`teal.500`} href="https://www.uninorte.edu.co/">Uninorte</Link>
            </Text>
        </Box>
    )
}

export default App;
