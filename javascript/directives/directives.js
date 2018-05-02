(function () {
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
})();