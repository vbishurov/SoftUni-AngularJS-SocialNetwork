app.factory('errorHandler', ['notification', function (notification) {
    return function ($scope, err) {
        $scope.clicked = false;
        $scope.error = true;
        $scope.errorMessage = '';

        if (err['data']['modelState']) {
            if (err['data']['modelState'][''].length === 1) {
                $scope.errorMessage += err['data']['modelState'][''][0];
            } else {
                angular.forEach(err['data']['modelState'][''], function (value, key) {
                    $scope.errorMessage += (key + 1) + ': ' + value + '\n';
                })
            }

        } else if (err['data']['error_description']) {
            $scope.errorMessage = err['data']['error_description'];
        } else if (err['data']['message']) {
            $scope.errorMessage = err['data']['message'];
        }

    }
}]);