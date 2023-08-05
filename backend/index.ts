const express = require('express')

const app = express()

app.get('/', (req,res)=>{

    res.send('<h1>HELLO WORLD</h1> <div> Test site </div>')
})

app.listen(8080, ()=>{
    console.log('server started')
})