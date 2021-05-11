const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
*/

route.get('/', services.homeRoutes);

/**
 *  @description Root Route
 *  @method GET /addUser
*/

route.get('/addUser', services.addUser);

/**
 *  @description Root Route
 *  @method GET /updateUser
*/

route.get('/updateUser',services.updateUser);


// API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

// export this file

module.exports = route;
