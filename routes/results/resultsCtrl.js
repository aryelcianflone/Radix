angular.module('Downroot').controller('resultsCtrl', function($rootScope, $scope, $routeParams, resultsService, localStorageService, $timeout){

	// window.$scope = $scope;

	$scope.getPlaces = function(category) {
		if (category === 'coffee') {
			$scope.categorySelect = ['bakery', 'cafe', 'food', 'establishment'];
			$scope.keyword = 'coffee'
		} else if (category === 'grocery') {
			$scope.categorySelect = ['grocery_or_supermarket'];
		} else if (category === 'pizza') {
			$scope.categorySelect = ['restaurant'];
			$scope.keyword = 'pizza'
		} else if (category === 'movietheater') {
			$scope.categorySelect = ['movie_theater'];
		} else if (category === 'atm') {
			$scope.categorySelect = ['atm'];
		} else if (category === 'gas') {
			$scope.categorySelect = ['gas_station'];
		} else if (category === 'postoffice') {
			$scope.categorySelect = ['post_office'];
		} else if (category === 'drycleaning') {
			$scope.categorySelect = ['laundry'];
			$scope.keyword = 'dry cleaners'
		} else if (category === 'pharmacy') {
			$scope.categorySelect = ['pharmacy'];
		} else if (category === 'carwash') {
			$scope.categorySelect = ['car_wash'];
		} else if (category === 'carrepair') {
			$scope.categorySelect = ['car_repair'];
		} else if (category === 'dentist') {
			$scope.categorySelect = ['dentist'];
		} else if (category === 'doctor') {
			$scope.categorySelect = ['doctor'];
			$scope.keyword = 'Family Practice Physician'
		} else if (category === 'hospital') {
			$scope.categorySelect = ['hospital'];
			$scope.keyword = 'hospital'
		} else if (category === 'police') {
			$scope.categorySelect = ['police'];
			$scope.keyword = 'sheriff'
		} 

		console.log($rootScope.user.address, $rootScope.user.city, $rootScope.user.state);
		console.log("$rootScope");
		return resultsService.codeAddress(localStorageService.get('localUserAddress')).then(function(latLong) {
			console.log(localStorageService.get('localUserAddress'));
			console.log(latLong);
			resultsService.getPlaces(latLong[0], latLong[1], $scope.categorySelect, $scope.keyword).then(function(res) {
					$scope.placesData = res;
					var placesData = res; 
					res.forEach(function(place, i) {
						$timeout(function () {
							resultsService.getPlaceDetails(place.place_id).then(function(res) {
								place.details = res;
								console.log(res);
							});
						}, i * 300);
					
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
		resultsService.initialize();
   // check if there is query in url
   // and fire search in case its value is not empty
	};

	init();

});