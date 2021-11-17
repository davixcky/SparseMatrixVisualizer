import {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {LIST_TYPE} from "../../services/sparseMatrixService";
import {fileToArrayNumber} from "../../utils";
import SparseMatrixService from "../../services/sparseMatrixService/SparseMatrixService";

const SparseMatrixContext = createContext();

const SparseMatrixProvider = ({children}) => {
    const [matrixData, setMatrixData] = useState([]);
    const [listMethod, setListMethod] = useState(LIST_TYPE.SINGLE_LINKED_LIST);
    const [isLoading, setIsLoading] = useState(false);
    const sparseMatrixService = new SparseMatrixService();
    const [currentList, setCurrentList] = useState({});

    useEffect(() => {
        sparseMatrixService.setData(matrixData);
        sparseMatrixService.generateListByStyle(listMethod);
        setCurrentList(sparseMatrixService.currentList);
    }, [matrixData, listMethod, sparseMatrixService.currentList]);

    useEffect(() => {
        console.log('current list changed');
        console.log(currentList);
    }, [currentList]);

    const onFileChanged = (e) => {
        const reader = new FileReader();

        reader.onloadstart = () => {
            setIsLoading(true);
        };

        reader.onload = async (e) => {
            const text = (e.target.result)
            const values = fileToArrayNumber(text);
            setMatrixData(values);
            setIsLoading(false);
        };

        reader.readAsText(e.target.files[0])
    };

    const onListMethodChange = (value) => {
        setListMethod(value);
    };

    return (
        <SparseMatrixContext.Provider value={{
            matrixData,
            isLoading,
            listMethod,
            currentList,
            onFileChanged,
            onListMethodChange,
        }}>
            {children}
        </SparseMatrixContext.Provider>
    )
}

SparseMatrixProvider.propTypes = {
    children: PropTypes.node,
}

const useSparseMatrixContext = () => {
    const context = useContext(SparseMatrixContext);
    if (context === undefined) {
        throw new Error('useSparseMatrixContext must be used within a PokemonProvider');
    }

    return context;
}

export {SparseMatrixProvider, useSparseMatrixContext};
