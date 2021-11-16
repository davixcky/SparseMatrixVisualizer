import LinkedList from "./LinkedList";
import DoublyLinkedList from "./DoublyLinkedList";
import MultiLinkedList from "./MultiLinkedlList";

const LIST_TYPE = {
    SINGLE_LINKED_LIST: 'simple-list',
    DOUBLY_LINKED_LIST: 'doubly-list',
    MULTI_LINKED_LIST: 'multi-list',
}

class SparseMatrixService {
    constructor() {
        this.currentData = {};
        this.listImpl = new LinkedList();
        this.doublyImpl = new DoublyLinkedList();
        this.multiImpl = new MultiLinkedList();

        this.MAP_LIST_STYLE = {
            [LIST_TYPE.SINGLE_LINKED_LIST]: this.listImpl,
            [LIST_TYPE.DOUBLY_LINKED_LIST]: this.doublyImpl,
            [LIST_TYPE.MULTI_LINKED_LIST]: this.multiImpl,
        };
    }

    setData(data) {
        this.currentData = data;
    }

    generateListByStyle(style) {
        const list = this.MAP_LIST_STYLE[style] || this.listImpl;

        list.generateFromMatrix([[1, 0, 4], [5, 6, 7], [0, 0, 0], [3, 4, 5]]);

        console.log(list.toMatrix())
    }
}

export default SparseMatrixService;
export {LIST_TYPE};
