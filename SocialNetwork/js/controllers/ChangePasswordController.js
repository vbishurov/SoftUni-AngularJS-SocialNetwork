app.controller('ChangePasswordController', ['$scope', 'API', '$state', 'errorHandler', function ($scope, api, $state, handleError) {
    $scope.changePassword = function (oldPassword, password, confirmPassword) {
        if (password !== confirmPassword) {
            return false;
        }

        api.changePassword(oldPassword, password, confirmPassword)
            .then(function () {
                $state.go('welcome');
            }, function (err) {
                handleError($scope, err)
            })
    }
}]);