myApp.controller("LoginCtrl",function($scope,Service,$state){
console.log("login controller");

$scope.playerLogin = function (data) {
    console.log("in player login")
            $scope.data = {};
            Service.playerLogin(data, function (data) {
                console.log("dataaaaa",data);
                if (data.value) {
                    console.log("player exist....");
                    $.jStorage.set("player", data.data);
                    $scope.playerData = $.jStorage.get("player");
                    $scope.data.playerData = $scope.playerData;
                    $scope.data.buyInAmt = 2000;
                    Service.deductBuyInAmount($scope.data, function (data) {
                        if (data.data.value) {
                            $scope.data.playerData = data.data.data;
                            Service.sendAccessToken($scope.data, function (data) {
                                console.log("%%%%%%%%%%%%", data);
                                console.log("login completed");
                                $state.go("lobby");
                            })
                        } else {
                            console.log("Insufficient balance");
                        }
                    })
                } else {
                    console.log("Invalid credentials");
                }
            })
        }
  
    });