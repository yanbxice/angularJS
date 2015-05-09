var app = angular.module('storeServices', []);
app.factory('plants', function($http) {
    function getData(callback) {
        $http({
            method: 'GET',
            url: 'json/plants.json',
            cache: false
        }).success(callback);
    }
    return {
        listPlants: getData,
        findPlant: function(id, callback) {
            getData(function(data) {    
                var plant = data.filter(function(entry){
                    return entry.id == id;
                })[0];
                callback(plant);
            });
        },
        count: function(callback) {
            getData(function(data) {
                var num = data.length;
                callback(num);
            });
        },
        listBuy: function(myMap, callback) {
            getData(function(data) {
                var plants = data.filter(function(entry) {
                    return myMap.has(entry.id.toString());
                });
                callback(plants);
            });
        }
    };
});
app.factory('reviews', function($http) {
    return {
        listReviews: function(id) {
            return $http.get('json/plant-' + id + '.json');
        }
    };
});