var adminurl = "http://192.168.1.129:1337/api/";
var url = "http://192.168.1.134:1338/api/";

var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
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
        $http.post(adminurl + 'member/playerLogin', data).then(function (data) {
          data = data.data;
          callback(data);
        });
      },

      deductBuyInAmount: function (data, callback) {
        $http({
          url: adminurl + 'member/deductBuyInAmount',
          method: 'POST',
          data: data
        }).then(callback);
      },

      sendAccessToken: function (data, callback) {
        $http({
          url: url + 'User/requestSend',
          method: 'POST',
          data: data
        }).then(callback);
      },


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


// savePlayer: function (data, callback) {
//         $http({
//           url: url + '/api/Player/addPlayer',
//           method: 'POST',
//           data: data
//         }).then(callback);
//       },


savePlayerTotable: function (data, callback) {
        $http({
          url: url + 'Table/addUserToTable',
          method: 'POST',
          data: data
        }).then(callback);
      },


      passwordchange: function (data, callback) {
        $http.post(adminurl + 'member/changePassword', data).then(function (data) {
          data = data.data;
          callback(data);
        });
      },



    }
  });
