import {Divider, Radio, RadioGroup, Stack, Text} from "@chakra-ui/react";
import {useSparseMatrixContext} from "../../context/matrixContext";
import {LIST_TYPE} from "../../services/sparseMatrixService";

const ListMethod = () => {
    const { onListMethodChange, listMethod, matrixData } = useSparseMatrixContext();

    return (
        <>
            <Divider mb={20}/>
            <Text>"{listMethod}" method selected</Text>
            <Text> {matrixData}</Text>
            <RadioGroup onChange={onListMethodChange} value={listMethod}>
                <Stack direction="row">
                    <Radio value={LIST_TYPE.SINGLE_LINKED_LIST}>Single linked list</Radio>
                    <Radio value={LIST_TYPE.DOUBLY_LINKED_LIST}>Doubly linked list</Radio>
                    <Radio value={LIST_TYPE.MULTI_LINKED_LIST}>Multi Linked list</Radio>
                </Stack>
            </RadioGroup>
            <Divider mt={20}/>
        </>
    );
};

export {ListMethod};
