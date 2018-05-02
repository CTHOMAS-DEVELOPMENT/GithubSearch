/****
Controller testing
****/
describe('Github search application tests', function () {
	var $scope, $controller, $httpBackend, $location, $routeParams, github;


	beforeEach(() => {
		module('search');
	});
	beforeEach( inject( function( _$rootScope_,_$location_, _$routeParams_,_$controller_ ) {
        $scope = _$rootScope_.$new();
		$location=_$location_;
		$routeParams=_$routeParams_;
		angular.mock.inject(function ($injector) {
		$httpBackend = $injector.get('$httpBackend');
		});
		github = { id: 4 };  // Variable initialized above.

        $controller = _$controller_( 'maincontroller', {
            $scope: $scope,
            $location: $location,
            injectedThing: github,
            $routeParams: $routeParams
        } );
		
		
   }));
      describe( 'initialization', function() {

        it( 'Initializes status on scope', function() {
            expect( $scope.username ).toBe( "angular" );
			expect( $scope.developments ).toEqual( ['jQuery','Ember','CTHOMAS-DEVELOPMENT'] );
        } );
	  });
  


	});
/****
Services testing
****/	
	describe( 'Github services tests', function() {
		var sampleSvcObj;
		beforeEach(function(){
			module(function($provide){

			});
			module('search');
		});
		beforeEach(inject(function(github){
			sampleSvcObj=github;
		}));
        it( 'Check default searches', function() {
            expect(sampleSvcObj.getCommonSearches()).toEqual("jQuery,Ember,CTHOMAS-DEVELOPMENT");
        });
		it( 'Check searches list status', function() {
			expect(sampleSvcObj.anyNewSearches()).toBe(true);
		});
	  });
	describe( 'Pager services tests', function() {
		var samplePagerObj;
		beforeEach(function(){
			module(function($provide){

			});
			module('search');
		});
		beforeEach(inject(function(pager){
			samplePagerObj=pager;
		}));
        it( 'Check pager service initialization', function() {
			 expect(typeof samplePagerObj).toEqual('object');
			 
        });
	  });	  
	  


