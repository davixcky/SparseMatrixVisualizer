import AbstractList from './AbstractList';
import AbstractNode from './AbstractNode';

class Node extends AbstractNode {
    constructor(value) {
        super(value);
        this.right = null;
        this.down = null;
    }
}

class MultiLinkedList extends AbstractList {
    constructor() {
        super();

        this.lastNode = null;
        this.numberColumns = 0;
        this.numberRows = 0;
    }

    generateFromMatrix(matrix) {
        super.generateFromMatrix(matrix);

        if (matrix.length === 0) return;

        this.numberRows = matrix.length;
        this.numberColumns = matrix[0].length;

        this.head = this._generate(matrix);
    }

    _generate(matrix) {
        const heads = [];

        matrix.forEach((row, rowIndex) => {
            heads[rowIndex] = null;
            let rightPtr = null;

            row.forEach((el, colIndex) => {
                // TODO: Don't add node if the element is zero
                const newNode = new Node(el, colIndex, rowIndex);

                if (!heads[rowIndex]) {
                    heads[rowIndex] = newNode;
                } else {
                    rightPtr.right = newNode;
                }

                rightPtr = newNode;
            });
        });

        let current;
        let nextNode;
        for (let i = 0; i < this.numberRows; i++) {
            current = heads[i];
            nextNode = heads[i + 1];

            while (current && nextNode) {
                current.down = nextNode;
                current = current.right;
                nextNode = nextNode.right;
            }
        }

        return heads[0];
    }

    toMatrix() {
        super.toMatrix();

        const matrix = [];
        let currentNode = this.head;

        if (!currentNode) {
            return matrix;
        }

        let rowHead = currentNode;
        for (let i = 0; i < this.numberRows; i++) {
            matrix[i] = [];
            for (let j = 0; j < this.numberColumns; j++) {
                matrix[i].push(currentNode.value);
                currentNode = currentNode.right;
            }

            rowHead = rowHead.down;
            currentNode = rowHead;
        }

        return matrix;
    }
}

export default MultiLinkedList;
