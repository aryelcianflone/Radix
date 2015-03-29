angular.module('Downroot').controller('homeCtrl', function($rootScope, $scope, $location, homeService, localStorageService){

	// $scope.codeAddress = function() {
	// 	return placesService.codeAddress($scope.userAddress);
	// };

  $rootScope.user = {
    address: "",
    city: "",
    state: ""
  };

	$scope.goToResults = function() {
		var userAddress = $rootScope.user.address + ", " + $rootScope.user.city + ", " + $rootScope.user.state;
		$location.path("/results");
		localStorageService.set('localUserAddress', userAddress);
	}

});