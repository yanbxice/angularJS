var bagApp = angular.module('shopBagApp',['storeServices']);
bagApp.controller('globalCtrl', function($scope) {
    $scope.checkoutObj = {num: 0};      // an object indicate how many items selected to check out
    $scope.buy = {};
    $scope.wish = {};
    $scope.buy.num = parseInt(localStorage.getItem('buyNo'));
    $scope.wish.num = parseInt(localStorage.getItem('wishNo'));
});
bagApp.controller('shopItemCtrl', function($scope, plants) {
    var list = [];
    for(var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if(key.substring(0, 4) == "buy_") {
            var listObj = JSON.parse(localStorage.getItem(key));
            list.push(listObj);
        }
    }
    // create a map to store the id-num pairs which make the filter in the following listBuy easier
    var myMap = new Map();
    for(i = 0; i < list.length; i++) {
        myMap.set(list[i].id, list[i].num);
    }
    plants.listBuy(myMap, function(plants) {
        $scope.plants = plants;
    });
    // create an object to store the id-selected pairs to indicate which item(s) should be set "selected"
    $scope.selectedObj = {};
    for(key of myMap.keys()) {
        $scope.selectedObj.id = false;
    }
    var flag = true;
    $scope.selectItem = function($event, id) {
        if(flag && $event.target.nodeName != 'I' && $event.target.nodeName != 'A') {        // if click the add or minus button, the selected style won't be affected
            $scope.selectedObj[id] = true;
            $scope.checkoutObj.num++;
            flag = false;
        } else if(!flag && $event.target.nodeName != 'I' && $event.target.nodeName != 'A') {
            $scope.selectedObj[id] = false;
            $scope.checkoutObj.num--;
            flag = true;
        }
    }
    // called when first load the page or when click the increment/decrement button
    $scope.getNum = function(id) {
        return myMap.get(id.toString());
    };
    // click function for the increment button
    $scope.augItem = function(id) {
        var temp = JSON.parse(localStorage.getItem("buy_" + id));       // get the specific item in local storage
        temp.num++;                                                     // increment its number
        localStorage.setItem("buy_" + id, JSON.stringify(temp));        // reset this item in local storage
        var total = parseInt(localStorage.getItem('buyNo'));
        total++;
        localStorage.setItem("buyNo", total);                           // reset the total number of items
        $scope.buy.num = parseInt(localStorage.getItem('buyNo'));       // update the display in the view
        myMap.set(id.toString(), temp.num.toString());                  // update the map object in order to change the view
    };
    // click function for the decrement button
    $scope.decItem = function(id) {
        var temp = JSON.parse(localStorage.getItem("buy_" + id));
        temp.num--;
        if(temp.num == 0) {                                             // if the number of a particular item is 0, this item shouldn't display
            window.localStorage.removeItem("buy_" + id);                // remove this item from localstorage
            myMap.delete(id.toString());                                // and from the map
            plants.listBuy(myMap, function(plants) {                    // list all items in the shopping bag again
                $scope.plants = plants;
            });
            //console.log(myMap.size());
        } else {
            localStorage.setItem("buy_" + id, JSON.stringify(temp));
            myMap.set(id.toString(), temp.num.toString());
        }
        var total = parseInt(localStorage.getItem('buyNo'));
        total--;
        localStorage.setItem("buyNo", total);
        $scope.buy.num = parseInt(localStorage.getItem('buyNo'));
        
    };
    //console.log($scope.getNum(5));
});
bagApp.controller('checkoutCtrl', function($scope) {
    $scope.danger = false;
    $scope.checkDanger = function() {
        if($scope.checkoutObj.num == 0) {
            $scope.danger = true;
        } else {
            $scope.danger = false;
        }
    };
});