import { Input } from '@chakra-ui/react';
import { useSparseMatrixContext } from '../../context/matrixContext';

const FileReader = () => {
    const { onFileChanged } = useSparseMatrixContext();

    return (
        <div>
            <Input type="file" accept=".uninorte" onChange={onFileChanged} />
        </div>
    );
};

export { FileReader };
