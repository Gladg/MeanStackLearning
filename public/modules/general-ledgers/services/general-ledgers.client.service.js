'use strict';

//General Ledgers service used to communicate General Ledgers REST endpoints
angular.module('general-ledgers').factory('GeneralLedgers', ['$resource',
	function($resource) {
		return $resource('general-ledgers/:generalLedgerId', { generalLedgerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);