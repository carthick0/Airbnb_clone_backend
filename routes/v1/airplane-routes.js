const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AriplaneMiddlewares } = require('../../middlewares');


const router = express.Router();

router.post('/', AriplaneMiddlewares.validateCreateRequest, AirplaneController.createAirplane)


router.get('/', AirplaneController.getAirplane)
module.exports = router;