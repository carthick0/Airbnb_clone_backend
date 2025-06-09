const AppError = require("../utils/errors/app-error");
const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");

const flightRepository = new FlightRepository();


async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot Create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR, explanation)
    }
}



module.exports = {
    createFlight,

}