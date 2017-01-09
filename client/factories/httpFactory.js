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

    service.getLandscape = (landscape) =>{
      return http.post('/landscape', {landscape: landscape});
    };

    service.findFriend = (friend) =>{
      return http.post('/findFriend', {friend: friend}).then((result) =>{ return result.data});
    };

    service.addFriend = (friend) =>{
      return http.post('/addFriend', {friend: friend, username: UserFactory.username}).then((result) =>{ return result.data});
    };

    service.getFriends = (username) =>{
      return http.post('/getFriends', {username: username}).then((result) =>{
        return result.data});
    };

    return service;
  }
