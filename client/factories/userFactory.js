angular
  .module('UserFactory', ['UserFactory'])
  .factory('UserFactory', [userFactory]);

  function userFactory(){
    return {
      username: 'Local',
      password: 'default',
      zip: '90000',
      interest: 'Bakersfield'
    }
  }
