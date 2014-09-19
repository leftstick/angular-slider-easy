(function(angular) {
    'use strict';
    var demo = angular.module('demo', ['angular-slider-easy']);

    demo.controller('DemoController', ['$scope', function($scope) {
            $scope.val = {};

            $scope.option = {
                start: 3,
                end: 218,
                handles: [19, 60]
            };
    }]);

}(angular));