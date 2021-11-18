import { Handle } from 'react-flow-renderer';
import React from 'react';
import { customNodeStyles } from './NodeStyles';

const SinglyLinkedListNode = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <Handle type='target' position='left' id='t' style={{ borderRadius: 0 }} />
            <div>{data.value}</div>
            <Handle
                type='source'
                position='right'
                id='s'
                style={{ top: '30%', borderRadius: 0, width: 0, height: 0 }}
            />
        </div>
    );
};

export { SinglyLinkedListNode };
