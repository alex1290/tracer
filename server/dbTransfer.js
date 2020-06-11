const definedType = ({ key, value }) => {
    let type = typeof value
    switch (type) {
        case ("string"):
            return { "S": value }
        case ("number"):
            return { "N": value.toString() }
        case ("boolean"):
            return { "B": value }
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

const translator = json => {
    let result = {}
    Object.keys(json).forEach(key => {
        let value = json[key]
        let data = definedType({ key, value })
        if (data.L) {
            for (let i in translator(value)){
                data.L.push(translator(value)[i])
            }
        }
        if (data.M) {
            data.M = translator(value);
        }
        result[key] = data
    })
    return result
}


export default translator