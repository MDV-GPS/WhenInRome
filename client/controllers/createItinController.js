angular
  .module('solo.createItinController', ['ngRoute', 'ngMap', 'solo.ItinFactory'])
  .controller('createItinController', ['$scope', '$location', '$http', 'ItinFactory', 'UserFactory', 'ProfileFactory', createItinController]);

function createItinController($scope, $location, $http, ItinFactory, UserFactory, ProfileFactory) {
  $scope.username = UserFactory.username;
  $scope.menuStyle = '';
  //HOLDS ALL STOPS ADDED TO ITINERARY
  $scope.stops = [];

  //ADDSTOP LETS YOU ADD ADDITIONAL STOPS ON THE ITINERARY
  $scope.addStop = function () {
    $http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + $scope.placeName + '&key=AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig')
      .success(function (data) {
        $scope.location = data.results[0].formatted_address;
      })
      .then(function () {
        const title = $scope.placeName.slice(0, $scope.placeName.indexOf(', '));
        $scope.stops.push({
          placeName: title,
          location: $scope.location,
          description: $scope.description,
          stopNumber: $scope.stops.length + 1
        });
      })
      .then(function () {
        $scope.placeName = '';
        $scope.description = '';
      })
  };

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

  //GETLOCATION ALLOWS US TO GET THE CURRENT POSITION OF THE USER AS WELL AS CREATE THE authorZip FROM GEOLOCATION
  $scope.getLocation = function (loc, x) {
    if (loc === 'cur') {
      navigator.geolocation.getCurrentPosition(function (position) {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig')
        .success(function (data) {
          $scope.authorLocation= data.results[0].formatted_address;
          $scope.authorZip= data.results[0].formatted_address.slice(-10).slice(0,5);
          $scope.authorCoords = position.coords.latitude + ", " + position.coords.longitude;
        });
      });
    } else {
      $http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + x + '&key=AIzaSyD5p6W-TtJzphQvH7dRLKyB968SiTXHxig')
      .success(function (data) {
        $scope.authorLocation = data.results[0].formatted_address;
        $scope.authorZip = data.results[0].formatted_address.slice(-10).slice(0, 5);
        $scope.authorCoords = data.results[0].geometry.location.lat + ", " + data.results[0].geometry.location.lng;
      });
    }
  }

  $scope.gotoMyItineraries = ProfileFactory.gotoMyItineraries;
  $scope.gotoFavorites = ProfileFactory.gotoFavorites;
  $scope.gotoFriends = ProfileFactory.gotoFriends;
  $scope.logout = ProfileFactory.logout;

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
