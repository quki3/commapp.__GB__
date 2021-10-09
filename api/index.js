const { response } = require('express');
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send({message:'hola'})
})

app.listen(3000,(()=>{console.log('servidor on port 3000')}))