angular.module('Downroot').controller('resultsCtrl', function($rootScope, $scope, $routeParams, resultsService, localStorageService, $timeout){

	// window.$scope = $scope;

	$scope.getPlaces = function(category) {
		if (category === 'coffee') {
			$scope.categorySelect = ['bakery', 'cafe', 'food', 'establishment'];
			$scope.keyword = 'coffee';
			$scope.color = 'orange'
		} else if (category === 'grocery') {
			$scope.categorySelect = ['grocery_or_supermarket'];
			$scope.color = 'green';
		} else if (category === 'pizza') {
			$scope.categorySelect = ['restaurant'];
			$scope.keyword = 'pizza'
			$scope.color = 'pink';
		} else if (category === 'movietheater') {
			$scope.categorySelect = ['movie_theater'];
			$scope.color = 'blue';
		} else if (category === 'atm') {
			$scope.categorySelect = ['atm'];
			$scope.color = 'purple';
		} else if (category === 'gas') {
			$scope.categorySelect = ['gas_station'];
			$scope.color = 'orange';
		} else if (category === 'postoffice') {
			$scope.categorySelect = ['post_office'];
			$scope.color = 'green';
		} else if (category === 'drycleaning') {
			$scope.categorySelect = ['laundry'];
			$scope.keyword = 'dry cleaners'
			$scope.color = 'pink';
		} else if (category === 'pharmacy') {
			$scope.categorySelect = ['pharmacy'];
			$scope.color = 'blue';
		} else if (category === 'carwash') {
			$scope.categorySelect = ['car_wash'];
			$scope.color = 'purple';
		} else if (category === 'carrepair') {
			$scope.categorySelect = ['car_repair'];
			$scope.color = 'orange';
		} else if (category === 'dentist') {
			$scope.categorySelect = ['dentist'];
			$scope.color = 'green';
		} else if (category === 'doctor') {
			$scope.categorySelect = ['doctor'];
			$scope.keyword = 'Family Practice Physician'
			$scope.color = 'pink';
		} else if (category === 'hospital') {
			$scope.categorySelect = ['hospital'];
			$scope.keyword = 'hospital'
			$scope.color = 'blue';
		} else if (category === 'police') {
			$scope.categorySelect = ['police'];
			$scope.keyword = 'sheriff'
			$scope.color = 'purple';
		} 

		console.log($rootScope.user.address, $rootScope.user.city, $rootScope.user.state);
		console.log("$rootScope");
		$scope.showingCategory = true;
		$scope.categoryChoice = category;

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

								if (place.details.rating >= 1) {
									place.details.star1 = true;
								};
								if (place.details.rating >= 2) {
									place.details.star2 = true;
								};
								if (place.details.rating >= 3) {
									place.details.star3 = true;
								};
								if (place.details.rating >= 4) {
									place.details.star4 = true;
								};
								if (place.details.rating >= 5) {
									place.details.star5 = true;
								};

								for (var i = 0; i < place.details.address_components.length; i++) {
									if (place.details.address_components[i].types[0] === "street_number") {
										place.details.street_number = place.details.address_components[i].short_name;
									}
									if (place.details.address_components[i].types[0] === "route") {
										place.details.route = place.details.address_components[i].short_name;
									}
									if (place.details.address_components[i].types[0] === "locality") {
										place.details.locality = place.details.address_components[i].short_name;
									}
									console.log(place.details.street_number, place.details.route, place.details.locality);
								}

							});
						}, i * 300);
					
					// how do i get just one property of the object to show up in the view
					})
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