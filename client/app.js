
const app = angular
  .module('myApp', ['ngRoute', 'solo.HomeController','solo.feedController', 'solo.ItinFactory', 'solo.createItinController']);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
      .when('/', {
      templateUrl: './partials/home.html',
      controller: 'HomeController',
    })
      .when('/feed', {
      templateUrl: './partials/feed.html',
      controller: 'feedController',
    })
      .when('/home', {
      templateUrl: './partials/home.html',
      controller: 'HomeController',
    })
      .when('/createItin', {
        templateUrl: './partials/createItin.html',
        controller: 'createItinController',
      })

}
