angular.module('Downroot').controller('resultsCtrl', function($scope, $location, resultsService){
	
	// $scope.codeAddress = function() {
	// 	return placesService.codeAddress($scope.userAddress);
	// };

	$scope.showCategoryResults = function() {
		$location.path("/results/doctor");
		}

});