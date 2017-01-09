angular
  .module('solo.feedController', ['ngRoute', 'solo.ItinFactory'])
  .controller('feedController', feedController);

function feedController($scope, ItinFactory, $animate) {

//setting scope to ItinFactory's currentItins. Giving us access to that array of itineraries
$scope.currentItins = ItinFactory.currentItins;
$scope.searchZip = ItinFactory.searchZip;

//logging searchZip
console.log('searchZip', $scope.searchZip);
console.log('itins',$scope.currentItins);
console.log(ItinFactory)



}
