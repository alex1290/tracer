import React from 'react';

const IdTable = props => {
    let { data, setTargetId, modifyPage,modifyTime } = props
    let { inTraceList, startPage, endPage, id, traceId, endTime, startTime, trace } = data
    return (
        <div>
            <a onClick={() => setTargetId(null)}>上一頁</a>
            <div className="singleData">
                <div>ID : {id}</div>
                <div>訪問者ID : {traceId}</div>
                <div>開始頁面 : {modifyPage(startPage)}</div>
                <div>開始時間 : {modifyTime(startTime)}</div>
                <div>離開頁面 : {modifyPage(endPage)}</div>
                <div>結束時間 : {modifyTime(endTime)}</div>
            </div>
            <table class="ui celled table">
                <thead>
                    <tr>
                        <th>順序</th>
                        <th>頁面</th>
                        <th>停留時間</th>
                    </tr>
                </thead>
                {
                    trace.map((i, n) => {
                        let { path, stayTime } = i
                        return (
                            <tr key={n}>
                                <td>{n + 1}</td>
                                <td>{path}</td>
                                <td className="second">{stayTime / 1000 + "秒"}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default IdTable;