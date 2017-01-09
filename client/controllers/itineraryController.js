angular
  .module('ItineraryController', ['ngRoute', 'HttpFactory'])
  .controller('ItineraryController', ['$scope', '$window', 'HttpFactory', itineraryController]);

  function itineraryController($scope, $window, HttpFactory){
    HttpFactory.getItinerary(ParamFactory.params.itineraryName)
}
