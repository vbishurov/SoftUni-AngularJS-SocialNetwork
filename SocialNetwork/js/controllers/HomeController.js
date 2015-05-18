app.controller('HomeController', ['$scope', 'API', function ($scope, api) {
    if (api.isAuthenticated()) {
        if (!$scope.currentUser) {
            $scope.currentUser = sessionStorage;
        }
    }
}]);