(function() {
	var app = angular.module('search');
	var user = function($scope, github, $location, $routeParams, pager) {

    $scope.pager = {};
	$scope.setPage=function(page) {
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        $scope.pager=pager.GetPager($scope.repos.length, page);
 
        // get current page of items
        $scope.pager.items = $scope.repos.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }
	let onFirstData = function(data) {
		$scope.repos = data;
		$scope.pager=pager.GetPager($scope.repos.length, 1);
 
        // get current page of items
		$scope.pager.items = $scope.repos.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
	}
	let onDataRecieved = function(data) {
		$scope.person.user = data;
		//update store	
		github.addToSearches($routeParams.username);
		github.getDetail($scope.person.user.repos_url)
        .then(onFirstData)
    }
	$scope.returntosearch=function()
	{
		$location.path("/main/Saved the search for "+$routeParams.username);
	}
	let onError = function(reason) {
	  $scope.error = "Error: "+reason.status+" ("+reason.statusText+"). There is no development called "+$scope.username+".";
	  $location.path("/main/"+$scope.error);
    }
    $scope.username = $routeParams.username;
    $scope.repossortorder = '-stargazers_count';
    $scope.person = {};
	
	github.getUser($scope.username)
	.then(onDataRecieved,onError);
	}
	app.controller('usercontroller', ["$scope", "github", "$location", "$routeParams","pager", user]);
}());

