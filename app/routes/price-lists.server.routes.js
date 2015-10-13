'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var priceLists = require('../../app/controllers/price-lists.server.controller');

	// Price Lists Routes
	app.route('/price-lists')
		.get(priceLists.list)
		.post(users.requiresLogin, priceLists.create);

	app.route('/price-lists/:priceListId')
		.get(priceLists.read)
		.put(users.requiresLogin, priceLists.hasAuthorization, priceLists.update)
		.delete(users.requiresLogin, priceLists.hasAuthorization, priceLists.delete);

	// Finish by binding the Price List middleware
	app.param('priceListId', priceLists.priceListByID);
};
