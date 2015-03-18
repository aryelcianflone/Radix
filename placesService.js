angular.module('Downroot').service('placesService', function($q) {

	var geocoder;
  var map;
  var service;
  var infowindow;

  this.initialize = function initialize() {
    geocoder = new google.maps.Geocoder();
    // var latlng = new google.maps.LatLng(-34.397, 150.644);
    // var mapOptions = {
    //   zoom: 8,
    //   center: latlng
    // }
    // map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  };

  this.codeAddress = function codeAddress(userAddress) {
    // var address = userAddress.value;
    return $q (function(resolve, reject) {
        geocoder.geocode( { 'address': userAddress}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var loc=[]; // no need to define it in outer function now
            loc[0]=results[0].geometry.location.lat();
            loc[1]=results[0].geometry.location.lng();

            resolve( loc ); 
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
    });
  }

  this.getPlaces = function initialize(lat, long) {
    console.log(lat, long);

    var userLocation = new google.maps.LatLng(lat, long);

    var request = {
      location: userLocation,
      radius: '500',
      types: ['doctor']
    };

    map = new google.maps.Map(document.getElementById('map'), {
      center: userLocation,
      zoom: 15
    });

    var service = new google.maps.places.PlacesService(map);

    return $q(function (resolve, reject) {
      service.nearbySearch(request, function (res, stat) {
        if (stat === google.maps.places.PlacesServiceStatus.OK) {
          resolve(res);
        }
        console.log(res);
      });
    });

  }

});










