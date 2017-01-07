angular
  .module('solo.loginController', ['ngRoute', 'HttpFactory'])//will need http factory to work
  .controller('loginController', ['$scope', '$window', 'HttpFactory', loginController]);

  function loginController($scope, $window, HttpFactory){

  	// $scope.dummy = function(){
  	// 	//$window.location.href = '#/home'
  	// 	console.log($scope.username, $scope.password)
  	// }

  	// $scope.funny = function(){
  	// 	console.log($scope.createUsername, $scope.createPassword, $scope.createZipcode, $scope.createInterest)

  	// }

  	$scope.loginFunc = function(){
  		HttpFactory.userValid($scope.username, $scope.password).then(
  			function(data){
  				if (data){
  					$window.location.href = '#/home'
  				}
  				else{
  					alert("Sorry, didnt work. Try creating an account!")
  				}
  			}
  		)

  	};
  	$scope.signupFunc = function(){
  		HttpFactory.userCreate($scope.createUsername, $scope.createPassword, $scope.createZipcode, $scope.createInterest).then(

  			function(data){
  				if (data){
  					$window.location.href = '#/home'
  				}
  				else{
  					alert("try again")
  				}
  			}

  		)

  	}


  }
