var adminurl = "http://192.168.1.129:1337";
var url = "http://192.168.1.134:1338";

var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile?file=";
angular.module('starter.service', [])

  .factory('Service', function ($http, $ionicLoading, $timeout, $ionicActionSheet) {
    // Might use a resource here that returns a JSON array

    // Some fake testing data


    return {
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

      playerLogin: function (data, callback) {
        $http.post(adminurl + '/api/member/playerLogin', data).then(function (data) {
          data = data.data;
          callback(data);
        });
      },

      deductBuyInAmount: function (data, callback) {
        $http({
          url: adminurl + '/api/member/deductBuyInAmount',
          method: 'POST',
          data: data
        }).then(callback);
      },

      sendAccessToken: function (data, callback) {
        $http({
          url: url + '/api/User/requestSend',
          method: 'POST',
          data: data
        }).then(callback);
      },





    }
  });
