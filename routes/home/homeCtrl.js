angular.module('Downroot').controller('homeCtrl', function($rootScope, $scope, $location, homeService){

	// $scope.codeAddress = function() {
	// 	return placesService.codeAddress($scope.userAddress);
	// };

	$rootScope.user.userAddress;

	$scope.goToResults = function() {
		$location.path("/results");
	}

});