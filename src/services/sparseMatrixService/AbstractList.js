class AbstractList {
    constructor() {
        if (this.constructor === AbstractList) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.head = null;
    }

    generateFromMatrix(matrix) {
        if (!(this instanceof AbstractList)) {
            throw new Error("Method 'generateFromMatrix()' must be implemented.");
        }

        if (!this.isValidListOfList(matrix)) {
            throw new TypeError("Matrix should be a list of arrays.");
        }

        if (!this.isSameNumberOfRows(matrix)) {
            throw new TypeError("Matrix rows should have the same length.");
        }

        this.head = null;
    }

    toMatrix() {
        if (!(this instanceof AbstractList)) {
            throw new Error("Method 'generateFromMatrix()' must be implemented.");
        }
    }

    getLastNode({nextType = 'next'} = {}) {
        if (!(this instanceof AbstractList)) {
            throw new Error("Method 'getLastNode()' must be implemented.");
        }

        if (!(typeof nextType === 'string')) {
            throw new TypeError("nextType should be a string.");
        }

        let current = this.head;
        while (current && current[nextType]) {
            current = current[nextType];
        }

        return current;
    }

    isValidListOfList(matrix) {
        return Array.isArray(matrix) && matrix.every((list) => Array.isArray(list));
    }

    isSameNumberOfRows(matrix) {
        return Array.isArray(matrix) && matrix.every((list) => list.length === matrix[0].length);
    }
}

export default AbstractList;
