app.controller('HomeController', ['$scope', 'API', function ($scope, api) {
    $scope.isAuthenticated = api.isAuthenticated;

    if (api.isAuthenticated()) {
        if (!$scope.currentUser) {
            $scope.currentUser = sessionStorage;
        }
    }
}]);