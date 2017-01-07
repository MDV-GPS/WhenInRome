
const app = angular
  .module('myApp', ['ngRoute', 'solo.HomeController','solo.feedController',
  'solo.ItinFactory', 'solo.createController', 'solo.loginController', 'UserFactory', 'HttpFactory']);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
      .when('/home', {
      templateUrl: './partials/home.html',
      controller: 'HomeController',
    })
      .when('/feed', {
      templateUrl: './partials/feed.html',
      controller: 'feedController',
    })
      
      .when('/createItin', {
        templateUrl: './partials/create.html',
        controller: 'createController',
      })
      .when('/', {
        templateUrl: './partials/login.html',
        controller: 'loginController'
      })

}
