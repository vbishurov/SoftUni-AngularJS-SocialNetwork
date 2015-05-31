app.controller('ChangePasswordController', ['$scope', 'API', '$state', 'errorHandler', 'notification', function ($scope, api, $state, handleError, notification) {
    $scope.changePassword = function (oldPassword, password, confirmPassword) {
        $scope.clicked = true;

        if (password !== confirmPassword) {
            return false;
        }

        api.changePassword(oldPassword, password, confirmPassword)
            .then(function () {
                notification.success('Password changed successfully');

                $state.go('welcome');
            }, function (err) {
                $scope.clicked = false;
                handleError($scope, err)
            })
    }
}]);