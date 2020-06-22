import React from 'react';

const IndexTr = props => {
    const { index, setTargetId, modifyPage } = props
    const data = JSON.parse(JSON.stringify(props.data))
    const { inTraceList, startPage, endPage, id, traceId, endTime, startTime } = data
    const longestStayPage = data.trace.sort((a, b) => b.stayTime - a.stayTime)[0]

    return (
        <tr>
            <td className="id" onClick={() => setTargetId(id)}>{id}</td>
            <td>{traceId}</td>
            <td>{modifyPage(longestStayPage.path)}</td>
            <td className="second">{longestStayPage.stayTime / 1000 + "秒"}</td>
        </tr>
    )
}

const IndexTable = props => {
    const { data, modifyPage, setTargetId } = props
    return (
        <table className="ui celled table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>訪問者ID</th>
                    <th>停留最長的頁面</th>
                    <th>停留最長的頁面時間</th>
                </tr>
            </thead>
            <tbody>
                {
                    data &&
                    data.map((i, n) => <IndexTr key={n} index={n} data={i} setTargetId={id => setTargetId(id)} modifyPage={modifyPage} />)
                }
            </tbody>
        </table>
    )
}

export default IndexTable;