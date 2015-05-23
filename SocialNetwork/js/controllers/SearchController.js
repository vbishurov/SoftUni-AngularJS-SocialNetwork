app.controller('SearchController', ['$scope', 'API', '$rootScope', function ($scope, api,$rootScope) {
    console.log($rootScope);
    $scope.search = function (searchTerm) {
        api.searchUsers(searchTerm)
            .then(function (data) {
                $scope.users = data['data'];
            });
    }
}]);