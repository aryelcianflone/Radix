angular.module('Downroot').controller('MainController', function($scope, placesService) {

	$scope.test = "hello";

	$scope.codeAddress = function() {
		return placesService.codeAddress($scope.userAddress);
	};

	$scope.getPlaces = function() {
		return placesService.codeAddress($scope.userAddress).then(function(latLong) {
			console.log(latLong);
			placesService.getPlaces(latLong[0], latLong[1]).then(function(data) {
				$scope.placesData = data;
			});
		})
		// .then()
		// getPlaces(latLong[0], latLong[1]).then(function(data) {
		// 	console.log(data);
		// 	$scope.placesData = data;
		// });
	};

	var init = function () {
		placesService.initialize();
   // check if there is query in url
   // and fire search in case its value is not empty
	};

	init();

});

// .then(function(data) {
//        console.log(data);
// 	     $scope.placesData = data;