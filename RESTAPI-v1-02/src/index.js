var router_api = require('./routes')
var express = require('express')
var app = express()

const port = 3000

router_api(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
