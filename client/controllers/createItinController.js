angular
  .module('solo.createItinController', ['ngRoute', 'ngMap', 'solo.ItinFactory'])
  .controller('createItinController', createItinController);

function createItinController($scope, $location, ItinFactory, $http) {
  //HOLDS ALL STOPS ADDED TO ITINERARY
  $scope.stops = []
  //ADDSTOP LETS YOU ADD ADDITIONAL STOPS ON THE ITINERARY
  ///$scope.location needs to be defined
  $scope.addStop= function(){
    $scope.stops.push({placeName: $scope.placeName , location: $scope.location , description: $scope.description, stopNumber: $scope.stops.length + 1 })
  }
 
  //REMOVESTOP LETS YOU REMOVE A STOP ON THE ITINERARY
  $scope.removeStop = function(i){
    console.log('remove at: ', i);
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
      $scope.author,
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
        console.log(data);
        $scope.authorZip = data.results[0].formatted_address.slice(-10).slice(0,5);
        console.log($scope.authorZip)
      });
  };

  //GETLOCATION ALLOWS US TO GET THE CURRENT POSITION OF THE USER AS WELL AS CREATE THE authorZip FROM GEOLOCATION
   $scope.getLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyDRjb5435OyNsX2BO4QM7vR-84vvUuzTBM').success(function (data) {
          $scope.authorLocation= data.results[0].formatted_address;
          $scope.authorZip= data.results[0].formatted_address.slice(-10).slice(0,5);
          console.log($scope.authorZip)
        });
        // console.log(addressObj)        
        $scope.location = position.coords.latitude + ", " + position.coords.longitude;
        //  console.log($scope.location)
      });
    }
    console.log("Running get Location")
  };
}
