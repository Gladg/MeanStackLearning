'use strict';

// Suppliers controller
angular.module('suppliers').controller('SuppliersController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Suppliers',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Suppliers) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.supplier={};
    

    

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Supplier
		$scope.create = function() {
			// Create new Supplier object
			var supplier = this.supplier;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      supplier.created = Date.now;
      supplier = new Suppliers (supplier);
			// Redirect after save
			supplier.$save(function(response) {
				//$location.path('suppliers/' + response._id);
        $location.path('suppliers');

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
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Supplier
		$scope.remove = function(supplier) {
			if ( supplier ) {
				supplier.$remove();

				for (var i in $scope.suppliers) {
					if ($scope.suppliers [i] === supplier) {
						$scope.suppliers.splice(i, 1);
					}
				}
			} else {
				$scope.supplier.$remove(function() {
					$location.path('suppliers');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Supplier
		$scope.update = function() {
			var supplier = $scope.supplier;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
			supplier.$update(function() {
				$location.path('suppliers/' + supplier._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Suppliers
		$scope.find = function() {
			$scope.suppliers = Suppliers.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Supplier
		$scope.findOne = function() {
      Suppliers.get({
				supplierId: $stateParams.supplierId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.supplier = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
	}
]);
