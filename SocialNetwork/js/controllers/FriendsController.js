app.controller('FriendsController', ['$rootScope', '$scope', 'API', 'errorHandler', 'notification',
    function ($rootScope, $scope, api, handleError, notification) {
        $scope.state = 'friends';

        console.log($scope.state);

        api.getOwnFriends().
            then(function (data) {
                $scope.friends = data['data'];
                $scope.friendsCopy = data['data'];
            }, function (err) {
                handleError($scope, err);
                notification.error($scope.errorMessage);
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