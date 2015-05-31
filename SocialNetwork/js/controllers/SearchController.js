app.controller('SearchController', ['$scope', 'API', 'errorHandler', 'notification', function ($scope, api, handleError, notification) {
    var searchResults = document.getElementById('searchContainer');

    $scope.search = function (searchTerm) {
        $scope.isSearching = true;
        api.searchUsers(searchTerm)
            .then(function (data) {
                $scope.users = data['data'];
            }, function (err) {
                handleError($scope, err);
            });
    };

    $scope.display = function () {
        angular.element(searchResults).css('display', 'block');
    };

    $scope.hide = function () {
        angular.element(searchResults).css('display', 'none !important');
    };
}]);