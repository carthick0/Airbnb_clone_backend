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


}

module.exports = FlightRepository