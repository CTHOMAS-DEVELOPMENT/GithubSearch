(function() {
	var app = angular.module('search');
	var contributor = function($scope, github, $routeParams, $location, pager) {
	$scope.pager = {};
	$scope.setPage=function(page) {
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        $scope.pager=pager.GetPager($scope.contributors.length, page, 4);
        $scope.pager.items = $scope.contributors.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }
    let onFirstData = function(data) {
		$scope.contributors = data;
	  	$scope.pager=pager.GetPager($scope.contributors.length, 1, 4);
 
        // get current page of items
		$scope.pager.items = $scope.contributors.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
   }
   	$scope.returntosearch=function()
	{
		$location.path("/main/Returned from the "+$scope.username+" development after investigating the "+ $scope.reponame +" branch.");
	}
    let onDataRecieved = function(data) {
 	  
	  $scope.repositoryname=data.name;
	  $scope.issues=data.open_issues_count;
	  
      github.getDetail(data.contributors_url)
       .then(onFirstData, onError)
    }
    let onError = function(reason) {
      $scope.error = "Error: could not get data";
    }
    $scope.reponame = $routeParams.reponame;
    $scope.username = $routeParams.username;
   
	github.getRepoFromName($scope.username,$scope.reponame)
	.then(onDataRecieved,onError);
	
  }
  app.controller('repocontroller', ["$scope", "github", "$routeParams", "$location", "pager", contributor]);
}());