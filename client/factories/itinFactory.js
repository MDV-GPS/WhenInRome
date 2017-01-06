
angular
  .module('solo.ItinFactory', ['solo.createItinController'])
  .factory('ItinFactory', ItinFactory);

function ItinFactory($http) {
  return {
    post: function (title, author, authorLocation, authorZip, stops) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/create',
        data: {
        title: title,
        author: author,
        authorLocation:  authorLocation,
        authorZip: authorZip,
        stops: stops
      }
      })
    }
  }
}

