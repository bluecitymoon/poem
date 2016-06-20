angular.module('poem.author-controllers', [])

  .controller('AuthorCtrl', function ($scope, AuthorService, $stateParams, $state, $ionicModal) {

    $scope.authors = [];

    $scope.avaliableAuthors = [];
    $scope.currentPage = 0;
    var defaultPageSize = 50;

    AuthorService.readAllAuthors().success(function (data) {

      $scope.authors = data;

      $scope.avaliableAuthors = data.slice(0, defaultPageSize);
    });

    var pageSize = 20;
    $scope.noMoreItemsAvailable = false;
    $scope.loadNextPage = function () {

      var start = $scope.currentPage * pageSize + defaultPageSize;
      var end = start + pageSize;

      if (end > $scope.authors.length) {
        end = $scope.authors.length;

        $scope.noMoreItemsAvailable = true;
      }

      $scope.currentPage++;

      var nextPageItems = $scope.authors.slice(start, end);
      angular.forEach(nextPageItems, function (value) {
        $scope.avaliableAuthors.push(value);
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    $scope.author = {};

    $ionicModal.fromTemplateUrl('templates/modal/single-author.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.closeDialog = function () {
      $scope.modal.hide();
    };

    $scope.showDialog = function (author) {

      $scope.author = author;

      $scope.modal.show();
    };

  })

  .controller('PoemDetailCtrl', function ($scope, PoemService, $state, $ionicScrollDelegate) {

    $scope.$on('$ionicView.enter', function (e) {
      $scope.poem = PoemService.getSelectedPoem();

      $scope.sentances = $scope.poem.content.split("。");

      $ionicScrollDelegate.scrollTop();
    });

    $scope.goback = function () {
      $state.go('tab.book');
    };


  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
