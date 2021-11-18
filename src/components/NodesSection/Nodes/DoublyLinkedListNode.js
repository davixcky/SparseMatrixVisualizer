import { Handle } from 'react-flow-renderer';
import React from 'react';
import { customNodeStyles } from './NodeStyles';

const DoublyLinkedListNode = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <Handle type='target' position='left' id='t1'
                    style={{ top: '30%', borderRadius: 0, width: 0, height: 0 }} />
            <Handle
                type='source'
                position='left'
                id='s1'
                style={{ top: '70%', borderRadius: 0, width: 0, height: 0 }}
            />
            <div>{data.value}</div>
            <Handle
                type='source'
                position='right'
                id='s2'
                style={{ top: '30%', borderRadius: 0, width: 0, height: 0 }}
            />
            <Handle type='target' position='right' id='t2'
                    style={{ top: '70%', borderRadius: 0, width: 0, height: 0 }} />
        </div>
    );
};

export { DoublyLinkedListNode };
