angular
  .module('UserFactory', ['UserFactory'])
  .factory('UserFactory', [UserFactory]);

  function UserFactory(){
    return {
      username: 'dhani',
      password: 'default',
      zip: '90000',
      interest: 'Bakersfield'
    }
  }
