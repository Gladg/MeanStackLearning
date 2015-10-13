'use strict';

// Customers controller
angular.module('customers').controller('CustomersController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Customers',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Customers) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.customer={};
    

    

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Customer
		$scope.create = function() {
			// Create new Customer object
			var customer = this.customer;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      customer.created = Date.now;
      customer = new Customers (customer);
			// Redirect after save
			customer.$save(function(response) {
				//$location.path('customers/' + response._id);
        $location.path('customers');

				// Clear form fields
        
        $scope.name= null;
        $scope.address= null;
        $scope.mobileNumber= null;
        $scope.email= null;
        $scope.pan= null;
        $scope.tin= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Customer
		$scope.remove = function(customer) {
			if ( customer ) {
				customer.$remove();

				for (var i in $scope.customers) {
					if ($scope.customers [i] === customer) {
						$scope.customers.splice(i, 1);
					}
				}
			} else {
				$scope.customer.$remove(function() {
					$location.path('customers');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Customer
		$scope.update = function() {
			var customer = $scope.customer;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
			customer.$update(function() {
				$location.path('customers/' + customer._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Customers
		$scope.find = function() {
			$scope.customers = Customers.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Customer
		$scope.findOne = function() {
      Customers.get({
				customerId: $stateParams.customerId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.customer = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
	}
]);
