app.controller('HomeController', ['$scope', 'API', '$rootScope', function ($scope, api, $rootScope) {
    console.log($rootScope);
    $scope.isAuthenticated = api.isAuthenticated;

    if (api.isAuthenticated()) {
        if (!$scope.currentUser) {
            $scope.currentUser = sessionStorage;
        }
    }
}]);