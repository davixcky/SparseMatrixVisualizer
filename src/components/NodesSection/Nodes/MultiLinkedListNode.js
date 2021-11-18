import { Handle } from 'react-flow-renderer';
import React from 'react';
import { customNodeStyles } from './NodeStyles';

const MultiLinkedListNode = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <Handle type='target' position='left' id='t1'
                    style={{ borderRadius: 0, width: 0, height: 0 }} />
            <Handle
                type='source'
                position='bottom'
                id='s1'
                style={{ borderRadius: 0, width: 0, height: 0 }}
            />
            <div>{data.value}</div>
            <Handle
                type='target'
                position='top'
                id='t2'
                style={{ borderRadius: 0, width: 0, height: 0 }}
            />
            <Handle type='source' position='right' id='s2'
                    style={{ borderRadius: 0, width: 0, height: 0 }} />
        </div>
    );
};

export { MultiLinkedListNode };
