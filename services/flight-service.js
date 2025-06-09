const AppError = require("../utils/errors/app-error");
const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

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

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];

    if (query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
        const [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [Number(minPrice), Number(maxPrice)]
        };
    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.gte]: query.tripDate
        }
    }
    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'))
        sortFilter = sortFilters
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR, error);
    }
}


module.exports = {
    createFlight,
    getAllFlights

}