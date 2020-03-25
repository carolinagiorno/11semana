const connection = require('../database/connection');

//lista os casos de uma ONG
module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const casos_ong = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

        return response.json(casos_ong);
    }
}