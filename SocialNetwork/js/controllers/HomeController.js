app.controller('HomeController', ['$scope', 'API', '$rootScope', function ($scope, api, $rootScope) {
    $scope.isAuthenticated = api.isAuthenticated;
}]);