app.controller('SearchController', ['$scope', 'API', '$rootScope', function ($scope, api, $rootScope) {
    var searchResults = document.getElementById('searchContainer');

    $scope.search = function (searchTerm) {
        $scope.isSearching=true;
        api.searchUsers(searchTerm)
            .then(function (data) {
                $scope.users = data['data'];
            });
    };

    $scope.display = function () {
        angular.element(searchResults).css('display','block');
    };

    $scope.hide = function () {
        angular.element(searchResults).css('display','none !important');
    };
}]);