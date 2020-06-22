import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { setTraceData } from "../actions"
import React, { useState, useEffect } from "react";
import { Grid } from 'semantic-ui-react'
import Header from './Header';
import Tracer from './TracerTable';
import UrlGenerator from './UrlGenerator';
import Guide from './Guide'
import "./App.css";

const App = () => {
    const [data, setData] = useState(null)
    const [page, setPage] = useState("行為資料")
    const selectStore = state => state.traceAction
    const traceData = useSelector(selectStore)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch("http://localhost:3005/traceData")
            .then(i => i.json())
            .then(i => {
                let traceData = i.Items.map(data => {
                    let { trace } = data
                    data.trace = trace.map((e, n) => {
                        e.stayTime = n !== trace.length - 1
                            ? trace[n + 1].timeStamp - e.timeStamp
                            : data.endTime - e.timeStamp
                        return e
                    })
                    data.startPage = trace[0].path
                    data.endPage = trace[trace.length - 1].path
                    return data
                })
                dispatch(setTraceData(traceData))
            })
    }, [])

    useEffect(() => {
        if (traceData.traceData) {
            let data = JSON.parse(JSON.stringify(traceData.traceData))
            setData(data)
        }
    }, [traceData])

    let Content = props => {
        switch (props.page) {
            case ("行為資料"):
                return <Tracer data={data} />
            case ("URL產生器"):
                return <UrlGenerator />
            case ("產生器教學"):
                return <Guide />
            default:
                return <div>Error</div>
        }
    }


    return (
        <Grid>
            <Grid.Column width={3}>
                <Header page={page} setPage={setPage} />
            </Grid.Column>
            <Grid.Column stretched width={13}>
                <Content page={page} />
            </Grid.Column>
        </Grid>
    );
}


export default hot(module)(App);