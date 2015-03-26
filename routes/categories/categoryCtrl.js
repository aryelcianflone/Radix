angular.module('Downroot').controller('categoryCtrl', function($rootScope, $scope, $routeParams, categoryService, localStorageService){
	
	// window.$scope = $scope;

	$scope.codeAddress = function() {
		return placesService.codeAddress($rootScope.user.userAddress);
	};

	if ($routeParams.category === 'doctor') {
		$scope.categorySelect = ['doctor'];
	} else if ($routeParams.category === 'store') {
		$scope.categorySelect = ['store'];
	} 

	var getPlaces = function() {
		console.log($rootScope.user.userAddress);
		console.log("$rootScope");
		return categoryService.codeAddress($rootScope.user.userAddress).then(function(latLong) {
			console.log(latLong);
			categoryService.getPlaces(latLong[0], latLong[1], $scope.categorySelect).then(function(res) {
					$scope.placesData = res;
					var placesData = res; 
					res.forEach(function(place) {
						categoryService.getPlaceDetails(place.place_id).then(function(res) {
							place.details = res;
							console.log(res);
						});	
					
					// how do i get just one property of the object to show up in the view
					});
			})
		})
	}

	// $scope.getPlaceDetails = function(place) {
	// 	return categoryService.getPlaceDetails(place.place_id).then(function(res) {
	// 		place.details = res;
	// 		console.log(res);
	// 	})	
	// }

	var init = function () {
		categoryService.initialize();
   // check if there is query in url
   // and fire search in case its value is not empty
	};

	init();
	getPlaces();

});

// .then(function(data) {
//        console.log(data);
// 	     $scope.placesData = data;