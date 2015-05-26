app.controller('ViewUserWallController', ['$rootScope', '$scope', '$stateParams', 'API', '$state', function ($rootScope, $scope, $stateParams, api, $state) {
    $scope.isAuthenticated = api.isAuthenticated;

    api.getUserData($stateParams['username'])
        .then(function (data) {
            $scope.isFriendWall = data['data']['isFriend'];
            $scope['userViewed'] = data['data'];

            api.getFriendWall($stateParams['username'], '', 10)
                .then(function (data) {
                    $scope.userPosts = data['data'];
                });
        });

    $scope.like = function (id) {
        api.likePost(id)
            .then(function () {
                angular.forEach($scope.userPosts, function (value) {
                    if (value['id'] === id) {
                        value['liked'] = true;
                        value['likesCount']++;
                    }
                })
            });
    };

    $scope.unlike = function (id) {
        api.unlikePost(id)
            .then(function () {
                angular.forEach($scope.userPosts, function (value) {
                    if (value['id'] === id) {
                        value['liked'] = false;
                        value['likesCount']--;
                    }
                })
            });
    };

    $scope.deletePost = function (id) {
        api.deletePost(id)
            .then(function () {
                $state.reload();
                console.log('deleted');
            })
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

    $scope.editPost = function (id, newText) {
        api.editPost(id, newText)
            .then(function () {
                $state.reload();
                console.log('success');
            })
    };

    $scope.sendRequest = function () {
        api.sendFriendRequest($scope['userViewed']['username'])
            .then(function () {
                console.log('success');
            });
    }
}]);