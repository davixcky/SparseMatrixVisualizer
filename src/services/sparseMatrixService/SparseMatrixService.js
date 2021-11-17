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
        this.currentData = [];
        this.listImpl = new LinkedList();
        this.doublyImpl = new DoublyLinkedList();
        this.multiImpl = new MultiLinkedList();

        this.currentList = undefined;
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
        if (this.currentData.length === 0) return;

        this.currentList = this.MAP_LIST_STYLE[style] || this.listImpl;

        const data = this.currentData;
        this.currentList.generateFromMatrix(data);
    }
}

export default SparseMatrixService;
export {LIST_TYPE};
