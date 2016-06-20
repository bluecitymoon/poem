angular.module('poem.services', [])

  .factory('AuthorService', function ($http) {

    function readAllAuthors() {
      return $http.get('data/author.json');
    }

    return {
      readAllAuthors: readAllAuthors
    };
  })

  .factory('PoemService', function ($http) {

    function readAllPoems() {
      return $http.get('data/poem.json');
    }

    return {
      readAllPoems: readAllPoems
    };

  });
