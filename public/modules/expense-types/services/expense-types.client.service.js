'use strict';

//Expense Types service used to communicate Expense Types REST endpoints
angular.module('expense-types').factory('ExpenseTypes', ['$resource',
	function($resource) {
		return $resource('expense-types/:expenseTypeId', { expenseTypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);