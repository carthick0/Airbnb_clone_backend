const AppError = require("../utils/errors/app-error");
const { AirportRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");

const airportRepository = new AirportRepository();


async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot Create a new  Airport object', StatusCodes.INTERNAL_SERVER_ERROR, explanation)
    }
}
async function getAirports() {

    try {
        const airports = await airportRepository.getAll();
        return airpors;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the Airports', StatusCodes.INTERNAL_SERVER_ERROR, explanation)
    }
}
async function getAirport(id) {
    try {
        const airport = await airportRepository.getById(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Airplane you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the Airport', StatusCodes.INTERNAL_SERVER_ERROR, explanation);
    }
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        if (!airport) {
            throw new AppError('The Airport you requested is not present', StatusCodes.NOT_FOUND, "Something went wrong while deleting the Airport");
        }
        return airport;
    } catch (error) {
        throw new AppError('Cannot delete the Airport record', StatusCodes.INTERNAL_SERVER_ERROR0)
    }
}

async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.getById(id);
        if (!airport) {
            throw new AppError('The airport you requested is not present', StatusCodes.NOT_FOUND);
        }
        const updateAirport = await airportRepository.update(id, data);
        return updateAirport;
    } catch (error) {

        throw new AppError('cannot update airport', StatusCodes.BAD_REQUEST);
    }
}



module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}