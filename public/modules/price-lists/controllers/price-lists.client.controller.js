'use strict';

// PriceLists controller
angular.module('price-lists').controller('PriceListsController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'PriceLists', 'Products',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, PriceLists, Products) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.priceList={};
    
    $scope.priceList.products=[];
    

    

    
    
    //init method
    $scope.init = function () {
      $scope.priceList.effectiveDate = $filter('date')(Date.now(), 'yyyy-MM-dd');
Products.query().$promise.then(function(data) {
  var products = data;
  $scope.priceList.products.splice(0);
  products.forEach ( function (product) {
    var p = {brand: product.brand, unitOfMeasure: product.unitOfMeasure, units: product.units, price: product.price};
    p.product = {_id: product._id, name: product.name};
    $scope.priceList.products.push(p);
  });        
}, function(reason) {
  console.log('Failed: ' + reason);
});
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new PriceList
		$scope.create = function() {
			// Create new PriceList object
			var priceList = this.priceList;
      
      
      
      
      
      
      
      
      
      
      
        priceList.products.forEach ( function (product) {
          product.product = product.product._id;
        });
      
      
      
      
            
      
      
      
      priceList.created = Date.now;
      priceList = new PriceLists (priceList);
			// Redirect after save
			priceList.$save(function(response) {
				//$location.path('price-lists/' + response._id);
        $location.path('price-lists');

				// Clear form fields
        
        $scope.priceListName= null;
        $scope.effectiveDate= null;
        $scope.products= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing PriceList
		$scope.remove = function(priceList) {
			if ( priceList ) {
				priceList.$remove();

				for (var i in $scope.priceLists) {
					if ($scope.priceLists [i] === priceList) {
						$scope.priceLists.splice(i, 1);
					}
				}
			} else {
				$scope.priceList.$remove(function() {
					$location.path('price-lists');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing PriceList
		$scope.update = function() {
			var priceList = $scope.priceList;
      
      
      
      
      
      
      
      
      
      
        priceList.products.forEach ( function (product) {
          product.product = product.product._id;
        });
      
      
      
      
            
      
      
			priceList.$update(function() {
				$location.path('price-lists/' + priceList._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of PriceLists
		$scope.find = function() {
			$scope.priceLists = PriceLists.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing PriceList
		$scope.findOne = function() {
      PriceLists.get({
				priceListId: $stateParams.priceListId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.effectiveDate = $filter('date')(data.effectiveDate, 'yyyy-MM-dd');
        
        
        
        
        
        
        $scope.priceList = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
    
    
    

    

    

    

    

    

    
      
    $scope.addproduct = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'productContent.html',
        controller: 'productInstanceCtrl',
        size: 'lg',
        resolve: {
          product: function () {
            var e = {};
            return e;
          }, 
products: function () { return Products.query(); }
        }
      });
      modalInstance.result.then(function (product) {
        $scope.priceList.products.push(product);
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removeproduct = function (index) {
      $scope.priceList.products.splice(index,1);
    };
    
      
    
    
    
    
    

    

    

    

    

    
    $scope.loadProducts = function () {
      Products.query().$promise.then(function(data) {
  var products = data;
  $scope.priceList.products.splice(0);
  products.forEach ( function (product) {
    var p = {brand: product.brand, unitOfMeasure: product.unitOfMeasure, units: product.units, price: product.price};
    p.product = {_id: product._id, name: product.name};
    $scope.priceList.products.push(p);
  });        
}, function(reason) {
  console.log('Failed: ' + reason);
});
    };
    

    
    
	}
]);

angular.module('price-lists').controller('productInstanceCtrl', function ($scope, $modalInstance, product, products ){
  $scope.product = product;
  $scope.products = products;
  $scope.ok = function () {
    $modalInstance.close($scope.product);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});