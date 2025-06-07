const { StatusCodes } = require("http-status-codes");
const CityRepository = require("../repositories/city-repository");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();



async function createCity(data) {
    try {
        const city = await cityRepository.create(data)
        return city;
    } catch (error) {
        let explanation = [];
        if (error.name == 'SequelizeValidationError') {
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError('Cannot create a new city', StatusCodes.BAD_REQUEST, explanation);
        }
        throw new AppError('Cannot create a new city', StatusCodes.INTERNAL_SERVER_ERROR, [error.message]);
    }
}

async function getCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;

    } catch (error) {
        throw new AppError('Cannot retrive all the cities', StatusCodes.INTERNAL_SERVER_ERROR, explanation);
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.getById(id);
        return city
    } catch (error) {
        throw new AppError('Cannot retrive the city you requested', StatusCodes.INTERNAL_SERVER_ERROR, explanation);
    }
}

module.exports = {
    createCity,
    getCities,
    getCity
}