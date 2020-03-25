const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//requisição: sessão de usuário
routes.post('/sessions', SessionController.create);

//requisição: listando ONGs
routes.get('/ongs', OngController.index);
//requisição: adicionando ONG
routes.post('/ongs', OngController.create);

//requisição: listando casos
routes.get('/incidents', IncidentController.index);
//requisição: adicionando casos
routes.post('/incidents', IncidentController.create);
//requisição: remover caso
routes.delete('/incidents/:id', IncidentController.delete);

//requisição: listando casos de uma ONG específica
routes.get('/profile', ProfileController.index);

module.exports = routes;