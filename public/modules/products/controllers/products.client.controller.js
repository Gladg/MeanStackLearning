'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Products', 'Categories',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Products, Categories) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.product={};
    

    
    $scope.categories=Categories.query();

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = this.product;
      
      product.category = product.category._id;
      
      
      
      
      
      
      
      
      
      
      product.created = Date.now;
      product = new Products (product);
			// Redirect after save
			product.$save(function(response) {
				//$location.path('products/' + response._id);
        $location.path('products');

				// Clear form fields
        
        $scope.name= null;
        $scope.brand= null;
        $scope.category= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;
      
      product.category = product.category._id;
      
      
      
      
      
      
      
      
			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Product
		$scope.findOne = function() {
      Products.get({
				productId: $stateParams.productId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        $scope.product = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
	}
]);
