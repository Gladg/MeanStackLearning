'use strict';

// Categories controller
angular.module('categories').controller('CategoriesController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Categories',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Categories) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.category={};
    

    

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Category
		$scope.create = function() {
			// Create new Category object
			var category = this.category;
      
      
      
      
      
      
      
      
      category.created = Date.now;
      category = new Categories (category);
			// Redirect after save
			category.$save(function(response) {
				//$location.path('categories/' + response._id);
        $location.path('categories');

				// Clear form fields
        
        $scope.name= null;
        $scope.description= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Category
		$scope.remove = function(category) {
			if ( category ) {
				category.$remove();

				for (var i in $scope.categories) {
					if ($scope.categories [i] === category) {
						$scope.categories.splice(i, 1);
					}
				}
			} else {
				$scope.category.$remove(function() {
					$location.path('categories');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Category
		$scope.update = function() {
			var category = $scope.category;
      
      
      
      
      
      
			category.$update(function() {
				$location.path('categories/' + category._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Categories
		$scope.find = function() {
			$scope.categories = Categories.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Category
		$scope.findOne = function() {
      Categories.get({
				categoryId: $stateParams.categoryId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        $scope.category = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
	}
]);
