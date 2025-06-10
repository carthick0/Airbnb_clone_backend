const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require('../models');
const { Sequelize } = require("sequelize");
class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight)
    }
    async getAllFlights(filter, sort) {
        const response = await this.model.findAll({
            where: filter,
            order: sort,
            include: [{
                    model: Airplane,
                    as: 'airplane-detail',
                    attributes: ['id', 'modelNumber', 'capacity']
                },
                {
                    model: Airport,
                    as: 'departure_airport',
                    attributes: ['id', 'name', 'code', 'address']
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrival_airport',
                    attributes: ['id', 'name', 'code', 'address']
                }
            ]

        });
        return response;
    }
    async updateRemainingSeats(flightId, seats, dec = true) {
        const flight = await Flight.findByPk(flightId);
        if (!flight) {
            console.log(`❌ Flight not found for ID: ${flightId}`);
            throw new Error('Flight not found for update');
        }

        console.log(`🎯 Found flight ${flightId}, modifying seats by ${seats}, dec=${dec}`);

        if (dec) {
            await flight.decrement('totalSeats', { by: seats });

        } else {
            await flight.increment('totalSeats', { by: seats });

        }

        await flight.reload();

        return flight;
    }


}

module.exports = FlightRepository