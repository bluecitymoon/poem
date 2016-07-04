angular.module('poem.controllers', [])

  .controller('AppCtrl', function ($scope, PoemService, $rootScope, $window) {

    PoemService.readAllPoems();


    $scope.$on('poems-load-event', function (event, data) {

      $rootScope.allPoems = data.poems;

    });

    $rootScope.phoneHeight = $window.innerHeight;

    $rootScope.halfPhoneHeight = parseInt($rootScope.phoneHeight / 2);
  })

  .controller('CollectionsCtrl', function ($scope, StorageService, PoemService, AuthorService) {

    $scope.collectedPoems = [];
    $scope.collectedAuthors = [];

    $scope.$on('$ionicView.enter', function (e) {

      $scope.collectedPoems = StorageService.getArray('poems');
      $scope.collectedAuthors = StorageService.getArray('authors');
    });

    $scope.selectedSegment = 0;
    $scope.showCategoryItems = function (index) {
      $scope.selectedSegment = index;

      $scope.$applyAsync();
    };

    $scope.showSinglePoem = function (poem) {

      PoemService.initCommonPoemDialog($scope, poem)
        .then(function(modal) {

          modal.show();

        });
    };

    $scope.showSingleAuthor = function(author) {

      AuthorService.initCommonAuthorDialog($scope, author)
        .then(function(modal) {
          modal.show();
        })
    };


  })


  .controller('HelloCtrl', function ($scope, AuthorService, $ionicPopover) {

    $scope.authors = [];

    AuthorService.readAllAuthors().success(function (data) {

      angular.forEach(data, function (author) {

        if (author.avatar) {
          $scope.authors.push(author);
        }

      });
    });

    $ionicPopover.fromTemplateUrl('templates/popover/single-author-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });

    $scope.showAuthorPopover = function ($event, author) {

      $scope.author = author;

      $scope.popover.show($event);
    }


  });
