import {useEffect} from "react";
import {useSparseMatrixContext} from "./context/matrixContext";
import {FileReader, ListMethod, MatrixTable} from "./components";
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Link,
    Spinner,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import styles from './App.module.css';

function App() {

    const {isLoading} = useSparseMatrixContext();

    useEffect(() => console.log(isLoading), [isLoading]);

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
                    <FileReader/>
                    {isLoading && <Spinner size="xl" mt={12}/>}
                </Box>
                <Box borderRadius={10} minH='60%'>
                    <ListMethod/>
                    <MatrixTable />
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
