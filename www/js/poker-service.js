var maxRow = 10;
myApp.factory('pokerService', function ($http, $ionicLoading, $ionicActionSheet, $timeout, $state, $filter) {
  var obj1 = {
    getAllTable: function (callback) {
      return $http.get(adminPoker + '/api/Table/getAllTable').then(function (data) {
        data = data.data;
        callback(data);
      });
    },
    savePlayerToTable: function (dataPlayer, callback) {
      console.log("dataPlayer", dataPlayer);
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http.post(adminPoker + '/api/Table/addUserToTable', {
          playerNo: dataPlayer.playerNo,
          tableId: dataPlayer.tableId,
          amount: dataPlayer.amount,
          autoRebuy: dataPlayer.autoRebuy,
          payBigBlind: dataPlayer.payBigBlind,
          socketId: socketId,
          accessToken: accessToken
        }, ).then(function (data) {
          callback(data);
        });
      }
    },
    getOneTableDetails: function (data, callback) {
      return $http.post(adminPoker + "/api/Player/getAllDetails", {
        tableId: data
      }).then(function (data) {
        data = data.data;
        callback(data);
      })
    },
    removePlayer: function (tableId, playerNo, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http.post(adminPoker + '/api/Table/removePlayer', {
          tableId: tableId,
          playerNo: playerNo,
          accessToken: accessToken
        }).then(function (data) {
          console.log('delete player', data.data);
          callback(data);
        });
      }
    },
    fold: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminPoker + '/api/Player/fold', {
          tableId: tableId,
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    allIn: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminPoker + '/api/Player/allIn', {
          tableId: tableId,
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    check: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminPoker + '/api/Player/check', {
          tableId: tableId,
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    call: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminPoker + '/api/Player/call', {
          tableId: tableId,
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    raise: function (tableId, raiseAmount, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminPoker + '/api/Player/raise', {
          tableId: tableId,
          accessToken: accessToken,
          amount: raiseAmount
        }).then(function (data) {
          callback(data);
        });
      }
    },
    getReFillBuyIn: function (data, callback) {
      console.log("autobuyin", data);
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminPoker + '/api/Player/reFillBuyIn', {
          accessToken: accessToken,
          tableId: data.tableId,
          amount: data.amount
        }).then(function (data) {
          callback(data);
        });
      }
    },
    newGame: function (tableId, callback) {
      var isDealer = "true"
      $http.post(adminPoker + '/api/Player/newGame', {
        tableId: tableId,
        isDealer: isDealer
      }).then(function (data) {
        callback(data);
      });
    },
  };

  return obj1;
});
