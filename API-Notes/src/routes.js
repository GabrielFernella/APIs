const express = require('express');

const UserController = require('./controllers/UserController');
const NoteController = require('./controllers/NoteController');

const authMiddleware = require ('./middlewares/auth.js');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

//routes.use(authMiddleware.auth);

routes.get('/users/:user_id/notes', NoteController.index);

/*
routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);*/

/*routes.get('/report', ReportController.show);*/

module.exports = routes;