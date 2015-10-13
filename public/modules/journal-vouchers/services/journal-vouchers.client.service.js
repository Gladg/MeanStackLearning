'use strict';

//Journal Vouchers service used to communicate Journal Vouchers REST endpoints
angular.module('journal-vouchers').factory('JournalVouchers', ['$resource',
	function($resource) {
		return $resource('journal-vouchers/:journalVoucherId', { journalVoucherId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);