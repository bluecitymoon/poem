angular.module('poem.author-controllers', [])

  .controller('AuthorCtrl', function ($scope, AuthorService, $stateParams, $state, $ionicModal, $rootScope, $timeout, PoemService, StorageService, $filter) {

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


    $scope.collectAuthor = function (author) {
      var collectedAuthors = StorageService.getArray('authors');

      if (collectedAuthors && collectedAuthors.length > 0) {

        var existedAuthor = $filter('filter')(collectedAuthors, {id: author.id});

        if (existedAuthor && existedAuthor.length > 0) {
          return;
        } else {
          collectedAuthors.push(author);
        }

      } else {
        collectedAuthors = [author];
      }

      StorageService.setObject('authors', collectedAuthors);
    };


    $scope.showDialog = function (author) {

      AuthorService.initCommonAuthorDialog($scope, author)
        .then(function(modal) {
          modal.show();
        });
    };

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

  });
