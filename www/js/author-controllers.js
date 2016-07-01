angular.module('poem.author-controllers', [])

  .controller('AuthorCtrl', function ($scope, AuthorService, $stateParams, $state, $ionicModal, $rootScope, $timeout, PoemService) {

    $scope.originalAuthors = [];

    $scope.authors = [];

    $scope.avaliableAuthors = [];
    $scope.currentPage = 0;
    var defaultPageSize = 50;

    AuthorService.readAllAuthors().success(function (data) {

      $scope.authors = data;

      $scope.originalAuthors = angular.copy(data);

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

    $scope.closeAuthorDialog = function () {
      $scope.modal.hide();

      $scope.authorPoems = [];
    };

    $scope.showDialog = function (author) {

      $scope.author = author;

      $scope.modal.show();
      $timeout(function () {
        lookupAuthorPoems();
      }, 1000);
    };

    $scope.authorPoems = [];
    function lookupAuthorPoems() {

      $scope.authorPoems = [];
      angular.forEach($rootScope.allPoems, function (poem) {

        if ($scope.author && $scope.author.id == poem.authorId) {
          $scope.authorPoems.push(poem);
        }
      });

    }

    $scope.keyword = {content: ''};
    $scope.searchAuthor = function () {

      $scope.currentPage = 0;
      $scope.avaliableAuthors = [];


    };

    $scope.showSinglePoem = function (poem) {

      PoemService.initCommonPoemDialog($scope, poem)
        .then(function(modal) {

          modal.show();

        });
    }

  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
