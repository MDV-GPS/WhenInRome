angular
  .module('solo.feedController', ['ngRoute', 'solo.ItinFactory', 'ParamsFactory', 'HttpFactory'])
  .controller('feedController', feedController);

function feedController($scope, ItinFactory, ParamsFactory, HttpFactory) {


//setting scope to ItinFactory's currentItins. Giving us access to that array of itineraries
//$scope.currentItins = service.getItineraries

if (ParamsFactory.params !== {}){
	HttpFactory.getItineraries(ParamsFactory.params).then(function(data){
		console.log("data!!!!!!!!!",data);
		$scope.currentItins = data;
		
		

})
}

//$scope.searchZip = ItinFactory.searchZip;
//$scope.searchCity = ParamsFactory.name;

//logging searchZip
console.log('searchZip', $scope.searchZip);
console.log('itins',$scope.currentItins);
console.log(ItinFactory)



}
