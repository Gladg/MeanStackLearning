'use strict';

//Setting up route
angular.module('expense-types').config(['$stateProvider',
	function($stateProvider) {
		// Expense Types state routing
		$stateProvider.
		state('listExpenseTypes', {
			url: '/expense-types',
			templateUrl: 'modules/expense-types/views/list-expense-types.client.view.html'
		}).
		state('createExpenseType', {
			url: '/expense-types/create',
			templateUrl: 'modules/expense-types/views/create-expense-type.client.view.html'
		}).
		state('viewExpenseType', {
			url: '/expense-types/:expenseTypeId',
			templateUrl: 'modules/expense-types/views/view-expense-type.client.view.html'
		}).
		state('editExpenseType', {
			url: '/expense-types/:expenseTypeId/edit',
			templateUrl: 'modules/expense-types/views/edit-expense-type.client.view.html'
		});
	}
]);