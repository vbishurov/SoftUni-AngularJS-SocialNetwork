app.controller('NavbarController', ['$scope', 'API', 'storage', function ($scope, api, storage) {
    $scope.isAuthenticated = api.isAuthenticated;

    $scope.logout = function () {
        api.logout()
            .then(function (data) {
                storage.clear();
            })
    };
}]);