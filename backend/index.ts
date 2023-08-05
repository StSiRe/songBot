const express = require('express')

const app = express()

app.get('/', (req,res)=>{
    res.send(process.env)
})

app.listen(8080, ()=>{
    console.log('server started')
})