'use strict';

// Expenses controller
angular.module('expenses').controller('ExpensesController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Expenses', 'ExpenseTypes',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Expenses, ExpenseTypes) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.expense={};
    
    $scope.expense.details=[];
    

    

    
    
    //init method
    $scope.init = function () {
      $scope.expense.expenseDate = $filter('date')(Date.now(), 'yyyy-MM-dd');
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Expense
		$scope.create = function() {
			// Create new Expense object
			var expense = this.expense;
      
      
      
      
      
      
      
      
      
      
      
        expense.details.forEach ( function (detail) {
          detail.expenseType = detail.expenseType._id;
        });
      
      
      
      
      
      
            
      
      
      
      expense.created = Date.now;
      expense = new Expenses (expense);
			// Redirect after save
			expense.$save(function(response) {
				//$location.path('expenses/' + response._id);
        $location.path('expenses');

				// Clear form fields
        
        $scope.expenseDate= null;
        $scope.amount= null;
        $scope.details= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Expense
		$scope.remove = function(expense) {
			if ( expense ) {
				expense.$remove();

				for (var i in $scope.expenses) {
					if ($scope.expenses [i] === expense) {
						$scope.expenses.splice(i, 1);
					}
				}
			} else {
				$scope.expense.$remove(function() {
					$location.path('expenses');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Expense
		$scope.update = function() {
			var expense = $scope.expense;
      
      
      
      
      
      
      
      
      
      
        expense.details.forEach ( function (detail) {
          detail.expenseType = detail.expenseType._id;
        });
      
      
      
      
      
      
            
      
      
			expense.$update(function() {
				$location.path('expenses/' + expense._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Expenses
		$scope.find = function() {
			$scope.expenses = Expenses.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Expense
		$scope.findOne = function() {
      Expenses.get({
				expenseId: $stateParams.expenseId
			})
      .$promise.then(function(data) {
        
        data.expenseDate = $filter('date')(data.expenseDate, 'yyyy-MM-dd');
        
        
        
        
        
        
        
        
        
        $scope.expense = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
    
    
    

    

    

    

    

    

    
      
    $scope.adddetail = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'detailContent.html',
        controller: 'detailInstanceCtrl',
        size: 'lg',
        resolve: {
          detail: function () {
            var e = {};
            return e;
          }, 
expenseTypes: function () { return ExpenseTypes.query(); }
        }
      });
      modalInstance.result.then(function (detail) {
        $scope.expense.details.push(detail);
        $scope.expense.amount = $scope.expense.details.reduce( function (sum, detail) {
  return sum + (detail.amount);
}, 0);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removedetail = function (index) {
      $scope.expense.details.splice(index,1);
    };
    
      
    
    
	}
]);

angular.module('expenses').controller('detailInstanceCtrl', function ($scope, $modalInstance, detail, expenseTypes ){
  $scope.detail = detail;
  $scope.expenseTypes = expenseTypes;
  $scope.ok = function () {
    $modalInstance.close($scope.detail);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});