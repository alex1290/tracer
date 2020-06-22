const https = require("https");
const fs = require('fs')


const param =
    "news";
var options = {
    host: "api.cognitive.microsoft.com",
    port: 443,
    path: `/bing/v7.0/news?mkt=ja-JP&category=ScienceAndTechnology`,
    method: "GET",
    headers: {
        "Ocp-Apim-Subscription-Key": "b3510c00f9ab4bbc948205a6c0ae6843"
    }
};

const req = https.request(options, res => {
    let txt = ""
    let num = 0
    res.on("data", (data, e) => {
        num++
        txt += data.toString()
        if (num % 2 === 0) {
            fs.writeFile('./news.json',txt,err=>{

            })
            console.log(txt);
        }
    });
});

req.on("error", e => {
    console.error(e);
});

req.end();