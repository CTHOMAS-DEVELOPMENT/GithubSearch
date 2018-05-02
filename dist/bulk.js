(function () {
	var app = angular.module('search', ["ngRoute"]);

	app.config(function ($routeProvider) {
		$routeProvider.when("/main", {
			templateUrl: "templates/main.html",
			controller: "maincontroller"
		}).when("/main/:error", {
			templateUrl: "templates/main.html",
			controller: "maincontroller"
		}).when("/user/:username", {
			templateUrl: "templates/user.html",
			controller: "usercontroller"
		}).when("/repo/:username/:reponame", {
			templateUrl: "templates/repo.html",
			controller: "repocontroller"
		}).otherwise({ redirectTo: "/main" });
	});
})();;(function () {
	var app = angular.module('search');

	var main = function main($scope, $location, github, $routeParams) {

		$scope.search = function (search) {
			$location.path("/user/" + search);
		};
		if (!github.getSearches()) {
			github.putSearches(github.getCommonSearches());
		}
		$scope.deleteSearches = function () {
			//re-initialise
			github.deleteSearches();
			$scope.newSearches = github.anyNewSearches();
			$scope.developments = github.getSearches();
			$scope.error = "";
			$scope.username = "";
		};

		$scope.developments = github.getSearches();
		$scope.username = "angular";
		$scope.error = $routeParams.error ? $routeParams.error : "";
		$scope.newSearches = github.anyNewSearches();
	};
	app.controller('maincontroller', ["$scope", "$location", "github", "$routeParams", main]);
})();;(function () {
  var app = angular.module('search');
  var contributor = function contributor($scope, github, $routeParams, $location, pager) {
    $scope.pager = {};
    $scope.setPage = function (page) {
      if (page < 1 || page > pager.totalPages) {
        return;
      }
      $scope.pager = pager.GetPager($scope.contributors.length, page, 4);
      $scope.pager.items = $scope.contributors.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    };
    var onFirstData = function onFirstData(data) {
      $scope.contributors = data;
      $scope.pager = pager.GetPager($scope.contributors.length, 1, 4);

      // get current page of items
      $scope.pager.items = $scope.contributors.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    };
    $scope.returntosearch = function () {
      $location.path("/main/Returned from the " + $scope.username + " development after investigating the " + $scope.reponame + " branch.");
    };
    var onDataRecieved = function onDataRecieved(data) {

      $scope.repositoryname = data.name;
      $scope.issues = data.open_issues_count;

      github.getDetail(data.contributors_url).then(onFirstData, onError);
    };
    var onError = function onError(reason) {
      $scope.error = "Error: could not get data";
    };
    $scope.reponame = $routeParams.reponame;
    $scope.username = $routeParams.username;

    github.getRepoFromName($scope.username, $scope.reponame).then(onDataRecieved, onError);
  };
  app.controller('repocontroller', ["$scope", "github", "$routeParams", "$location", "pager", contributor]);
})();;(function () {
	var app = angular.module('search');
	var user = function user($scope, github, $location, $routeParams, pager) {

		$scope.pager = {};
		$scope.setPage = function (page) {
			if (page < 1 || page > pager.totalPages) {
				return;
			}
			$scope.pager = pager.GetPager($scope.repos.length, page);

			// get current page of items
			$scope.pager.items = $scope.repos.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
		};
		var onFirstData = function onFirstData(data) {
			$scope.repos = data;
			$scope.pager = pager.GetPager($scope.repos.length, 1);

			// get current page of items
			$scope.pager.items = $scope.repos.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
		};
		var onDataRecieved = function onDataRecieved(data) {
			$scope.person.user = data;
			//update store	
			github.addToSearches($routeParams.username);
			github.getDetail($scope.person.user.repos_url).then(onFirstData);
		};
		$scope.returntosearch = function () {
			$location.path("/main/Saved the search for " + $routeParams.username);
		};
		var onError = function onError(reason) {
			$scope.error = "Error: " + reason.status + " (" + reason.statusText + "). There is no development called " + $scope.username + ".";
			$location.path("/main/" + $scope.error);
		};
		$scope.username = $routeParams.username;
		$scope.repossortorder = '-stargazers_count';
		$scope.person = {};

		github.getUser($scope.username).then(onDataRecieved, onError);
	};
	app.controller('usercontroller', ["$scope", "github", "$location", "$routeParams", "pager", user]);
})();;(function () {
	var focuson = function focuson($timeout) {
		return {
			restrict: 'AC',
			link: function link(_scope, _element) {
				$timeout(function () {
					_element[0].focus();
					_element[0].select();
				}, 0);
			}
		};
	};
	var app = angular.module("search");
	app.directive("autoFocus", focuson);
})();;(function () {

	var capitalize = function capitalize() {
		return function (input) {
			return !!input ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		};
	};
	var app = angular.module("search");
	app.filter('capitalize', capitalize);
})();;(function () {
    var PagerService = function PagerService() {
        // service definition
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 10;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage = void 0,
                endPage = void 0;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control
            var pages = _.range(startPage, endPage + 1);

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    };
    var app = angular.module("search");
    app.factory("pager", PagerService);
})();;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
	angular.module("search").factory("github", function ($http) {
		var _ref;

		var commonsearches = "jQuery,Ember,CTHOMAS-DEVELOPMENT";
		var getCommonSearches = function getCommonSearches() {
			return commonsearches;
		};
		var getUser = function getUser(name) {
			return $http.get("https://api.github.com/users/" + name).then(function (response) {
				return response.data;
			});
		};

		var getRepoFromName = function getRepoFromName(user, name) {
			return $http.get("https://api.github.com/repos/" + user + "/" + name).then(function (response) {
				return response.data;
			});
		};
		var getDetail = function getDetail(repos_url) {
			return $http.get(repos_url).then(function (response) {
				return response.data;
			});
		};
		var getSearches = function getSearches() {
			var searchlist = localStorage.getItem('searchlist');
			if (searchlist === null && (typeof searchlist === "undefined" ? "undefined" : _typeof(searchlist)) === "object" || !searchlist) {
				return null;
			}
			return localStorage.getItem('searchlist').split(",");
		};
		var putSearches = function putSearches(str) {
			localStorage.setItem('searchlist', str);
		};
		var addToSearches = function addToSearches(user) {
			var allSearches = localStorage.getItem('searchlist');
			if (allSearches.indexOf(user) === -1) {
				allSearches = allSearches + "," + user;
				putSearches(allSearches);
			}
		};
		var deleteSearches = function deleteSearches() {
			localStorage.setItem('searchlist', getCommonSearches());
		};
		var anyNewSearches = function anyNewSearches() {
			return localStorage.getItem('searchlist') === getCommonSearches();
		};
		return _ref = {
			getUser: getUser,
			getDetail: getDetail,
			getRepoFromName: getRepoFromName,
			getCommonSearches: getCommonSearches,
			anyNewSearches: anyNewSearches,
			getSearches: getSearches,
			putSearches: putSearches,
			addToSearches: addToSearches }, _defineProperty(_ref, "addToSearches", addToSearches), _defineProperty(_ref, "deleteSearches", deleteSearches), _defineProperty(_ref, "deleteSearches", deleteSearches), _ref;
	});
})();