import dynamodbData from '../data.json'
import fs from 'fs'

const definedType = ({ key, value }) => {
    let type = typeof value
    switch (type) {
        case ("string"):
            if (value === "true" || value === "false") {
                return { "BOOL": Boolean(value) }
            }
            return { "S": value }
        case ("number"):
            return { "N": value.toString() }
        case ("boolean"):
            return { "BOOL": value }
        case ("object"):
            if (value instanceof Array) {
                return { "L": [] }
            } else {
                return { "M": {} }
            }
        default:
            return `key : ${key}  value : ${value} is invailed`
    }
}

const dynamoEncode = json => {
    let result = {}
    Object.keys(json).forEach(key => {
        let value = json[key]
        let data = definedType({ key, value })
        if (data.L) {
            for (let i in dynamoEncode(value)) {
                data.L.push(dynamoEncode(value)[i])
            }
        }
        if (data.M) {
            data.M = dynamoEncode(value);
        }
        result[key] = data
    })
    return result
}

const typeReturned = ({ type, value }) => {
    switch (type) {
        case ("S"):
            return String(value)
        case ("N"):
            return Number(value)
        case ("BOOL"):
            return Boolean(value)
        case ("L"):
            return []
        case ("M"):
            return {}
        default:
            return `type : ${type}  value : ${value} is invailed`
    }
}

const dynamoDecode = json => {
    let result = {}
    Object.keys(json).forEach(key => {
        let type = Object.keys(json[key])[0];
        let value = json[key][type];
        result[key] = typeReturned({ type, value })
        if (type === "L") {
            value.forEach(i => {
                result[key].push(i)
            })
        }
    })
    return result
}
let arr = dynamodbData.Items.map(i => {
    return dynamoDecode(i)
})

fs.writeFile('server/result.json', JSON.stringify(arr), (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log("write file success")
    }
})

export default dynamoEncode