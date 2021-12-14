var express = require('express')
var router = express.Router()
var landing = require('./landing_route')

function router_api(app){
	app.use("/api/v1",router)
	router.get('/', landing)
}
module.exports = router_api;