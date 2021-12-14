const express = require('express');
const landing_route = require('./landing_route');

router_api(app)={
	const router = express.Router();
	app.use("/api/v1",router);
	router.use("/landing",landig_route);
};

module.exports = router_api;
