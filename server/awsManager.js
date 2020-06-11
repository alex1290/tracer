var AWS = require('aws-sdk');
AWS.config.loadFromPath("./config.json");
var dynamodb = new AWS.DynamoDB()

export const write = trace =>
    new Promise((res, rej) => {
        try {
            let params = {
                TableName: "tracer",
                Item: trace
            }
            dynamodb.putItem(params, (err, data) => {
                if (err) {
                    console.error("Unable to write data. Error JSON:", JSON.stringify(err, null, 2));
                    res(false)
                } else {
                    console.log("success!");
                    res(true)
                }
            })
        } catch (e) {
            rej(e)
        }
    }
    )

export const scan = (isAmount = true) =>
    new Promise((res, rej) => {
        try {
            var params = {
                TableName: "tracer",
                ProjectionExpression: "id,#nm",
                FilterExpression: "id >= :num1",
                ExpressionAttributeNames: {
                    "#nm": "name",
                },
                ExpressionAttributeValues: {
                    ":num1": { "N": "0" },
                }
            };
            let amount = 0
            let data = []
            console.log(`Scanning ${params.TableName} table.`);
            dynamodb.scan(params, (err, data) => {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    // print all
                    console.log("Scan succeeded.");
                    if (isAmount) {
                        amount += data.Items.length
                    } else {
                        data.Items.forEach(function (data) {
                            console.log(data)
                        });
                    }
                    // continue scanning if we have more, because
                    // scan can retrieve a maximum of 1MB of data
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        docClient.scan(params, onScan);
                    } else {
                        if (isAmount) {
                            console.log(`total amount : ${data.Items.length}`)
                            res(amount)
                        } else {
                            res(data)
                        }
                    }
                }
            });
        } catch (e) {
            rej(e)
        }
    })