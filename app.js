angular.module('Downroot', ['ngRoute', 'LocalStorageModule', 'ngMaterial']).config(function($routeProvider, localStorageServiceProvider, $mdThemingProvider){
	
  // $httpProvider.interceptors.push('httpRequestInterceptor');

  //router here

  $routeProvider
    .when('/', {
      templateUrl: '/routes/home/homeTmpl.html',
      controller: 'homeCtrl'
    })
    .when('/results', {
      templateUrl: '/routes/results/resultsTmpl.html',
      controller: 'resultsCtrl'
      // resolve: {
      //   teamData: function (resultsService, $route) {
      //     return resultsService.getCategories($route.current.params.team)
      // 	}
      // }
    })

    .when('/results/:category', {
      templateUrl: '/routes/categories/categoryTmpl.html',
      controller: 'categoryCtrl',
      // resolve: {
      //   teamData: function (categoryService, $route) {
      //     return categoryService.getTeamData($route.current.params.category)
      //   }
      // }
    })

    .otherwise({
      redirectTo: '/'
    });

  localStorageServiceProvider.setPrefix('Downroot');

  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('yellow')
    .dark();

});

angular.module('Downroot').run(function($rootScope, localStorageService){
    $rootScope.user = {};
   // localStorageService.get('localUserAddress');
    window.localStorageService = localStorageService;
    $rootScope.user.userAddress = localStorageService.get('localUserAddress');
});
