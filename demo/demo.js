(function (angular) {
    'use strict';
    var demo = angular.module('demo', ['angular-slider-easy']);

    demo.controller('DemoController', ['$scope',
        function ($scope) {
            $scope.val = {};
            $scope.val1 = {};
            $scope.val2 = {};
            $scope.val3 = {};

            $scope.option = {
                start: -33,
                end: -1,
                handles: [-10, -15]
            };

            $scope.option1 = {
                start: 30,
                end: 100,
                handles: [31, 50]
            };

            $scope.option2 = {
                start: -30,
                end: -3
            };

            $scope.option3 = {
                start: -30,
                end: 90
            };
        }
    ]);

}(angular));