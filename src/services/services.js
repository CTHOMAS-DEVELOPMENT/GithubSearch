(
function(){
	angular.module("search").factory("github",function($http)
	{
		const commonsearches="jQuery,Ember,CTHOMAS-DEVELOPMENT";
		let getCommonSearches=function()
		{
			return commonsearches;
		}
		let getUser=function(name)
		{
			return $http.get("https://api.github.com/users/" + name)
			.then( function(response){ return response.data; });
		};		

		let getRepoFromName=function(user,name)
		{
			return $http.get("https://api.github.com/repos/"+user+"/" + name)
			.then( function(response){ return response.data; });
		};
		let getDetail=function(repos_url)
		{
			return $http.get(repos_url)
			.then( function(response){ return response.data; });
		};
		let getSearches=function()
		{
			let searchlist=localStorage.getItem('searchlist');
			if((searchlist === null && typeof searchlist === "object")|| !searchlist)
			{
				return null;
			}
			return localStorage.getItem('searchlist').split(",");			
		}
		let putSearches=function(str)
		{
			localStorage.setItem('searchlist', str);
		}
		let addToSearches=function(user)
		{
			let allSearches=localStorage.getItem('searchlist');
			if(allSearches.indexOf(user)===-1)
			{
				allSearches=allSearches+","+user;
				putSearches(allSearches);				
			}
		}
		let deleteSearches=function()
		{
			localStorage.setItem('searchlist', getCommonSearches());
		}
		let anyNewSearches=function()
		{
			return localStorage.getItem('searchlist')===getCommonSearches();
		}
		return {
			getUser:getUser,
			getDetail:getDetail,
			getRepoFromName:getRepoFromName,
			getCommonSearches:getCommonSearches,
			anyNewSearches:anyNewSearches,
			getSearches:getSearches,
			putSearches:putSearches,
			addToSearches,addToSearches,
			deleteSearches,deleteSearches
			
		}
		
	});
}()
)