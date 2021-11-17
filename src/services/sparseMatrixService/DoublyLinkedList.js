import AbstractList from "./AbstractList";
import AbstractNode from './AbstractNode';

class Node extends AbstractNode {
    constructor(value, column, row) {
        super(value);
        this.next = null;
        this.prev = null;
        this.column = column;
        this.row = row;
    }
}

class DoublyLinkedList extends AbstractList {
    constructor() {
        super();

        this.lastNode = null;
        this.numberColumns = 0;
        this.numberRows = 0;
    }

    generateFromMatrix(matrix) {
        super.generateFromMatrix(matrix);

        if (matrix.length === 0)
            return;

        this.numberRows = matrix.length;
        this.numberColumns = matrix[0].length;

        matrix.forEach((row, rowIndex) => {
            row.forEach((el, colIndex) => {
                if (el === 0) {
                    return;
                }

                const newNode = new Node(el, colIndex, rowIndex);

                if (!this.head) {
                    this.head = newNode;
                    this.lastNode = newNode;
                    return;
                }

                newNode.prev = this.lastNode;
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            });
        });
    }

    toMatrix() {
        super.toMatrix();

        let matrix = [];
        let currentNode = this.head;

        if (!currentNode) {
            return matrix;
        }

        const index = {
            col: 0,
            row: 0,
        }

        while (currentNode) {
            if (currentNode.row !== index.row || currentNode.column !== index.col) {
                [index.row, index.col] = this._insertToMatrix(matrix, 0, index.row, index.col);
                continue;
            }

            [index.row, index.col] = this._insertToMatrix(matrix, currentNode.value, index.row, index.col);
            currentNode = currentNode.next;
        }

        while (matrix.length !== this.numberRows || matrix[matrix.length - 1].length !== this.numberColumns) {
            [index.row, index.col] = this._insertToMatrix(matrix, 0, index.row, index.col);
        }

        return matrix;
    }

    _insertToMatrix(matrix, value, row, col) {
        if (!matrix[row]) {
            matrix[row] = [];
        }

        matrix[row][col++] = value;

        if (col === this.numberColumns) {
            col = 0;
            row++;
        }

        return [row, col];
    }
}

export default DoublyLinkedList;
