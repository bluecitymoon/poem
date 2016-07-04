angular.module('tadpole-poem', ['ionic','ti-segmented-control', 'poem.controllers', 'poem.author-controllers', 'poem.poem-controllers', 'poem.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })

      .state('app.authors', {
        url: '/authors',
        views: {
          'menuContent': {
            templateUrl: 'templates/authors.html',
            controller: 'AuthorCtrl'
          }
        }
      })
      .state('app.poems', {
        url: '/poems',
        views: {
          'menuContent': {
            templateUrl: 'templates/poem.html',
            controller: 'PoemCtrl'
          }
        }
      })
      .state('app.collections', {
        url: '/collections',
        views: {
          'menuContent': {
            templateUrl: 'templates/collections.html',
            controller: 'CollectionsCtrl'
          }
        }
      })

      .state('app.hello', {
        url: '/hello',
        views: {
          'menuContent': {
            templateUrl: 'templates/hello.html',
            controller: 'HelloCtrl'
          }
        }

      });

    $urlRouterProvider.otherwise('/app/hello');
  });
