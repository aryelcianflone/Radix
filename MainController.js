angular.module('Downroot').controller('MainController', function($scope, placesService) {

	$scope.test = "hello";
	$scope.userAddress = "659 South 1100 East, Salt Lake City, UT";

	// $scope.codeAddress = function() {
	// 	return placesService.codeAddress($scope.userAddress);
	// };

	$scope.getPlaces = function() {
		return placesService.codeAddress($scope.userAddress).then(function(latLong) {
			console.log(latLong);
			placesService.getPlaces(latLong[0], latLong[1]).then(function(res) {
					$scope.placesData = res;	
					// how do i get just one property of the object to show up in the view
			})
		})
	}

	$scope.getPlaceDetails = function(place) {
		return placesService.getPlaceDetails(place.place_id).then(function(res) {
			place.details = res;
			console.log(res);
		})	
	}

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