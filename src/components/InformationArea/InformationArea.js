import { Alert, AlertIcon } from '@chakra-ui/react';

const InformationArea = ({ children }) => {
    return (
        <Alert status="info" marginBlock={5}>
            <AlertIcon />
            {children}
        </Alert>
    );
};

export { InformationArea };
