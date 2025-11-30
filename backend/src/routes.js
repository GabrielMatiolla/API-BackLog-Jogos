const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const GameController = require('./controllers/GameController');

const authMiddleware = require('./middlewares/auth');


routes.post('/users', UserController.store);    
routes.post('/login', SessionController.store); 


routes.use(authMiddleware);


routes.post('/jogos', GameController.store);           
routes.get('/jogos', GameController.index);            
routes.get('/jogos/:id', GameController.show);         
routes.put('/jogos/:id', GameController.update);       
routes.delete('/jogos/:id', GameController.delete);    

module.exports = routes;