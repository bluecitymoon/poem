angular.module('poem.poem-controllers', [])

  .controller('PoemCtrl', function ($scope, PoemService, $stateParams, $state, $ionicModal, AuthorService, $filter, $ionicPopover, $rootScope, $timeout ) {

    $scope.authors = [];

    $scope.avaliablepoems = [];
    $scope.poems = $rootScope.allPoems;

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

    $timeout(function() {

      AuthorService.readAllAuthors().success(function (data) {

        $scope.authors = data;

        $scope.avaliablepoems = $scope.poems.slice(0, defaultPageSize).map(mergeAuthorInformation);
      });
    }, 500);

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
    };

    $scope.$on('$destroy', function () {

      $scope.modal.remove();

    });

    $scope.keyword = {content: ''};
    $scope.searchPoems = function() {

      $scope.poems = [];

      $scope.avaliablepoems = [];
      $scope.noMoreItemsAvailable = false;

      angular.forEach($rootScope.allPoems, function(poem) {

        var regex = new RegExp($scope.keyword.content, "g");
        var newValue = "<span class='deep-red'>" + $scope.keyword.content + "</span>";

        if (poem.title.indexOf($scope.keyword.content) > -1) {

          poem.title = poem.title.replace(regex, newValue);

          $scope.poems.push(poem);

        }

        //else { //TODO search in content
        //
        //  var sentanceMatch = false;
        //
        //  for (var i = 0; i < poem.content.length; i ++) {
        //
        //
        //    if (!sentanceMatch && poem.content[i].indexOf($scope.keyword.content) > -1) {
        //
        //      poem.content[i] = poem.content[i].replace(regex, newValue);
        //      sentanceMatch = true;
        //
        //    }
        //  }
        //}
      });

      $scope.currentPage = 0;
      $scope.avaliablepoems = $scope.poems.slice(0, defaultPageSize).map(mergeAuthorInformation);
    }

  });
