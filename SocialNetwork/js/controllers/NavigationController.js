app.controller('NavigationController', ['$scope', 'API', 'storage', 'errorHandler', '$rootScope', function ($scope, api, storage, handleError, $rootScope) {
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
    $scope.profilePic = sessionStorage['profilePic'] === "null" ? undefined : sessionStorage['profilePic'];
}]);