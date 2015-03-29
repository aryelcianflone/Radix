angular.module('Downroot').controller('categoryCtrl', function($rootScope, $scope, $routeParams, categoryService, localStorageService, $timeout){
	
	// window.$scope = $scope;

	if ($routeParams.category === 'coffee') {
		$scope.categorySelect = ['bakery', 'cafe', 'food', 'establishment'];
		$scope.keyword = 'coffee'
	} else if ($routeParams.category === 'grocery') {
		$scope.categorySelect = ['grocery_or_supermarket'];
	} else if ($routeParams.category === 'pizza') {
		$scope.categorySelect = ['restaurant'];
		$scope.keyword = 'pizza'
	} else if ($routeParams.category === 'movietheater') {
		$scope.categorySelect = ['movie_theater'];
	} else if ($routeParams.category === 'atm') {
		$scope.categorySelect = ['atm'];
	} else if ($routeParams.category === 'gas') {
		$scope.categorySelect = ['gas_station'];
	} else if ($routeParams.category === 'postoffice') {
		$scope.categorySelect = ['post_office'];
	} else if ($routeParams.category === 'drycleaning') {
		$scope.categorySelect = ['laundry'];
		$scope.keyword = 'dry cleaners'
	} else if ($routeParams.category === 'pharmacy') {
		$scope.categorySelect = ['pharmacy'];
	} else if ($routeParams.category === 'carwash') {
		$scope.categorySelect = ['car_wash'];
	} else if ($routeParams.category === 'carrepair') {
		$scope.categorySelect = ['car_repair'];
	} else if ($routeParams.category === 'dentist') {
		$scope.categorySelect = ['dentist'];
	} else if ($routeParams.category === 'doctor') {
		$scope.categorySelect = ['doctor'];
		$scope.keyword = 'Family Practice Physician'
	} else if ($routeParams.category === 'hospital') {
		$scope.categorySelect = ['hospital'];
		$scope.keyword = 'hospital'
	} else if ($routeParams.category === 'policestation') {
		$scope.categorySelect = ['police'];
		$scope.keyword = 'sheriff'
	} 

	var getPlaces = function() {
		console.log($rootScope.user.address, $rootScope.user.city, $rootScope.user.state);
		console.log("$rootScope");
		return categoryService.codeAddress($rootScope.user.address, $rootScope.user.city, $rootScope.user.state).then(function(latLong) {
			console.log(latLong);
			categoryService.getPlaces(latLong[0], latLong[1], $scope.categorySelect, $scope.keyword).then(function(res) {
					$scope.placesData = res;
					var placesData = res; 
					res.forEach(function(place, i) {
						$timeout(function () {
							categoryService.getPlaceDetails(place.place_id).then(function(res) {
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