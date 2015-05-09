angular.module('directiveModule', []).directive('country', function() {
        return {
          scope: {
            country: '='
          },
          restrict: 'A',
          templateUrl: 'country.html',
          controller: function($scope, Countries) {
            Countries.find($scope.country.id, function(country) {
              $scope.flagURL = country.flagURL
            });
          }
        };
      });