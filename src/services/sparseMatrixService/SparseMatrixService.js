import LinkedList from "./LinkedList";
import DoublyLinkedList from "./DoublyLinkedList";

const LIST_TYPE = {
    SINGLE_LINKED_LIST: 'simple-list',
    DOUBLY_LINKED_LIST: 'doubly-list',
}

class SparseMatrixService {
    constructor() {
        this.currentData = {};
        this.listImpl = new LinkedList();
        this.doublyImpl = new DoublyLinkedList();

        this.MAP_LIST_STYLE = {
            [LIST_TYPE.SINGLE_LINKED_LIST]: this.listImpl,
            [LIST_TYPE.DOUBLY_LINKED_LIST]: this.doublyImpl,
        };
    }

    setData(data) {
        this.currentData = data;
    }

    generateListByStyle(style) {
        const list = this.MAP_LIST_STYLE[style] || this.listImpl;

        list.generateFromMatrix([[1, 2], [3, 0], [0, 0], [5, 0], [6, 7], [0, 8], [0, 0], [0, 0]]);

        console.log(list.toMatrix())
    }
}

export default SparseMatrixService;
export {LIST_TYPE};
