var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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