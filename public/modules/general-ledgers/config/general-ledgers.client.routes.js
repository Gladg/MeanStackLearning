'use strict';

//Setting up route
angular.module('general-ledgers').config(['$stateProvider',
	function($stateProvider) {
		// General Ledgers state routing
		$stateProvider.
		state('listGeneralLedgers', {
			url: '/general-ledgers',
			templateUrl: 'modules/general-ledgers/views/list-general-ledgers.client.view.html'
		}).
		state('createGeneralLedger', {
			url: '/general-ledgers/create',
			templateUrl: 'modules/general-ledgers/views/create-general-ledger.client.view.html'
		}).
		state('viewGeneralLedger', {
			url: '/general-ledgers/:generalLedgerId',
			templateUrl: 'modules/general-ledgers/views/view-general-ledger.client.view.html'
		}).
		state('editGeneralLedger', {
			url: '/general-ledgers/:generalLedgerId/edit',
			templateUrl: 'modules/general-ledgers/views/edit-general-ledger.client.view.html'
		});
	}
]);