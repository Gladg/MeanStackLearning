'use strict';

// JournalVouchers controller
angular.module('journal-vouchers').controller('JournalVouchersController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'JournalVouchers', 'GeneralLedgers',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, JournalVouchers, GeneralLedgers) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.journalVoucher={};
    
    $scope.journalVoucher.details=[];
    

    

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new JournalVoucher
		$scope.create = function() {
			// Create new JournalVoucher object
			var journalVoucher = this.journalVoucher;
      
      
      
      
      
      
      
      
      
      
      
        journalVoucher.details.forEach ( function (detail) {
          detail.accountName = detail.accountName._id;
        });
      
      
      
      
      
      
            
      
      
      
      journalVoucher.created = Date.now;
      journalVoucher = new JournalVouchers (journalVoucher);
			// Redirect after save
			journalVoucher.$save(function(response) {
				//$location.path('journal-vouchers/' + response._id);
        $location.path('journal-vouchers');

				// Clear form fields
        
        $scope.voucherNumber= null;
        $scope.voucherDate= null;
        $scope.details= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing JournalVoucher
		$scope.remove = function(journalVoucher) {
			if ( journalVoucher ) {
				journalVoucher.$remove();

				for (var i in $scope.journalVouchers) {
					if ($scope.journalVouchers [i] === journalVoucher) {
						$scope.journalVouchers.splice(i, 1);
					}
				}
			} else {
				$scope.journalVoucher.$remove(function() {
					$location.path('journal-vouchers');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing JournalVoucher
		$scope.update = function() {
			var journalVoucher = $scope.journalVoucher;
      
      
      
      
      
      
      
      
      
      
        journalVoucher.details.forEach ( function (detail) {
          detail.accountName = detail.accountName._id;
        });
      
      
      
      
      
      
            
      
      
			journalVoucher.$update(function() {
				$location.path('journal-vouchers/' + journalVoucher._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of JournalVouchers
		$scope.find = function() {
			$scope.journalVouchers = JournalVouchers.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing JournalVoucher
		$scope.findOne = function() {
      JournalVouchers.get({
				journalVoucherId: $stateParams.journalVoucherId
			})
      .$promise.then(function(data) {
        
        
        
        
        data.voucherDate = $filter('date')(data.voucherDate, 'yyyy-MM-dd');
        
        
        
        
        
        
        $scope.journalVoucher = data;
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
generalLedgers: function () { return GeneralLedgers.query(); }
        }
      });
      modalInstance.result.then(function (detail) {
        $scope.journalVoucher.details.push(detail);
        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.removedetail = function (index) {
      $scope.journalVoucher.details.splice(index,1);
    };
    
      
    
    
	}
]);

angular.module('journal-vouchers').controller('detailInstanceCtrl', function ($scope, $modalInstance, detail, generalLedgers ){
  $scope.detail = detail;
  $scope.generalLedgers = generalLedgers;
  $scope.ok = function () {
    $modalInstance.close($scope.detail);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});