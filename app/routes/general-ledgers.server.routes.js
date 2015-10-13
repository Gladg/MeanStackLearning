'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var generalLedgers = require('../../app/controllers/general-ledgers.server.controller');

	// General Ledgers Routes
	app.route('/general-ledgers')
		.get(generalLedgers.list)
		.post(users.requiresLogin, generalLedgers.create);

	app.route('/general-ledgers/:generalLedgerId')
		.get(generalLedgers.read)
		.put(users.requiresLogin, generalLedgers.hasAuthorization, generalLedgers.update)
		.delete(users.requiresLogin, generalLedgers.hasAuthorization, generalLedgers.delete);

	// Finish by binding the General Ledger middleware
	app.param('generalLedgerId', generalLedgers.generalLedgerByID);
};
