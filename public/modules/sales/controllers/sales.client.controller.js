'use strict';

// Sales controller
angular.module('sales').controller('SalesController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Sales', 'Customers', 'Products',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Sales, Customers, Products) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.sale={};
    
    $scope.sale.items=[];
    

    
    $scope.customers=Customers.query();

    
    
    //init method
    $scope.init = function () {
      $scope.sale.billDateTime = $filter('date')(Date.now(), 'yyyy-MM-dd');
$scope.sale.totalAmount = 0;
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Sale
		$scope.create = function() {
			// Create new Sale object
			var sale = this.sale;
      
      sale.party = sale.party._id;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
        sale.items.forEach ( function (item) {
          item.product = item.product._id;
        });
      
      
      
      
      
      
      
      
            
      
      
      
      sale.created = Date.now;
      sale = new Sales (sale);
			// Redirect after save
			sale.$save(function(response) {
				//$location.path('sales/' + response._id);
        $location.path('sales');

				// Clear form fields
        
        $scope.creditSales= null;
        $scope.party= null;
        $scope.billNumber= null;
        $scope.billDateTime= null;
        $scope.totalAmount= null;
        $scope.totalDiscount= null;
        $scope.taxes= null;
        $scope.items= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Sale
		$scope.remove = function(sale) {
			if ( sale ) {
				sale.$remove();

				for (var i in $scope.sales) {
					if ($scope.sales [i] === sale) {
						$scope.sales.splice(i, 1);
					}
				}
			} else {
				$scope.sale.$remove(function() {
					$location.path('sales');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Sale
		$scope.update = function() {
			var sale = $scope.sale;
      
      sale.party = sale.party._id;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
        sale.items.forEach ( function (item) {
          item.product = item.product._id;
        });
      
      
      
      
      
      
      
      
            
      
      
			sale.$update(function() {
				$location.path('sales/' + sale._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Sales
		$scope.find = function() {
			$scope.sales = Sales.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Sale
		$scope.findOne = function() {
      Sales.get({
				saleId: $stateParams.saleId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        
        
        
        
        data.billDateTime = $filter('date')(data.billDateTime, 'yyyy-MM-dd');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.sale = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
    
    
    

    

    

    

    

    

    
           
    $scope.additem = function () {
      var modalInstance = $modal.open({
        animation: false,
        templateUrl: 'itemContent.html',
        controller: 'itemInstanceCtrl',
        size: 'lg',
        resolve: {
          item: function () {
            var e = {};
            return e;
          }, 
products: function () { return Products.query(); }
        }
      });
      modalInstance.result.then(function (item) {
        $scope.sale.items.push(item);
        item.amount = (item.quantity * item.product.price);
item.price = item.product.price;
$scope.sale.totalAmount = $scope.sale.totalAmount + item.amount;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removeitem = function (index) {
      $scope.sale.items.splice(index,1);
    };
    
      
    
    
	}
]);

angular.module('sales').controller('itemInstanceCtrl', function ($scope, $modalInstance, item, products ){
  $scope.item = item;
  $scope.products = products;
  $scope.ok = function () {
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});