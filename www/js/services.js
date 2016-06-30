angular.module('poem.services', [])

  .factory('AuthorService', function ($http, $filter) {

    function readAllAuthors() {
      return $http.get('data/author.json');
    }

    return {
      readAllAuthors: readAllAuthors
    };
  })

  .factory('PoemService', function ($http, $rootScope) {

    function readAllPoems() {

      $http.get('data/poem.json')
        .success(function (response, status, headers, config) {

          $rootScope.$broadcast('poems-load-event', {poems: response});

      }).error(function (response, status, headers, config) {
          //TODO
      });
    }

    return {
      readAllPoems: readAllPoems
    };

  });
