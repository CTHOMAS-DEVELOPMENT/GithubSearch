(function () {

	var capitalize = function capitalize() {
		return function (input) {
			return !!input ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		};
	};
	var app = angular.module("search");
	app.filter('capitalize', capitalize);
})();