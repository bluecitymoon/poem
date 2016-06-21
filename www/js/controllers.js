angular.module('poem.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {

  })

  .controller('HelloCtrl', function ($scope, AuthorService, $ionicPopover) {

    $scope.authors = [];

    AuthorService.readAllAuthors().success(function (data) {

      angular.forEach(data, function(author) {

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

    $scope.showAuthorPopover = function($event, author) {

      $scope.author = author;

      $scope.popover.show($event);
    }


  });
