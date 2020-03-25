const connection = require('../database/connection');

module.exports = {
    //listando casos
    async index (request, response) {
        //paginação (default: 1)
        const { page = 1 } = request.query;

        //entre [] para retornar apenas um resultado
        const [count] = await connection('incidents').count();
        //total de registros enviado pro front-end
        response.header('X-Total-Count', count['count(*)']);

        //5 casos por página
        const casos = await connection('incidents')
            //traz os dados da ong relacionada àquele caso
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            //"pulo" da paginação
            .offset((page - 1) * 5)
            .select(['incidents.*',
                    'ongs.name',
                    'ongs.email', 
                    'ongs.whatsapp', 
                    'ongs.city', 
                    'ongs.uf']);

        return response.json(casos);
    },


    //adicionando casos
    async create(request, response) {
        const { title, description, value} = request.body;
        //ong_id vem pelo cabeçalho (qual ong está logada? -> verifica cabeçalho)
        const ong_id = request.headers.authorization;

        //armazena o id num array
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });


        return response.json({ id });
    },

    //apagando caso
    async delete (request, response) {
        const { id } = request.params; 
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //se a ong logada não for a ong que criou o caso
        if (incident.ong_id !== ong_id) {
            //401 - não-autorizado
            return response.status(401).json({ error: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete();

        //204 - resposta vazia com header útil (ong logada)
        return response.status(204).send();
    }
};