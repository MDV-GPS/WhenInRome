angular
  .module('ParamsFactory', [])
  .factory('ParamsFactory', [paramsFactory]);

  function paramsFactory(){
    return {
      params: 'no params yet'
    };
  }
