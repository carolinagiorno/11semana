const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return response(400).json({ error: 'No NGO found for this ID'});
        }

        return response.json(ong);
    }
}