angular.module('poem.services', [])

  .factory('AuthorService', function ($http, $filter) {

    function readAllAuthors() {
      return $http.get('data/author.json');
    }

    return {
      readAllAuthors: readAllAuthors
    };
  })

  .factory('PoemService', function ($http, $rootScope, $ionicModal) {

    function readAllPoems() {

      $http.get('data/poem.json')
        .success(function (response, status, headers, config) {

          $rootScope.$broadcast('poems-load-event', {poems: response});

      }).error(function (response, status, headers, config) {
          //TODO
      });
    }

    function initCommonPoemDialog($scope, poem) {

      var promise;
      $scope = $scope || $rootScope.$new();

      promise = $ionicModal.fromTemplateUrl('templates/modal/single-poem.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {

        $scope.poemModal = modal;

        return modal;
      });

      $scope.closeDialog = function () {
        $scope.poemModal.hide();
      };

      $scope.poem = poem;

      $scope.$on('$destroy', function() {
        $scope.poemModal.remove();
      });

      return promise;
    }

    return {
      readAllPoems: readAllPoems,
      initCommonPoemDialog: initCommonPoemDialog
    };

  });
