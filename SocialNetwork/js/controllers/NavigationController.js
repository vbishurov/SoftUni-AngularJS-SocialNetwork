app.controller('NavigationController', ['$rootScope', '$scope', 'API', 'storage', 'errorHandler', '$state', function ($rootScope, $scope, api, storage, handleError, $state) {
    $scope.isAuthenticated = api.isAuthenticated;
    $scope.hidden = true;

    $scope.logout = function () {
        api.logout()
            .then(function () {
                $state.go('welcome');
                storage.clear();
            }, function (err) {
                handleError($scope, err)
            })
    };

    $scope.alternate = function () {
        $scope.hidden = !$scope.hidden;
    };

    $scope.accept = function (id) {
        api.acceptFriendRequest(id).
            then(function () {
                $state.reload();
            });
    };

    $scope.decline = function (id) {
        api.denyFriendRequest(id).
            then(function () {
                $state.reload();
            });
    };

    if ($rootScope['currentUser'] && !$rootScope['currentUser']['pendingRequests']) {
        api.getFriendRequests().
            then(function (data) {
                $rootScope['currentUser']['pendingRequests'] = data['data'];
                $scope.pendingRequestsCount = data['data'].length;
            })
    }
}]);