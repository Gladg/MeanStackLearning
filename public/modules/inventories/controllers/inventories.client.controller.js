'use strict';

// Inventories controller
angular.module('inventories').controller('InventoriesController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Inventories', 'Products',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Inventories, Products) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.inventory={};
    

    
    $scope.products=Products.query();

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Inventory
		$scope.create = function() {
			// Create new Inventory object
			var inventory = this.inventory;
      
      inventory.product = inventory.product._id;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      inventory.created = Date.now;
      inventory = new Inventories (inventory);
			// Redirect after save
			inventory.$save(function(response) {
				//$location.path('inventories/' + response._id);
        $location.path('inventories');

				// Clear form fields
        
        $scope.product= null;
        $scope.lotOrBatchNumber= null;
        $scope.expiryDate= null;
        $scope.quantity= null;
        $scope.cost= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Inventory
		$scope.remove = function(inventory) {
			if ( inventory ) {
				inventory.$remove();

				for (var i in $scope.inventories) {
					if ($scope.inventories [i] === inventory) {
						$scope.inventories.splice(i, 1);
					}
				}
			} else {
				$scope.inventory.$remove(function() {
					$location.path('inventories');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Inventory
		$scope.update = function() {
			var inventory = $scope.inventory;
      
      inventory.product = inventory.product._id;
      
      
      
      
      
      
      
      
      
      
      
      
			inventory.$update(function() {
				$location.path('inventories/' + inventory._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Inventories
		$scope.find = function() {
			$scope.inventories = Inventories.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Inventory
		$scope.findOne = function() {
      Inventories.get({
				inventoryId: $stateParams.inventoryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        data.expiryDate = $filter('date')(data.expiryDate, 'yyyy-MM-dd');
        
        
        
        
        
        
        
        
        
        $scope.inventory = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
	}
]);
