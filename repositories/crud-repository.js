const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");


class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repo: create");
            throw error;
        }
    }
    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            if (!response) {
                throw new AppError(
                    'Unable to delete the requested resource',
                    StatusCodes.NOT_FOUND, ['No record found in the database for the given ID'],
                    'Cannot delete data of the resource '
                );
            }
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repo : destroy");
            throw error;
        }
    }
    async getById(data) {
        try {
            const response = await this.model.findByPk(data);
            if (!response) {
                throw new AppError(
                    'Unable to find the requested resource',
                    StatusCodes.NOT_FOUND, ['No record found in the database for the given ID'],
                    'Cannot fetch data  the resource '
                );
            }
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repo : getById");
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repo : getAll");
            throw error;
        }
    }
    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the crud repo : update");
            throw error;
        }
    }
}
module.exports = CrudRepository;