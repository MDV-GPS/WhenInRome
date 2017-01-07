angular
  .module('solo.createItinController', ['ngRoute', 'ngMap', 'solo.ItinFactory'])
  .controller('createItinController', ['$scope', '$location', '$http', 'ItinFactory', 'UserFactory', createItinController]);

function createItinController($scope, $location, $http, ItinFactory, UserFactory) {
  //HOLDS ALL STOPS ADDED TO ITINERARY
  $scope.stops = []
  //ADDSTOP LETS YOU ADD ADDITIONAL STOPS ON THE ITINERARY
  ///$scope.location needs to be defined
  $scope.addStop= function(){
    const location = $scope.placeName.substr($scope.placeName.indexOf(', ') + 2);
    const title = $scope.placeName.slice(0, $scope.placeName.indexOf(', '));
    $scope.stops.push({
      placeName: title,
      location: location,
      description: $scope.description,
      stopNumber: $scope.stops.length + 1
    });
    console.log($scope.stops);
  }
 
  //REMOVESTOP LETS YOU REMOVE A STOP ON THE ITINERARY
  $scope.removeStop = function(i){
    $scope.stops.splice(i, 1);
  }

  //UPDATESCOPE SETS THE SCOPE FROM NG-CHANGE INPUTS IN THE CREATEITN.HTML FILE
  $scope.updateScope = function(inputName, inputValue){
    $scope[inputName] = inputValue;
   // console.log($scope[inputName])
  }

  //SAVE RUNS THE POST FUNCTION IN ItinFactory
  $scope.save = function () {
    ItinFactory.post(
      $scope.title,
      UserFactory.username,
      $scope.authorLocation,
      $scope.authorZip,
      $scope.stops
    ).success(function() {
       alert('Itinerary Created!!!')
    })
  }

  //SEARCHLOCATION IS MOSTLY USED TO CREATE authorZip WHICH IS REQUIRED TO FILTER THROUGH THE DATABASE FOR THE ZIPCODE
   $scope.searchLocation = function (x) {
     $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + x + '&key=AIzaSyDRjb5435OyNsX2BO4QM7vR-84vvUuzTBM')
      .success(function (data) {
        if(data.results.length) {
          return data.results[0].geometry.location;
          zip = data.results[0].formatted_address.slice(-10).slice(0,5); 
        } else {
          return data.results[0].geometry.location;
        }
      });
  };

  //GETLOCATION ALLOWS US TO GET THE CURRENT POSITION OF THE USER AS WELL AS CREATE THE authorZip FROM GEOLOCATION
   $scope.getLocation = function (loc) {
    if (loc === 'nav') {
      navigator.geolocation.getCurrentPosition(function (position) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyDRjb5435OyNsX2BO4QM7vR-84vvUuzTBM').success(function (data) {
          $scope.authorLocation= data.results[0].formatted_address;
          $scope.authorZip= data.results[0].formatted_address.slice(-10).slice(0,5);
          $scope.authorCoords = position.coords.latitude + ", " + position.coords.longitude;
        });
      });
    } else {
      
    }
  };
}
