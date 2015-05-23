app.controller('NavbarController', ['$scope', 'API', 'storage', 'errorHandler', function ($scope, api, storage, handleError) {
    $scope.isAuthenticated = api.isAuthenticated;

    $scope.logout = function () {
        api.logout()
            .then(function () {
                storage.clear();
            }, function (err) {
                handleError($scope, err)
            })
    };

    $scope.name = sessionStorage['name'];
    $scope.profilePic = sessionStorage['profilePic']
}]);