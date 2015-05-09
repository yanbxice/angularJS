angular.module('factoryModule', []).factory('Countries', ['$http', function($http) {
        /*function getData(callback) {
          $http({
            method: 'GET',
            url: 'countries.json',
            cache: true
          }).success(callback);
        }*/
        return {
          list: function(callback) {
            $http({
              method: 'GET',
              url: 'countries.json',
              cache: true
            }).success(callback);
          },
          /*find: function(name, callback){
            getData(function(data) {
              var country = data.filter(function(entry){
                return entry.name === name;
              })[0];
              callback(country);
            });*/
          find: function(id, callback) {
            $http({
              method: 'GET',
              url: 'country_' + id + '.json',
              cache: true
            }).success(callback);
          }
        };
      }]);