myApp = angular.module('starter.service', []);
var url = adminUUU + '/api/';
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
var maxRow = 10;
myApp.factory('Service', function ($http, $ionicLoading, $ionicActionSheet, $timeout, $state) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  io.socket.on('connect', function (socket) {
    socketId = io.socket._raw.id;
    $.jStorage.set("socketId", io.socket._raw.id);
    obj.connectSocket(function () {});
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
    playerLogin: function (data, callback) {
      return $http.post(adminurl + 'member/playerLogin', data).then(function (data) {
        data = data.data;
        callback(data);
      });
    },
    playerLogout: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(adminurl + 'member/logout', {
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    passwordchange: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(adminurl + 'member/changePassword', data).then(function (data) {
          data = data.data;
          callback(data);
        });
      }
    },

    sendAccessToken: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        $http.post(adminurl + 'member/getAccessLevel', {
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      } else {
        $state.go("login");
      }
    },
    giveTip: function (data, callback) {
      console.log("give", data);
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        $http.post(url + 'Table/makeTip', {
          "accessToken": accessToken,
          "amount": data.amount
        }).then(function (data) {
          callback(data);
        });
      }
    },
    searchPlayerTransaction: function (memberId, pageNo, callback) {
      if (!pageNo) {
        pageNo = 1;
      }
      // console.log(skip);
      $http.post(adminurl + 'transaction/searchPlayerTransactionData', {
        _id: memberId,
        pageNo: pageNo
      }).then(function (data) {
        if (data.data) {
          var totalCount = data.data.data.total;
          data.data.data.options.maxPage = _.ceil(data.data.data.total / data.data.data.options.count);
          callback(data);
        } else {}
      });
    },


    //from teenpatti 
    tableData: function (pageNo, callback) {
      if (!pageNo) {
        pageNo = 1;
      }
      // console.log(skip);
      $http.post(url + 'Table/search', {
        page: pageNo
      }).then(function (data) {
        if (data.data) {
          var totalCount = data.data.data.total;
          data.data.data.options.maxPage = _.ceil(data.data.data.total / data.data.data.options.count);
          callback(data);
        } else {}
      });
    },
    getFilterTableData: function (data, callback) {
      if (!data.pageNo) {
        pageNo = 1;
      }
      var filter = data;
      $http.post(url + 'Table/filterTables', {
        filter: {
          blindAmt: filter.blindAmt,
          chalAmt: filter.chalAmt,
          name: filter.name,
          type: filter.type,
        },
        page: 1
      }).then(function (data) {
        if (data.data) {
          var totalCount = data.data.data.total;
          data.data.data.options.maxPage = _.ceil(data.data.data.total / data.data.data.options.count);
          callback(data);
        } else {}
      });
    },

    getPrivateTables: function (pageNo, callback) {
      if (!pageNo) {
        pageNo = 1;
      }
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        $http.post(url + 'Table/getPrivateTables', {
          accessToken: accessToken,
          page: pageNo
        }).then(function (data) {
          if (data.data) {
            var totalCount = data.data.data.total;
            data.data.data.options.maxPage = _.ceil(data.data.data.total / data.data.data.options.count);
            callback(data);
          } else {}
        });
      }
    },
    getOneTable: function (id, callback) {
      $http.post(url + 'Table/getOne', {
        _id: id
      }).then(function (data) {
        callback(data);
      });
    },
    getAccessToTable: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Table/getAccessToTable', {
          'tableId': data.tableId,
          'password': data.password
        }).then(function (data) {
          callback(data);
        });
      }
    },
    getAll: function (data, callback) {
      $http({
        url: url + 'Player/getAll',
        method: 'POST',
        data: data
      }).then(function (data) {
        callback(data);
      });
    },
    savePlayerToTable: function (dataPlayer, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http({
          url: url + 'Table/addUserToTable',
          method: 'POST',
          data: {
            playerNo: dataPlayer.playerNo,
            tableId: dataPlayer.tableId,
            socketId: socketId,
            accessToken: accessToken
          }
        }).then(function (data) {
          callback(data);
        });
      }
    },

    getOnePlayer: function (id, callback) {
      $http.post(url + 'Player/getOne', {
        _id: id
      }).then(function (data) {
        callback(data);
      });
    },


    makeSeen: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/makeSeen', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    chaal: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/chaal', {
          "tableId": data.tableId,
          "accessToken": accessToken,
          "amount": data.amount
        }).then(function (data) {
          callback(data);
        });
      }
    },
    pack: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/fold', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    sideShow: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/sideShow', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data.data);
        });
      }
    },

    doSideShow: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/doSideShow', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },

    showWinner: function (tableId, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/showWinner', {
          "accessToken": accessToken,
          "tableId": tableId,
        }).then(function (data) {
          callback(data);
        });
      }
    },

    rejectSideShow: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/cancelSideShow', {
          "tableId": data.tableId,
          "accessToken": accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },

    deletePlayer: function (playerdetails, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Player/deletePlayer', {
          "tableId": playerdetails.tableId,
          "accessToken": accessToken,
        }).then(function (data) {
          callback(data);
        });
      }
    },

    connectSocket: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      console.log(accessToken);
      if (!_.isEmpty(accessToken)) {
        callApi();
      } else {
        $timeout(function () {
          callApi();
        }, 2000);
      }

      function callApi() {
        $http.post(url + 'Player/updateSocket', {
          accessToken: accessToken,
          socketId: socketId
        }).then(function (data) {
          callback(data);
        });
      }

    },

    getTransaction: function (pageNo, callback) {
      if (!pageNo) {
        pageNo = 1;
      }
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        return $http.post(url + 'Transaction/getPlayerTransaction', {
          "page": pageNo,
          "accessToken": accessToken
        }).then(function (data) {
          if (data.data) {
            var totalCount = data.data.data.total;
            // console.log("totalCount", totalCount);
            data.data.data.options.maxPage = _.ceil(data.data.data.total / data.data.data.options.count);
            callback(data);
          } else {}
        });
      }
    },

    getByPlrId: function (data, callback) {
      $http.post(url + 'Player/getByPlrId', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },

    makeDealer: function (data, callback) {
      $http.post(url + 'Player/makeDealer', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },

    deductBootAmount: function (data, callback) {
      $http.post(url + 'Player/deductBootAmount', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },

    serve: function (data, callback) {
      $http.post(url + 'Player/serve', {
        "tableId": data.tableId,
      }).then(function (data) {
        callback(data);
      });
    },

    createPot: function (data, callback) {
      $http.post(url + 'Pot/createPot', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    },

    createTable: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (accessToken) {
        data.accessToken = accessToken;
        console.log(data);
        $http.post(url + 'Table/createPrivateTable', data).then(function (data) {
          console.log(data);
          data = data.data;
          callback(data);
        });
      }
    },

    addAmountToPot: function (data, callback) {
      $http.post(url + 'Pot/addAmountToPot', {
        data: data
      }).then(function (data) {
        callback(data);
      });
    }
  };
  return obj;
});
