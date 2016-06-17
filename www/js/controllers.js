angular.module('poem.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.loginData = {};


    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
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

  .controller('HelloCtrl', function ($scope, $stateParams) {

    $scope.warmup =
      [
        "粗缯大布裹生涯",
        "腹有诗书气自华",
        "厌伴老儒烹瓠叶",
        "强随举子踏槐花",
        "囊空不办寻春马",
        "眼乱行看择婿车",
        "得意犹堪夸世俗",
        "诏黄新湿字如鸦"
      ];
  });
