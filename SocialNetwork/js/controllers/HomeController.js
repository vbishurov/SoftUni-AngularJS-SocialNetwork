app.controller('HomeController', ['$scope', 'API', function ($scope, api) {
    $scope.isAuthenticated = api.isAuthenticated;
}]);