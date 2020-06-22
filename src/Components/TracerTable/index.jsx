import React, { useState } from 'react';
import IdTable from './IdTable';
import IndexTable from './IndexTable';
import { Segment } from 'semantic-ui-react';

const modifyTime = timeStamp => new Date(timeStamp).toString().replace(/\(\S+\)/, "").replace("GMT", "\nGMT")
const modifyPage = path => {
    switch (path) {
        case ("/"):
            return "homepage"
        default:
            return path.replace("/", "")
    }
}

const TracerIndex = props => {
    const { data } = props;
    const [targetId, setTargetId] = useState(null)

    return (
        <Segment basic>
            <h1>行為資料</h1>
            {
                !targetId > 0
                    ? <IndexTable data={data} modifyPage={modifyPage} setTargetId={setTargetId} />
                    : <IdTable targetId={targetId} data={data.filter(i => i.id === targetId)[0]} setTargetId={id => setTargetId(id)} modifyPage={modifyPage} modifyTime={modifyTime} />
            }
        </Segment>
    )
}

export default TracerIndex;