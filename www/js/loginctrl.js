myApp.controller("LoginCtrl",function($scope,Service,$state){
console.log("login controller");
$scope.invalidUser=false;
$scope.playerLogin = function (data,login) {
    console.log("in player login")
            Service.playerLogin(data, function (data) {
                console.log("dataaaaa",data);
                if (data.value) {
                    console.log("player exist....");
                    $.jStorage.set("player", data.data);
                    $scope.playerData = $.jStorage.get("player");
                    $scope.data.playerData = $scope.playerData;
                     Service.sendAccessToken($scope.data, function (data) {
                                console.log("login completed");
                                $state.go("lobby");
                            })
                } else {
                    console.log("Invalid credentials");
                    if(!login.$invalid){
                        $scope.invalidUser=true;
                    }
                    console.log(login)
                }
            })
        }
  
    });