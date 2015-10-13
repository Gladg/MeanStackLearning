'use strict';

//Setting up route
angular.module('journal-vouchers').config(['$stateProvider',
	function($stateProvider) {
		// Journal Vouchers state routing
		$stateProvider.
		state('listJournalVouchers', {
			url: '/journal-vouchers',
			templateUrl: 'modules/journal-vouchers/views/list-journal-vouchers.client.view.html'
		}).
		state('createJournalVoucher', {
			url: '/journal-vouchers/create',
			templateUrl: 'modules/journal-vouchers/views/create-journal-voucher.client.view.html'
		}).
		state('viewJournalVoucher', {
			url: '/journal-vouchers/:journalVoucherId',
			templateUrl: 'modules/journal-vouchers/views/view-journal-voucher.client.view.html'
		}).
		state('editJournalVoucher', {
			url: '/journal-vouchers/:journalVoucherId/edit',
			templateUrl: 'modules/journal-vouchers/views/edit-journal-voucher.client.view.html'
		});
	}
]);