var app = angular.module('storeApp', ['ngRoute', 'storeServices']);
app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'plant-list.html',
        controller: 'thumbnailCtrl'
    }).
    when('/info', {
        templateUrl: 'plant-list.html',
        controller: 'thumbnailCtrl'
    }).
    when('/shop-plant', {
        templateUrl: 'plant-list.html',
        controller: 'thumbnailCtrl'
    }).
    when('/:plantId', {
        templateUrl: 'plant-detail.html',
        controller: 'plantDetailCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
});
app.controller('globalCtrl', function($scope) {
    //localStorage.clear();
    $scope.buy = {};
    $scope.wish = {};
    if(localStorage.getItem('buyNo')) {
        $scope.buy.num = parseInt(localStorage.getItem('buyNo'));
    } else {
        $scope.buy.num = 0;
        localStorage.setItem('buyNo', $scope.buy.num);
    }
    if(localStorage.getItem('wishNo')) {
        $scope.wish.num = parseInt(localStorage.getItem('wishNo'));
    } else {
        $scope.wish.num = 0;
        localStorage.setItem('wishNo', $scope.wish.num);
    }
});
app.controller('navCtrl', function($scope, $window, $location, $anchorScroll) {
    $scope.isHide = true;
    angular.element($window).bind('scroll', function() {
        if(this.pageYOffset >= 770) {
            $scope.isHide = false;
        } else {
            $scope.isHide = true;
        }
        $scope.$apply();
    });
    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    };
});
app.controller('shopCtrl', function($scope) {
    $scope.obj = {
        flag: false
    };
    $scope.check = function() {
        return $scope.obj.flag;
    }
});
app.controller('thumbnailCtrl', function($scope, plants) {
    plants.listPlants(function(plants) {
        $scope.plants = plants;
    }); 
});
app.controller('plantDetailCtrl', function($scope, $routeParams, plants, reviews) {
    $scope.thisId = $routeParams.plantId
    plants.findPlant($routeParams.plantId, function(plant) {
        $scope.plant = plant;
        $scope.id = $scope.plant.id;
        $scope.thisId.id = $scope.id;
        $scope.mainImg = { url: $scope.plant.imgURL.mainURL };
    });
    plants.count(function(num) {
        $scope.num = num;
    });
    $scope.obj.flag = true;
    $scope.buyAug = function(){
        $scope.buy.num++;
        localStorage.setItem('buyNo', $scope.buy.num);
        var key = "buy_" + $scope.thisId;
        if(localStorage.getItem(key)) {
            var temp = JSON.parse(localStorage.getItem(key));
            temp.num++;
            localStorage.setItem(key, JSON.stringify(temp));
        } else {
            var temp = {id: $scope.thisId, num: 1};
            localStorage.setItem(key, JSON.stringify(temp));
        }
    };
    $scope.wishAug = function() {
        $scope.wish.num++;
        localStorage.setItem('wishNo', $scope.wish.num);
        var key = "wish_" + $scope.thisId;
        if(localStorage.getItem(key)) {
            var temp = JSON.parse(localStorage.getItem(key));
            temp.num++;
            localStorage.setItem(key, JSON.stringify(temp));
        } else {
            var temp = {id: $scope.thisId, num: 1};
            localStorage.setItem(key, JSON.stringify(temp));
        }
    };
});
app.controller('panelCtrl', function($scope) {
    $scope.tab = 1;
    $scope.selectTab = function(tab) {
        $scope.tab = tab;
    };
    $scope.isSelected = function(tab) {
        return $scope.tab === tab;
    };
});
app.controller('reviewCtrl', function($scope, reviews) {
    $scope.reviews;
    $scope.review = {};
    reviews.listReviews($scope.thisId).then(function(response) {
        $scope.reviews = response.data;
    });
    $scope.addReview = function(review) {
        $scope.reviews.push(review);
        $scope.review = {};
    };
});
app.directive('myPlants', ['plants', function(plants) {
    return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
            var description = angular.element(elem.children().children().children()[1]);
            var id = angular.element(elem.children().children().children()[1]);
            var height = 50 + 300 * Math.random();
            description.css('height', height+'px');
        }
    };
}]);