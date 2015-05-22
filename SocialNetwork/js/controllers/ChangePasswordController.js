app.controller('ChangePasswordController', ['$scope', 'API', '$location', function ($scope, api, $location) {
    $scope.changePassword = function (oldPassword, password, confirmPassword) {
        if (password !== confirmPassword) {
            return false;
        }

        api.changePassword(oldPassword, password, confirmPassword)
            .then(function () {
                $location.path('/');
            }, function (err) {
                console.log(err);
            })
    }
}]);