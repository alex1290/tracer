import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import fs from "fs"

// import dynamoEncode from './dbTransfer'
import { scan, write, dbDelete } from "./awsManager"

const port = 3005;


const deleteAllData = () =>
    scan().then(amount => {
        for (let i = 0; i < amount; i++) {
            dbDelete(i + 1)
        }
        console.log("delete complete");
        
    })

// deleteAllData();

let app = express();
app.use(bodyParser.json())
app.use(cors());

app.post("/traceCollecter", (req, res) => {
    console.log("==== write start ====");
    let data = req.body
    // defined the amount of data and let it be the id
    scan().then(amount => {
        data.id = amount + 1
        try {
            write(data).then(isSuccess => {
                if (!isSuccess) {
                    console.log("write failed !");
                }
            })
        } catch (e) {
            console.log(`Write failed Errror : ${e}`);
        }
    })
    console.log("==== write end ====");
})

app.get('/', (req, res) => {
    res.send('server is running')
})

app.get('/traceData', (req, res) => {
    scan(false)
        .then(data => {
            res.send(data)
        })
})

app.listen(port, () => {
    console.log(`start listen on port : ${port}`);
})