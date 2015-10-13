'use strict';

// GeneralLedgers controller
angular.module('general-ledgers').controller('GeneralLedgersController', ['$scope', '$modal', '$stateParams', '$location', '$log', '$filter', 'Authentication', 'GeneralLedgers',
 	function($scope, $modal, $stateParams, $location, $log, $filter, Authentication, GeneralLedgers) {
		$scope.authentication = Authentication;
    //bookmark
    $scope.generalLedger={};
    

    

    
    
    //init method
    $scope.init = function () {
      
    };    
    
    
    

    

    

    

    

    

    
    
    
    
    
		// Create new GeneralLedger
		$scope.create = function() {
			// Create new GeneralLedger object
			var generalLedger = this.generalLedger;
      
      
      
      
      
      
      
      
      generalLedger.created = Date.now;
      generalLedger = new GeneralLedgers (generalLedger);
			// Redirect after save
			generalLedger.$save(function(response) {
				//$location.path('general-ledgers/' + response._id);
        $location.path('general-ledgers');

				// Clear form fields
        
        $scope.name= null;
        $scope.description= null;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    

    

    
    
    
    
    

    
		// Remove existing GeneralLedger
		$scope.remove = function(generalLedger) {
			if ( generalLedger ) {
				generalLedger.$remove();

				for (var i in $scope.generalLedgers) {
					if ($scope.generalLedgers [i] === generalLedger) {
						$scope.generalLedgers.splice(i, 1);
					}
				}
			} else {
				$scope.generalLedger.$remove(function() {
					$location.path('general-ledgers');
				});
			}
		};
    

    

    

    

    

    
    
    
    
    

    

    
		// Update existing GeneralLedger
		$scope.update = function() {
			var generalLedger = $scope.generalLedger;
      
      
      
      
      
      
			generalLedger.$update(function() {
				$location.path('general-ledgers/' + generalLedger._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
    

    

    

    

    
    
    
    
    

    

    

    
		// Find a list of GeneralLedgers
		$scope.find = function() {
			$scope.generalLedgers = GeneralLedgers.query();
		};
    

    

    

    
    
    
    
    

    

    

    

    
		// Find existing GeneralLedger
		$scope.findOne = function() {
      GeneralLedgers.get({
				generalLedgerId: $stateParams.generalLedgerId
			})
      .$promise.then(function(data) {
        
        
        
        
        
        
        $scope.generalLedger = data;
      }, function(reason) {
        console.log('Failed: ' + reason);
      });
		};
    

    

    
    
	}
]);
