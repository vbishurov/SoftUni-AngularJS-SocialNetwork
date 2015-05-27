app.controller('ViewUserWallController', ['$rootScope', '$scope', '$stateParams', 'API', '$state', function ($rootScope, $scope, $stateParams, api, $state) {
    $scope.isAuthenticated = api.isAuthenticated;

    api.getUserData($stateParams['username'])
        .then(function (data) {
            $scope.isFriendWall = data['data']['isFriend'];
            $scope['userViewed'] = data['data'];

            api.getFriendWall($stateParams['username'], '', 10)
                .then(function (data) {
                    $scope.posts = data['data'];
                });
        });

    $scope.sendRequest = function () {
        api.sendFriendRequest($scope['userViewed']['username'])
            .then(function () {
                console.log('success');
            });
    };

    $scope.addPost = function (postContent) {
        if ($scope.isFriendWall || $scope['userViewed']['username'] === $rootScope['currentUser']['username']) {
            api.addPost($scope['userViewed']['username'], postContent)
                .then(function () {
                    $state.reload();
                    console.log('success');
                })
        }
    };
}]);