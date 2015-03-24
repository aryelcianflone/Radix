angular.module('Downroot', ['ngRoute']).config(function($routeProvider){
	
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

});

angular.module('Downroot').run(function($rootScope){
    $rootScope.user = {};
});
