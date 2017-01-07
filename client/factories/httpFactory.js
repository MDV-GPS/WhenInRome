angular
  .module('HttpFactory', [])
  .factory('HttpFactory', ['$http', 'UserFactory', httpFactory]);

  function httpFactory(http, UserFactory){
    let service = {};

    service.userValid = (username, password) =>{
      return http.post('/user/valid', {username: username, password: password});
    };

    service.userCreate = (username, password, zip, interest) =>{
      return http.post('/user/create', {username: username, password: password, zip: zip, interest: interest});
    };

    return service;
  }
