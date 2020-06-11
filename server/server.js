import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import fs from "fs"

import dbtrans from './dbTransfer'
import { scan, write } from "./awsManager"

const port = 3005;


let app = express();
app.use(bodyParser.json())
app.use(cors());


let amount;
scan().then(i => amount = i)
// fs.writeFile("trans.json", JSON.stringify(dbtrans(test)), err => {
//     if (err) {
//         console.log(err);
//     }
// })

app.post("/traceCollecter", (req, res) => {
    let data = dbtrans(req.body)
    data.id = { "N": amount.toString() }
    console.log("post");

    try {
        write(data).then(i => {
            if (i) {
                amount++
            } else {
                scan().then(i => amount = i)
            }
        })
    } catch (e) {
        console.log(`Write failed Errror : ${e}`);
    }
    // write(data)
    // let trace = {
    //     id:{"N":amount.toString()},
    //     traceId:{"S":req.body}
    // }
    // fs.writeFile("result.json", JSON.stringify(req.body), err => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("success!\n" + new Date() + "\nid : " + req.body.traceId);
    // })

})

app.get('/', (req, res) => {
    let adsa = 0
    console.log(adsa.toString());



    res.send('run')
})

app.listen(port, () => {
    console.log(`start listen on port : ${port}`);
})