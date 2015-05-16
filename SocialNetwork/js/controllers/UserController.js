app.controller('UserController', ['$scope', function ($scope) {
    $scope.login = function (user) {
        console.log(user);
    };

    $scope.register = function (user) {
        console.log(user);
    }
}]);