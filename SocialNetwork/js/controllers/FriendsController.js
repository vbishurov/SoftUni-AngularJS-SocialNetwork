app.controller('FriendsController', ['$rootScope', '$scope', 'API', function ($rootScope, $scope, api) {
    api.getOwnFriends().
        then(function (data) {
            $scope.friends = data['data'];
            $scope.friendsCopy = data['data'];
            console.log(data['data']);
        });

    $scope.filter = function (filter) {
        if (filter) {
            filter = filter.toLowerCase();

            var filtered = [];
            angular.forEach($scope.friendsCopy, function (value) {
                if (value['name'].toLowerCase().indexOf(filter) > -1 || value['username'].toLowerCase().indexOf(filter) > -1) {
                    filtered.push(value);
                }
            });

            $scope.friends = filtered
        } else {
            $scope.friends = $scope.friendsCopy;
        }
    }
}]);