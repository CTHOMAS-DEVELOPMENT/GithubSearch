(
function(){
	let focuson=function($timeout){
		return {
        restrict: 'AC',
        link: function(_scope, _element) {
				$timeout(function(){
                _element[0].focus();
				_element[0].select();
				}, 0);
			}
		}
	}
	let app=angular.module("search");
	app.directive("autoFocus",focuson);
}()
);



