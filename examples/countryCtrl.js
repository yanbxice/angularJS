var app = angular.module('controllerModule', []);
app.controller('CountryListCtrl', ['$scope', 'Countries', function($scope, Countries) {
        Countries.list(function(countries) {
          $scope.countries = countries;
        });
      }]);
      app.controller('CountryDetailCtrl', function ($scope, $routeParams, Countries){
        Countries.find($routeParams.countryId, function(country) {
          $scope.country = country;
        });
      });