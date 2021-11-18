import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { NodesSection } from '../NodesSection';

const FullGraphTree = ({ onClose, isOpen }) => {
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} size='full' >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Full View</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody width='100vw' height='100vh'>
                        <NodesSection />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { FullGraphTree };
