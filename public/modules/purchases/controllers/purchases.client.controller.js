'use strict';

// Purchases controller
angular.module('purchases').controller('PurchasesController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'Purchases', 'Suppliers', 'Products',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, Purchases, Suppliers, Products) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.purchase={};
    
    $scope.purchase.items=[];
    

    
    $scope.suppliers=Suppliers.query();

    
    
    //init method
    $scope.init = function () {
      $scope.purchase.billDate = $filter('date')(Date.now(), 'yyyy-MM-dd');
$scope.purchase.amount = 0;
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new Purchase
		$scope.create = function() {
			// Create new Purchase object
			var purchase = this.purchase;
      
      purchase.party = purchase.party._id;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
        purchase.items.forEach ( function (item) {
          item.product = item.product._id;
        });
      
      
      
      
      
      
      
      
            
      
      
      
      purchase.created = Date.now;
      purchase = new Purchases (purchase);
			// Redirect after save
			purchase.$save(function(response) {
				//$location.path('purchases/' + response._id);
        $location.path('purchases');

				// Clear form fields
        
        $scope.billNumber= null;
        $scope.billDate= null;
        $scope.party= null;
        $scope.paid= null;
        $scope.amount= null;
        $scope.items= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing Purchase
		$scope.remove = function(purchase) {
			if ( purchase ) {
				purchase.$remove();

				for (var i in $scope.purchases) {
					if ($scope.purchases [i] === purchase) {
						$scope.purchases.splice(i, 1);
					}
				}
			} else {
				$scope.purchase.$remove(function() {
					$location.path('purchases');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing Purchase
		$scope.update = function() {
			var purchase = $scope.purchase;
      
      purchase.party = purchase.party._id;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
        purchase.items.forEach ( function (item) {
          item.product = item.product._id;
        });
      
      
      
      
      
      
      
      
            
      
      
			purchase.$update(function() {
				$location.path('purchases/' + purchase._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of Purchases
		$scope.find = function() {
			$scope.purchases = Purchases.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing Purchase
		$scope.findOne = function() {
      Purchases.get({
				purchaseId: $stateParams.purchaseId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.billDate = $filter('date')(data.billDate, 'yyyy-MM-dd');
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $scope.purchase = data;
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
        $scope.purchase.items.push(item);
        item.amount = (item.quantity * item.cost);
$scope.purchase.amount = $scope.purchase.amount + item.amount;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removeitem = function (index) {
      $scope.purchase.items.splice(index,1);
    };
    
      
    
    
	}
]);

angular.module('purchases').controller('itemInstanceCtrl', function ($scope, $modalInstance, item, products ){
  $scope.item = item;
  $scope.products = products;
  $scope.ok = function () {
    $modalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});