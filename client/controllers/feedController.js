angular
  .module('solo.feedController', ['ngRoute', 'solo.ItinFactory', 'ParamsFactory', 'ProfileFactory', 'UserFactory'])
  .controller('feedController', feedController);

function feedController($scope, ItinFactory, ParamsFactory, ProfileFactory, UserFactory) {
  $scope.username = UserFactory.username;
  $scope.menuStyle = '';

	// let params = ParamsFactory.params;
	// if (params.type === 'zip'){
	// 	return httpFactory.getItineraries({'type':'zip', 'code': params.code})

	// }
	// else if (params.type === 'city'){
	// 	return httpFactory.getItineraries({'type': 'city', 'name': params.name})
	// }

	// else if (params.type === )

//setting scope to ItinFactory's currentItins. Giving us access to that array of itineraries
$scope.currentItins = ItinFactory.currentItins;
$scope.searchZip = ItinFactory.searchZip;

//logging searchZip
console.log('searchZip', $scope.searchZip);
console.log('itins',$scope.currentItins);
console.log(ItinFactory)

$scope.gotoMyItineraries = ProfileFactory.gotoMyItineraries;
$scope.gotoFavorites = ProfileFactory.gotoFavorites;
$scope.gotoFriends = ProfileFactory.gotoFriends;
$scope.logout = ProfileFactory.logout;

$scope.gotoItinerary = (itinerary) =>{
  ParamsFactory.params = {type: 'city', name: itinerary};
  $window.location.href = '#/itinerary';
}

$scope.clickDelegation = (event) =>{
  if(event.target.className.indexOf('profile') === -1){
    $scope.menuStyle = '';
  }
};

$scope.openProfile = () =>{
  if($scope.menuStyle === ''){
    $scope.menuStyle = 'openMenu';
  }else{
    $scope.menuStyle = '';
  }
};

}
