angular.module('poem.controllers', [])

    .controller('AppCtrl', function ($scope, PoemService, $rootScope, $window, $ionicModal) {

        PoemService.readAllPoems();


        $scope.$on('poems-load-event', function (event, data) {

            $rootScope.allPoems = data.poems;

        });

        $rootScope.phoneHeight = $window.innerHeight;

        $rootScope.halfPhoneHeight = parseInt($rootScope.phoneHeight / 2);

        $scope.authorPeriodAvgAge = [
            {
                key: "Test One", values: [
                {number: 74, period: "先秦"},
                {number: 68, period: "元"},
                {number: 66.1, period: "清"},
                {number: 64, period: "宋"},
                {number: 62.5, period: "唐"},
                {number: 61.6, period: "明"},
                {number: 59.6, period: "隋"},
                {number: 58.3, period: "南北朝"},
                {number: 55.8, period: "魏晋"},
                {number: 55.7, period: "五代"},
                {number: 52.2, period: "两汉"},
                {number: 40, period: "金"}
            ]
            }
        ];

        $scope.periodAuthors = [
            {number: 30, period: "先秦"},
            {number: 234, period: "元"},
            {number: 160, period: "清"},
            {number: 819, period: "宋"},
            {number: 1601, period: "唐"},
            {number: 104, period: "明"},
            {number: 10, period: "隋"},
            {number: 54, period: "南北朝"},
            {number: 29, period: "魏晋"},
            {number: 19, period: "五代"},
            {number: 58, period: "两汉"},
            {number: 3, period: "金"}
        ];

        $scope.periodAuthorsOption = {

            chart: {
                type: 'pieChart',

                height: parseInt($window.innerWidth * 0.618),
                width: $window.innerWidth,
                showValues: true,
                x: function (d) {
                    return d.period;
                },
                y: function (d) {
                    return d.number;
                },
                showLabels: true,
                duration: 5000,
                title: {
                    enable: true,
                    text: 'Chart Title'
                },
                //text: "各朝代诗人总数比",
                //title: {
                //    enable: true,
                //    text: "各朝代诗人总数比",
                //    className: "h4",
                //    css: {
                //        textAlign: "center"
                //    }
                //},
                //showLegend: false
                legend: {
                    key: function(d) {
                        return d.period + " (" + d.number + ")人"
                    }
                }
            }
        };

        $scope.authorPeriodAvgAgeOption = {

            "chart": {
                "type": "discreteBarChart",
                "height": parseInt($window.innerWidth * 0.618),
                "width": $window.innerWidth,
                "margin": {
                    "left": 0
                },
                x: function (d) {
                    return d.period;
                },
                y: function (d) {
                    return d.number;
                },
                yAxis: {
                    axisLabel: '',
                    tickFormat: function (d) {
                        return d3.format('.1f')(d.number);
                    }
                },
                "showValues": true,
                "duration": 500,
                "xAxis": {
                    "axisLabel": "各朝代诗人平均寿命对比图"
                }

            }
        };

        $ionicModal.fromTemplateUrl('templates/modal/statistics.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.statisticsModal = modal;
        });

        $scope.closeStatisticsDialog = function () {
            $scope.statisticsModal.hide();

        };

        $scope.$on('$destroy', function () {
            $scope.statisticsModal.remove();
        });

        $scope.openStatisticsDialog = function () {
            $scope.statisticsModal.show();
        };


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
                .then(function (modal) {

                    modal.show();

                });
        };

        $scope.showSingleAuthor = function (author) {

            AuthorService.initCommonAuthorDialog($scope, author)
                .then(function (modal) {
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
