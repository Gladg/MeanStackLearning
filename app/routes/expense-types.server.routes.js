'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var expenseTypes = require('../../app/controllers/expense-types.server.controller');

	// Expense Types Routes
	app.route('/expense-types')
		.get(expenseTypes.list)
		.post(users.requiresLogin, expenseTypes.create);

	app.route('/expense-types/:expenseTypeId')
		.get(expenseTypes.read)
		.put(users.requiresLogin, expenseTypes.hasAuthorization, expenseTypes.update)
		.delete(users.requiresLogin, expenseTypes.hasAuthorization, expenseTypes.delete);

	// Finish by binding the Expense Type middleware
	app.param('expenseTypeId', expenseTypes.expenseTypeByID);
};
