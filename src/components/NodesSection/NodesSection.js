import { useSparseMatrixContext } from '../../context/matrixContext';
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';
import { useEffect, useState } from 'react';
import { SinglyLinkedListNode, DoublyLinkedListNode, MultiLinkedListNode } from './Nodes';
import { LIST_TYPE } from '../../services/sparseMatrixService';
import { FullGraphTree } from '../FullGraphTree';

const NodesSection = () => {
    const { currentList, listMethod } = useSparseMatrixContext();
    const [elements, setElements] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        generateTree();
    }, [currentList]);

    const generateTree = () => {
        const METHODS_IMPL = {
            [LIST_TYPE.SINGLE_LINKED_LIST]: generateLinkedListTree,
            [LIST_TYPE.DOUBLY_LINKED_LIST]: generateDoublyLinkedListTree,
            [LIST_TYPE.MULTI_LINKED_LIST]: generateMultiLinkedListTree
        };

        const func = METHODS_IMPL[listMethod] || METHODS_IMPL[LIST_TYPE.SINGLE_LINKED_LIST];
        func(currentList);
    };

    const generateMultiLinkedListTree = () => {
        if (!currentList) return;

        const { head, numberColumns } = currentList;

        const nodes = [];
        const edges = [];
        let current = head;

        let step = 100;
        let x = 20, y = 10;
        let i = 1;
        let edgesI = 1;
        let columns = 0;
        let rowHead = head;
        while (current) {
            const id = `node-${i}`;

            nodes.push(createUINode({ id, node: current, x, y, nodeType: 'multiLinkedList' }));

            if (current.right) {
                const edge = {
                    id: `edge-${edgesI}`,
                    source: id,
                    target: `node-${i + 1}`,
                    sourceHandle: 's2',
                    targetHandle: 't1',
                    arrowHeadType: 'arrow'
                };

                edges.push(edge);
                edgesI += 1;
            }

            if (current.down) {
                const edge2 = {
                    id: `edge-${edgesI}`,
                    source: id,
                    target: `node-${i + numberColumns}`,
                    sourceHandle: 's1',
                    targetHandle: 't2',
                    arrowHeadType: 'arrow'
                };

                edges.push(edge2);
                edgesI += 1;
            }

            i += 1;
            x += step;
            columns += 1;

            if (columns === numberColumns) {
                current = rowHead.down;
                rowHead = current;
                columns = 0;
                y += step;
                x = 20;
            } else {
                current = current.right;
            }

        }

        nodes.push(...edges);
        setElements(nodes);
    };

    const generateDoublyLinkedListTree = () => {
        if (!currentList) return;

        const { head } = currentList;

        const nodes = [];
        const edges = [];
        let current = head;

        let xStep = 100;
        let x = 20, y = 10;
        let i = 1;
        let edgesI = 1;
        while (current) {
            const id = `node-${i}`;

            nodes.push(createUINode({ id, node: current, x, y, nodeType: 'doublyLinkedList' }));

            if (current.next) {
                const edge = {
                    id: `edge-${edgesI}`,
                    source: id,
                    target: `node-${i + 1}`,
                    sourceHandle: 's2',
                    targetHandle: 't1',
                    arrowHeadType: 'arrow'
                };

                edges.push(edge);
                edgesI += 1;

                const edge2 = {
                    id: `edge-${edgesI}`,
                    source: `node-${i + 1}`,
                    target: id,
                    sourceHandle: 's1',
                    targetHandle: 't2',
                    arrowHeadType: 'arrow'
                };

                edges.push(edge2);
                edgesI += 1;
            }

            i += 1;
            x += xStep;
            current = current.next;
        }

        nodes.push(...edges);

        setElements(nodes);
    };

    const generateLinkedListTree = () => {
        if (!currentList) return;

        const { head } = currentList;

        const nodes = [];
        const edges = [];
        let current = head;

        let xStep = 100;
        let x = 20, y = 10;
        let i = 1;
        while (current) {
            const id = `node-${i}`;

            nodes.push(createUINode({ id, node: current, x, y, nodeType: 'singlyLinkedList' }));

            if (current.next) {
                const edge = {
                    id: `edge-${i}`,
                    source: id,
                    target: `node-${i + 1}`,
                    sourceHandle: 's',
                    targetHandle: 't',
                    arrowHeadType: 'arrow'
                };

                edges.push(edge);
            }

            i += 1;
            x += xStep;
            current = current.next;
        }

        nodes.push(...edges);

        setElements(nodes);
    };

    const createUINode = ({ id, node, x, y, nodeType }) => {
        return {
            id,
            type: nodeType,
            position: { x, y },
            data: { value: node.value, row: node.row, col: node.column }
        };
    };

    const nodeTypes = {
        singlyLinkedList: SinglyLinkedListNode,
        doublyLinkedList: DoublyLinkedListNode,
        multiLinkedList: MultiLinkedListNode
    };

    const onLoad = (reactFlowInstance) => {
        reactFlowInstance.fitView();
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const onFullView = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <ReactFlow elements={elements} onLoad={onLoad} nodeTypes={nodeTypes}>
                <MiniMap
                    nodeColor={'red'}
                    nodeStrokeWidth={3}
                />
                <Controls onFitView={onFullView} />
            </ReactFlow>
            <FullGraphTree onClose={onClose} isOpen={isOpen} />
        </>

    );
};

export { NodesSection };
