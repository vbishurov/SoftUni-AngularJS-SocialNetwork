app.controller('NavigationController', ['$rootScope', '$scope', 'API', 'storage', 'errorHandler', '$state', 'notification',
    function ($rootScope, $scope, api, storage, handleError, $state, notification) {
        $scope.isAuthenticated = api.isAuthenticated;
        $scope.hidden = true;

        $scope.logout = function () {
            api.logout()
                .then(function () {
                    notification.success('Logout successful');

                    storage.clear();

                    $state.go('welcome', {}, {reload: true});
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                })
        };

        $scope.alternate = function () {
            $scope.hidden = !$scope.hidden;
        };

        $scope.accept = function (id) {
            api.acceptFriendRequest(id)
                .then(function () {
                    notification.success('Friend request accepted successfully');

                    $state.reload();
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                });
        };

        $scope.decline = function (id) {
            api.denyFriendRequest(id).
                then(function () {
                    notification.success('Friend request rejected successfully');

                    $state.reload();
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                });
        };

        if ($rootScope['currentUser'] && !$rootScope['currentUser']['pendingRequests']) {
            api.getFriendRequests().
                then(function (data) {
                    $rootScope['currentUser']['pendingRequests'] = data['data'];
                    $scope.pendingRequestsCount = data['data'].length;
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                })
        }
    }]);