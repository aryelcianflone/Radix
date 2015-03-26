angular.module('Downroot').controller('homeCtrl', function($rootScope, $scope, $location, homeService, localStorageService){

	// $scope.codeAddress = function() {
	// 	return placesService.codeAddress($scope.userAddress);
	// };

	$scope.goToResults = function() {
		$location.path("/results");
		localStorageService.set('localUserAddress', $rootScope.user.userAddress);
	}

});