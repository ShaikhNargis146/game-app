myApp = angular.module('starter.service', []);


var url = adminUUU + '/api/';
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
myApp.factory('Service', function ($http, $ionicLoading, $timeout, $ionicActionSheet) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data

  io.socket.on('connect', function (socket) {
    console.log("socket connected");
    socketId = io.socket._raw.id;
    $.jStorage.set("socketId", io.socket._raw.id);

    obj.connectSocket(function () {

    });

  });




  var obj = {
    all: function () {
      return chats;
    },
    getNavigation: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    removeAccessToken: function (data, callback) {
      $.jStorage.flush();
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },



    //from teenpatti backend

    playerLogin: function (data, callback) {
      $http.post(adminurl + 'member/playerLogin', data).then(function (data) {
        data = data.data;
        callback(data);
      });
    },

    passwordchange: function (data, callback) {
      $http.post(adminurl + 'member/changePassword', data).then(function (data) {
        data = data.data;
        callback(data);
      });
    },



    sendAccessToken: function (data, callback) {
      var accessToken = data.data;
      $http.post(adminurl + 'member/getAccessLevel', {
        accessToken: accessToken
      }).then(callback);
    },

    //from teenpatti 




    tableData: function (callback) {
      $http({
        url: url + 'Table/search',
        method: 'POST'
      }).then(callback);
    },

    getOneTable: function (id, callback) {
      $http.post(url + 'Table/getOne', {
        _id: id
      }).then(callback);
    },

    getAllActive: function (data, callback) {
      $http({
        url: url + 'Table/getAllActive',
        method: 'POST',
        data: data
      }).then(callback);
    },
    getAll: function (data, callback) {
      $http({
        url: url + 'Player/getAll',
        method: 'POST',
        data: data
      }).then(callback);
    },
    savePlayerTotable: function (dataPlayer, callback) {
      console.log(dataPlayer, "dataPlayer");
      $http({
        url: url + 'Table/addUserToTable',
        method: 'POST',
        data: dataPlayer
      }).then(callback);
    },

    getOnePlayer: function (id, callback) {
      $http.post(url + 'Player/getOne', {
        _id: id
      }).then(callback);
    },


    makeSeen: function (data, callback) {
      console.log("makeSeen", data);
      $http.post(url + 'Player/makeSeen', {
        "tableId": data.tableId,
        "accessToken": data.accessToken
      }).then(callback);
    },
    chaal: function (data, callback) {
      $http.post(url + 'Player/chaal', {
        "tableId": data.tableId,
        "accessToken": data.accessToken,
        "amount": data.amount
      }).then(callback);
    },
    maketip: function (data, callback) {
      $http.post(url + 'Table/makeTip', {
        "tableId": data.tableId,
        "accessToken": data.accessToken,
        "amount": data.amount
      }).then(callback);
    },
    pack: function (data, callback) {
      $http.post(url + 'Player/fold', {
        "tableId": data.tableId,
        "accessToken": data.accessToken
      }).then(function (data) {
        callback(data);
      });
    },
    sideShow: function (data, callback) {
      console.log(data);
      $http.post(url + 'Player/sideShow', {
        "tableId": data.tableId,
        "accessToken": data.accessToken
      }).then(function (data) {
        callback(data.data);
      });
    },
    doSideShow: function (data, callback) {
      $http.post(url + 'Player/doSideShow', {
        "tableId": data.tableId,
        "accessToken": data.accessToken
      }).then(function (data) {
        callback(data);
      });
    },
    showWinner: function (tableId, callback) {
      console.log(tableId);
      $http.post(url + 'Player/showWinner', {
        "tableId": tableId,
      }).then(function (data) {
        callback(data);
      });

    },
    rejectSideShow: function (data, callback) {
      $http.post(url + 'Player/cancelSideShow', {
        "tableId": data.tableId,
        "accessToken": data.accessToken
      }).then(function (data) {
        callback(data);
      });
    },

    deletePlayer: function (playerdetails, callback) {
      console.log(playerdetails);
      $http.post(url + 'Player/deletePlayer', {
        "tableId": playerdetails.tableId,
        "accessToken": playerdetails.accessToken,
      }).then(callback);
    },
    connectSocket: function (callback) {
      var player = $.jStorage.get("player");
      if (player) {
        var accessToken = player.accessToken;
        $http.post(url + 'Player/updateSocket', {
          accessToken: accessToken,
          socketId: socketId
        }).then(function (data) {
          callback(data);
        });
      }

    },

    getByPlrId: function (data, callback) {
      $http.post(url + 'Player/getByPlrId', {
        data: data
      }).then(callback);
    },

    makeDealer: function (data, callback) {
      $http.post(url + 'Player/makeDealer', {
        data: data
      }).then(callback);
    },

    deductBootAmount: function (data, callback) {
      $http.post(url + 'Player/deductBootAmount', {
        data: data
      }).then(callback);
    },

    serve: function (data, callback) {
      $http.post(url + 'Player/serve', {
        "tableId": data.tableId,
      }).then(callback);
    },

    createPot: function (data, callback) {
      $http.post(url + 'Pot/createPot', {
        data: data
      }).then(callback);
    },

    addAmountToPot: function (data, callback) {
      $http.post(url + 'Pot/addAmountToPot', {
        data: data
      }).then(callback);
    },


  };
  return obj;
});
