angular
  .module('HttpFactory', [])
  .factory('HttpFactory', [ '$http', 'UserFactory', httpFactory]);

  function httpFactory(UserFactory){
    let service = {};

    service.userValid = (userFields) =>{
      http.post('/user/valid', userFields);
    };

    service.userCreate = (userFields) =>{
      http.post('/user/create', userFields);
    };
  }
