app.controller('FriendsOfFriendsController', ['$rootScope', '$scope', 'API', 'errorHandler', 'notification', '$stateParams',
    function ($rootScope, $scope, api, handleError, notification, $stateParams) {
        $scope.state = 'friends';

        console.log($scope.state);

        api.getFriendsOfFriends($stateParams['username'])
            .then(function (data) {
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