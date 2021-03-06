angular.module('poem.services', [])

    .factory('AuthorService', function ($http, $ionicModal, $timeout, $rootScope) {

        function readAllAuthors() {
            return $http.get('data/author.json');
        }

        function initCommonAuthorDialog($scope, author) {

            var promise;
            $scope = $scope || $rootScope.$new();

            promise = $ionicModal.fromTemplateUrl('templates/modal/single-author.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {

                $scope.authorModal = modal;

                $timeout(function () {
                    lookupAuthorPoems();
                }, 1000);

                $scope.author = author;

                $scope.$on('$destroy', function () {
                    $scope.authorModal.remove();
                });

                $scope.closeAuthorDialog = function () {
                    $scope.authorModal.hide();

                    $scope.authorPoems = [];
                };


                $scope.authorPoems = [];
                function lookupAuthorPoems() {

                    $scope.authorPoems = [];
                    angular.forEach($rootScope.allPoems, function (poem) {

                        if ($scope.author && $scope.author.id == poem.authorId) {
                            $scope.authorPoems.push(poem);
                        }
                    });

                }

                return modal;
            });

            return promise;
        }

        return {
            readAllAuthors: readAllAuthors,
            initCommonAuthorDialog: initCommonAuthorDialog
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
            }).then(function (modal) {

                $scope.poemModal = modal;

                $scope.closeDialog = function () {
                    $scope.poemModal.hide();
                };

                $scope.poem = poem;

                $scope.$on('$destroy', function () {
                    $scope.poemModal.remove();
                });

                return modal;
            });


            return promise;
        }

        return {
            readAllPoems: readAllPoems,
            initCommonPoemDialog: initCommonPoemDialog
        };

    })

    .factory('StorageService', function ($window) {

        return {
            get: function (key) {

                var value = '';
                try {
                    value = $window.localStorage[key];
                } catch (e) {
                }

                return value;
            },
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            getArray: function (key) {
                return JSON.parse($window.localStorage[key] || '[]');
            }
        };
    })

    .factory('UtilService', function ($ionicLoading, $ionicPopup) {


        function showLoadingScreen(message) {

            var msg = '正在载入';
            if (message) {
                msg = message;
            }
            $ionicLoading.show({
                template: '<ion-spinner icon=\"lines\" class=\"spinner-balanced\"></ion-spinner> '
            });
        }

        function closeLoadingScreen() {
            $ionicLoading.hide();
        }

        function showAlert(message, callback) {

            if (navigator && navigator.notification) {

                navigator.notification.alert(
                    message,  // message
                    callback,         // callback
                    '提示信息',            // title
                    '确定'                  // buttonName
                );
            } else {
                $ionicPopup.alert({
                    title: '提示信息',
                    template: '<h5 style="text-align: center"> ' + message + '</h5>',
                    okText: '确定',
                    okType: 'button button-block button-positive'
                }).then(function () {
                    if (callback) {
                        callback();
                    }

                });
            }
        }


        return {
            showLoadingScreen: showLoadingScreen,
            closeLoadingScreen: closeLoadingScreen,
            showAlert: showAlert
        }
    });

