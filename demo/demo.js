(function(angular) {
    'use strict';
    var demo = angular.module('demo', ['angular-slider-easy']);

    demo.controller('DemoController', ['$scope', function($scope) {
            $scope.output = {
                point: 90
            };
    }]);

}(angular));
