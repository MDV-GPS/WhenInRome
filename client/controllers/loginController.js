angular
  .module('solo.loginController', ['ngRoute'])//will need http factory to work
  .controller('loginController', loginController);

  function loginController($scope, $window){

  	// $scope.dummy = function(){
  	// 	//$window.location.href = '#/home'
  	// 	console.log($scope.username, $scope.password)
  	// }

  	// $scope.funny = function(){
  	// 	console.log($scope.createUsername, $scope.createPassword, $scope.createZipcode, $scope.createInterest)

  	// }
  	
  	$scope.loginFunc = function(){
  		$Http.userValid($scope.username, $scope.password).then(
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
  		$Http.createUser($scope.createUsername, $scope.createPassword, $scope.createZipcode, $scope.createInterest).then(

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