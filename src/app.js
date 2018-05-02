(function() {
  var app = angular.module('search', ["ngRoute"]);

	app.config(function($routeProvider){
		$routeProvider
		.when("/main",{
			templateUrl:"templates/main.html",
			controller:"maincontroller"
		})
		.when("/main/:error",{
			templateUrl:"templates/main.html",
			controller:"maincontroller"
		})
		.when("/user/:username",{
			templateUrl:"templates/user.html",
			controller:"usercontroller"
		})
		.when("/repo/:username/:reponame",{
			templateUrl:"templates/repo.html",
			controller:"repocontroller"
		})
		.otherwise({redirectTo:"/main"});
	});
	

}());
