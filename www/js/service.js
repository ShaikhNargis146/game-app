myApp = angular.module('starter.service', [])
var adminurl = "http://192.168.1.134:1337/api/";
// var adminUUU = "http://192.168.1.127:1338"  //
var adminUUU = "http://192.168.1.134:1338"  

var url = adminUUU + '/api/';
io.sails.url = adminUUU;
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
myApp.factory('Service', function ($http, $ionicLoading, $timeout, $ionicActionSheet) {
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



    //from teenpatti 

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
      console.log(dataPlayer, "dataPlayer")
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
      $http.post(url + 'Player/makeSeen', {
        data: data
      }).then(callback);
    },




    getByPlrNo: function (data, callback) {
      $http.post(url + 'Player/getByPlrNo', {
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
        data: data
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


  }
});
