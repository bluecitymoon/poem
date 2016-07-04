angular.module('poem.poem-controllers', [])

  .controller('PoemCtrl', function ($scope, PoemService, $stateParams, $state, $ionicModal, AuthorService, $filter, $ionicPopover, $rootScope, $timeout, StorageService, UtilService) {

    $scope.authors = [];

    $scope.avaliablepoems = [];
    $scope.poems = $rootScope.allPoems;

    $scope.currentPage = 0;
    var defaultPageSize = 50;

    function mergeAuthorInformation(poem) {

      var authorId = poem.authorId;
      if (authorId) {

        var author = $filter('filter')($scope.authors, {id: authorId})[0];

        if (author) {
          poem.author = author;
          poem.avatar = author.avatar;
        }
      }

      return poem;
    }

    $scope.collectPoem = function (poem) {

      var collectedPoems = StorageService.getArray('poems');

      if (collectedPoems && collectedPoems.length > 0) {

        var existedPoem = $filter('filter')(collectedPoems, {id: poem.id});

        if (existedPoem && existedPoem.length > 0) {

          UtilService.showAlert('我本将心向明月，奈何明月照沟渠。');

          return;
        } else {
          collectedPoems.push(poem);
        }

      } else {
        collectedPoems = [poem];
      }

      StorageService.setObject('poems', collectedPoems);


      UtilService.showAlert('花径不曾缘客扫，逢门今始为君开。');

    };

    $timeout(function () {

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


    $scope.showDialog = function (poem) {

      PoemService.initCommonPoemDialog($scope, poem)
        .then(function (modal) {

          modal.show();

        });
    };

    $ionicPopover.fromTemplateUrl('templates/popover/author-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });

    $scope.showAuthorPopover = function ($event) {
      $scope.popover.show($event);
    };


    $scope.keyword = {content: ''};
    $scope.searchPoems = function () {

      $scope.poems = [];

      $scope.avaliablepoems = [];
      $scope.noMoreItemsAvailable = false;

      angular.forEach($rootScope.allPoems, function (poem) {

        var regex = new RegExp($scope.keyword.content, "g");
        var newValue = "<span class='deep-red'>" + $scope.keyword.content + "</span>";

        if (poem.title.indexOf($scope.keyword.content) > -1) {

          poem.title = poem.title.replace(regex, newValue);

          $scope.poems.push(poem);

        }

      });

      $scope.currentPage = 0;
      $scope.avaliablepoems = $scope.poems.slice(0, defaultPageSize).map(mergeAuthorInformation);
    }

  });
