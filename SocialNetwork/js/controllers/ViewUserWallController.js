app.controller('ViewUserWallController', ['$rootScope', '$scope', '$stateParams', 'API', '$state', 'errorHandler', 'notification',
    function ($rootScope, $scope, $stateParams, api, $state, handleError, notification) {
        $scope.isAuthenticated = api.isAuthenticated;
        $scope.posts = [];

        api.getUserData($stateParams['username'])
            .then(function (data) {
                $scope.isFriendWall = data['data']['isFriend'];
                $scope['userViewed'] = data['data'];

                api.getFriendWall($stateParams['username'], '', 10)
                    .then(function (data) {
                        $scope.id = data['data'][data['data'].length - 1]['id'];
                        $scope.posts = $scope.posts.concat(data['data']);
                    }, function (err) {
                        handleError($scope, err);
                        notification.error($scope.errorMessage);
                    });

                if ($scope.isFriendWall) {
                    api.getFriendsOfFriends($stateParams['username'], true).
                        then(function (data) {
                            $scope.friends = data['data']['friends'];
                        });
                }
            }, function (err) {
                handleError($scope, err);
                notification.error($scope.errorMessage);
            });

        $scope.sendRequest = function () {
            api.sendFriendRequest($scope['userViewed']['username'])
                .then(function () {
                    notification.success('Friend request sent successfully');
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                });
        };

        $scope.addPost = function (postContent) {
            if ($scope.isFriendWall || $scope['userViewed']['username'] === $rootScope['currentUser']['username']) {
                api.addPost($scope['userViewed']['username'], postContent)
                    .then(function () {

                        notification.success('Post added successfully');

                        $state.reload();
                    }, function (err) {
                        handleError($scope, err);
                        notification.error($scope.errorMessage);
                    })
            }
        };

        $scope.update = function () {
            if ($scope.id) {
                api.getFriendWall($stateParams['username'], $scope.id, 10).
                    then(function (data) {
                        if (data['data'].length > 0) {
                            $scope.id = data['data'][data['data'].length - 1]['id'];
                            $scope.posts = $scope.posts.concat(data['data']);
                        } else {
                            $scope.id = false;
                        }
                    }, function (err) {
                        handleError($scope, err);
                        notification.error($scope.errorMessage);
                    })
            }
        }
    }]);