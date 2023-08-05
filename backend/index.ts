const express = require('express')

const app = express()

app.get('/', (req,res)=>{

    res.send('<h1>HELLO WORLD</h1> <div>You is faggot </div>')
})

app.listen(8080, ()=>{
    console.log('server started')
})