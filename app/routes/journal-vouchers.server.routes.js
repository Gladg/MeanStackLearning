'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var journalVouchers = require('../../app/controllers/journal-vouchers.server.controller');

	// Journal Vouchers Routes
	app.route('/journal-vouchers')
		.get(journalVouchers.list)
		.post(users.requiresLogin, journalVouchers.create);

	app.route('/journal-vouchers/:journalVoucherId')
		.get(journalVouchers.read)
		.put(users.requiresLogin, journalVouchers.hasAuthorization, journalVouchers.update)
		.delete(users.requiresLogin, journalVouchers.hasAuthorization, journalVouchers.delete);

	// Finish by binding the Journal Voucher middleware
	app.param('journalVoucherId', journalVouchers.journalVoucherByID);
};
