import express from 'express'

const app = express()

app.route('/', (req,res)=>{
    res.send('<h1>HELLO WORLD</h1>')
})

app.listen(8080, ()=>{
    console.log('server started')
})