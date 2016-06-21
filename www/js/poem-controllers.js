angular.module('poem.poem-controllers', [])

  .controller('PoemCtrl', function ($scope, PoemService, $stateParams, $state, $ionicModal, AuthorService, $filter, $ionicPopover ) {

    $scope.poems = [];
    $scope.authors = [];

    $scope.avaliablepoems = [];
    $scope.currentPage = 0;
    var defaultPageSize = 50;

    function mergeAuthorInformation(poem) {

      var authorId = poem.authorId;
      if (authorId) {

        var author = $filter('filter')($scope.authors, {id : authorId})[0];

        if (author) {
          poem.author = author;
          poem.avatar = author.avatar;
        }
      }

      return poem;
    }

    AuthorService.readAllAuthors().success(function (data) {

      $scope.authors = data;

      PoemService.readAllPoems().success(function (data) {

        $scope.poems = data;

        $scope.avaliablepoems = data.slice(0, defaultPageSize).map(mergeAuthorInformation);
      });

    });

    var pageSize = 20;
    $scope.noMoreItemsAvailable = false;
    $scope.loadNextPage = function () {

      var start = $scope.currentPage * pageSize + defaultPageSize;
      var end = start + pageSize;

      if (end > $scope.poems.length) {
        end = $scope.poems.length;

        $scope.noMoreItemsAvailable = true;
      }

      $scope.currentPage++;

      var nextPageItems = $scope.poems.slice(start, end);
      angular.forEach(nextPageItems, function (value) {

        mergeAuthorInformation(value);

        $scope.avaliablepoems.push(value);
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    $scope.poem = {};

    $ionicModal.fromTemplateUrl('templates/modal/single-poem.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.closeDialog = function () {
      $scope.modal.hide();
    };

    $scope.showDialog = function (poem) {

      $scope.poem = poem;

      $scope.modal.show();
    };

    $ionicPopover.fromTemplateUrl('templates/popover/author-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });

    $scope.showAuthorPopover = function($event) {
      $scope.popover.show($event);
    }
  });
