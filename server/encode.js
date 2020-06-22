const test = "asdasdasd@yahoo.com.tw"

const encode = string => Buffer.from(string).toString('base64');
const decode = string => Buffer.from(string, 'base64').toString('utf8')


const a = encode(test)



console.log(a);
