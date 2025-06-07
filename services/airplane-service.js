const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");


const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message)
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot Create a new  Airplane object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getAirplanes() {

    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the Airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.getById(id);
        return airplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Airplane you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the Airplane', StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching the Airplane data");
    }
}

async function destroyAirplane(id) {
    try {
        const airplane = await airplaneRepository.destroy(id);
        if (!airplane) {
            throw new AppError('The Airplane you requested is not present', StatusCodes.NOT_FOUND, "Something went wrong while deleting the Airplane");
        }
        return airplane;
    } catch (error) {
        throw new AppError('Cannot delete the airplane record', StatusCodes.INTERNAL_SERVER_ERROR0)
    }
}

async function updateAirplane(id, data) {
    try {
        const airplane = await airplaneRepository.getById(id);
        if (!airplane) {
            throw new AppError('The Airplane you requested is not present', StatusCodes.NOT_FOUND);
        }
        const updatedAirplane = await airplaneRepository.update(id, data);
        return updatedAirplane;
    } catch (error) {

        throw new AppError('cannot update airplane', StatusCodes.BAD_REQUEST);
    }
}



module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}