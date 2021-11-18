import { Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSparseMatrixContext } from '../../context/matrixContext';
import { LIST_TYPE } from '../../services/sparseMatrixService';

const MatrixTable = () => {
    const { currentList, listMethod } = useSparseMatrixContext();

    useEffect(() => {
        generateLinkedList(currentList);
    }, [currentList]);

    const generateLinkedList = (list) => {
        if (!list) return;

        const { numberColumns, numberRows, head } = list;

        let current = head;

        const values = [];
        for (let i = 0; i < numberRows; i++) {
            const rowValues = [];
            for (let j = 0; j < numberColumns; j++) {
                if (current && current.row === i && current.column === j) {
                    rowValues.push(<Td isNumeric>{current.value}</Td>);
                    current = current.next;
                    continue;
                }

                rowValues.push(<Td isNumeric>0</Td>);
            }

            values.push(<Tr>{rowValues}</Tr>);
        }

        return values;
    };

    const generateSinglyLinkedList = (list) => {
        return generateLinkedList(list);
    };

    const generateDoublyLinkedList = (list) => {
        return generateLinkedList(list);
    };

    const generateMultiLinkedList = (list) => {
        console.log('calling multi linked list');
        return [];
    };

    const generateListData = () => {
        const METHODS_IMPL = {
            [LIST_TYPE.SINGLE_LINKED_LIST]: generateSinglyLinkedList,
            [LIST_TYPE.DOUBLY_LINKED_LIST]: generateDoublyLinkedList,
            [LIST_TYPE.MULTI_LINKED_LIST]: generateMultiLinkedList,
        };

        const func = METHODS_IMPL[listMethod] || METHODS_IMPL[LIST_TYPE.SINGLE_LINKED_LIST];
        return func(currentList);
    };

    return (
        <Table size="sm">
            <Tbody>{generateListData(currentList)}</Tbody>
        </Table>
    );
};

export { MatrixTable };
