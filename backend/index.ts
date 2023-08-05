const express = require('express')

const app = express()

app.get('/', (req,res)=>{
    res.send("ddd")
})

app.listen(8080, ()=>{
    console.log('server started')
})

console.log(process.env.TG_TOKEN);