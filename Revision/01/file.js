const { log, error } = require('console')
const fs=require('fs')

// fs.writeFileSync("./abc.txt","Hello Rohit")
        
const result=fs.readFileSync("./abc.txt","utf-8")
console.log(result);

fs.readFile("./abc.txt","utf-8",(error,result)=>{
    if(error) console.log(error)
    else console.log(result)
})

