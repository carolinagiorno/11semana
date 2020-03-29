const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //listando ONGs
    async index (request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    //adicionando ONG
    async create(request, response) {
        //rundown detalhado para que não venham mais informações que o necessário
        const { name, email, whatsapp, city, uf } = request.body;
        console.log({name});

        //gerando id (4 bytes, string em hexadecimal)
        const id = crypto.randomBytes(4).toString('HEX');

        //func assincrona pra aguardar a inserção no bd antes de prosseguir
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        console.log({name});

        return response.json({ id });
    }
};