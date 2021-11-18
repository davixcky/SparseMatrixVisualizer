import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LIST_TYPE } from '../../services/sparseMatrixService';
import { fileToArrayNumber } from '../../utils';
import SparseMatrixService from '../../services/sparseMatrixService/SparseMatrixService';
import { list, useToast } from '@chakra-ui/react';

const SparseMatrixContext = createContext();

const SparseMatrixProvider = ({ children }) => {
    const [matrixData, setMatrixData] = useState([]);
    const [listMethod, setListMethod] = useState(LIST_TYPE.SINGLE_LINKED_LIST);
    const [isLoading, setIsLoading] = useState(false);
    const sparseMatrixService = new SparseMatrixService();
    const [currentList, setCurrentList] = useState({});
    const [error, setError] = useState({});
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (error.message && !isErrorDisplayed) {
            launchToast(error.message);
            setIsErrorDisplayed(true);
        }
    }, [error]);

    const launchToast = (message) => {
        toast({
            title: 'Sparse Matrix',
            description: message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
            variant: 'solid',
        });
    };

    useEffect(() => {
        sparseMatrixService.setData(matrixData);

        setError({});

        try {
            sparseMatrixService.generateListByStyle(listMethod);
        } catch (e) {
            setError(e);
            setIsErrorDisplayed(false);
        }
        setCurrentList(sparseMatrixService.currentList);

        if (listMethod === LIST_TYPE.MULTI_LINKED_LIST) {
            try {
                console.log(sparseMatrixService.multiImpl.toMatrix());
            } catch (e) {
                console.log(e);
            }
        }
    }, [matrixData, listMethod, sparseMatrixService.currentList]);

    const onFileChanged = (e) => {
        const reader = new FileReader();

        reader.onloadstart = () => {
            setIsLoading(true);
        };

        reader.onload = async (e) => {
            setError({});

            const text = e.target.result;
            let values;
            try {
                values = fileToArrayNumber(text);
            } catch (e) {
                setError(e);
                setIsErrorDisplayed(false);
            }
            setMatrixData(values);
            setIsLoading(false);
        };

        reader.readAsText(e.target.files[0]);
    };

    const onListMethodChange = (value) => {
        setListMethod(value);
    };

    return (
        <SparseMatrixContext.Provider
            value={{
                matrixData,
                isLoading,
                listMethod,
                currentList,
                error,
                onFileChanged,
                onListMethodChange,
            }}
        >
            {children}
        </SparseMatrixContext.Provider>
    );
};

SparseMatrixProvider.propTypes = {
    children: PropTypes.node,
};

const useSparseMatrixContext = () => {
    const context = useContext(SparseMatrixContext);
    if (context === undefined) {
        throw new Error('useSparseMatrixContext must be used within a PokemonProvider');
    }

    return context;
};

export { SparseMatrixProvider, useSparseMatrixContext };
