'use strict';

//Price Lists service used to communicate Price Lists REST endpoints
angular.module('price-lists').factory('PriceLists', ['$resource',
	function($resource) {
		return $resource('price-lists/:priceListId', { priceListId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);