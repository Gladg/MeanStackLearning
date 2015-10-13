'use strict';

// ExpenseTypes controller
angular.module('expense-types').controller('ExpenseTypesController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'ExpenseTypes',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, ExpenseTypes) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.expenseType={};
    

    

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new ExpenseType
		$scope.create = function() {
			// Create new ExpenseType object
			var expenseType = this.expenseType;
      
      
      
      
      
      
      
      
      expenseType.created = Date.now;
      expenseType = new ExpenseTypes (expenseType);
			// Redirect after save
			expenseType.$save(function(response) {
				//$location.path('expense-types/' + response._id);
        $location.path('expense-types');

				// Clear form fields
        
        $scope.code= null;
        $scope.name= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing ExpenseType
		$scope.remove = function(expenseType) {
			if ( expenseType ) {
				expenseType.$remove();

				for (var i in $scope.expenseTypes) {
					if ($scope.expenseTypes [i] === expenseType) {
						$scope.expenseTypes.splice(i, 1);
					}
				}
			} else {
				$scope.expenseType.$remove(function() {
					$location.path('expense-types');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing ExpenseType
		$scope.update = function() {
			var expenseType = $scope.expenseType;
      
      
      
      
      
      
			expenseType.$update(function() {
				$location.path('expense-types/' + expenseType._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of ExpenseTypes
		$scope.find = function() {
			$scope.expenseTypes = ExpenseTypes.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing ExpenseType
		$scope.findOne = function() {
      ExpenseTypes.get({
				expenseTypeId: $stateParams.expenseTypeId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        $scope.expenseType = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
	}
]);
