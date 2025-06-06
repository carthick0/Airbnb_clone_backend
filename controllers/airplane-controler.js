const { error } = require("winston");
const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { response } = require("express");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message = 'Successfully created an airplane';
        SuccessResponse.data = airplane
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        ErrorResponse.message = 'Something went wrong while creating airplane'
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse)
    }
}

async function getAirplane(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplane();
        SuccessResponse.data = airplanes;
        return res.
        status(StatusCodes.OK)
            .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        ErrorResponse.message = 'Something went wrong while getting airplane'
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse)
    }
}

module.exports = {
    createAirplane,
    getAirplane
}