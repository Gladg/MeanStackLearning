'use strict';

//Setting up route
angular.module('price-lists').config(['$stateProvider',
	function($stateProvider) {
		// Price Lists state routing
		$stateProvider.
		state('listPriceLists', {
			url: '/price-lists',
			templateUrl: 'modules/price-lists/views/list-price-lists.client.view.html'
		}).
		state('createPriceList', {
			url: '/price-lists/create',
			templateUrl: 'modules/price-lists/views/create-price-list.client.view.html'
		}).
		state('viewPriceList', {
			url: '/price-lists/:priceListId',
			templateUrl: 'modules/price-lists/views/view-price-list.client.view.html'
		}).
		state('editPriceList', {
			url: '/price-lists/:priceListId/edit',
			templateUrl: 'modules/price-lists/views/edit-price-list.client.view.html'
		});
	}
]);