(
function(){
	
	let capitalize=function() {
		return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	}
		let app=angular.module("search");
		app.filter('capitalize',capitalize);
	}()
)