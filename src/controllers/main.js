(function() {
  let app = angular.module('search');
  
  let main = function($scope,$location,github,$routeParams) {
	  
     $scope.search = function(search) {
		$location.path("/user/"+search);
    }
	if(!github.getSearches())
	{
		github.putSearches(github.getCommonSearches());
	}
	$scope.deleteSearches=function(){
		//re-initialise
		github.deleteSearches();
		$scope.newSearches=github.anyNewSearches();
		$scope.developments = github.getSearches();
		$scope.error="";
		$scope.username="";
	}
	
	$scope.developments = github.getSearches();
	$scope.username="angular";
	$scope.error=$routeParams.error?$routeParams.error:"";
	$scope.newSearches=github.anyNewSearches();
  }
  app.controller('maincontroller', ["$scope", "$location", "github", "$routeParams", main]);
}());