const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        evento: 'Semana Omnistack',
        estudante: 'Carolina Giorno'
    });
});

app.listen(3333);