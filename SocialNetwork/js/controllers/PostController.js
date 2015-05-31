app.controller('PostController', ['$rootScope', '$scope', '$stateParams', 'API', '$state', 'errorHandler', 'notification',
    function ($rootScope, $scope, $stateParams, api, $state, handleError, notification) {
        $scope.limit = 3;

        $scope.like = function (id) {
            api.likePost(id)
                .then(function () {
                    notification.success('Post liked successfully');

                    angular.forEach($scope.posts, function (value) {
                        if (value['id'] === id) {
                            value['liked'] = true;
                            value['likesCount']++;
                        }
                    })
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                });
        };

        $scope.unlike = function (id) {
            api.unlikePost(id)
                .then(function () {
                    notification.success('Post disliked successfully');

                    angular.forEach($scope.posts, function (value) {
                        if (value['id'] === id) {
                            value['liked'] = false;
                            value['likesCount']--;
                        }
                    })
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                });
        };

        $scope.deletePost = function (id) {
            api.deletePost(id)
                .then(function () {
                    notification.success('Post deleted successfully');

                    $state.reload();
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                })
        };

        $scope.editPost = function (id, newText) {
            api.editPost(id, newText)
                .then(function () {
                    notification.success('Post edited successfully');

                    $state.reload();
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                })
        };

        $scope.commentPost = function (postId, commentText) {
            api.commentPost(postId, commentText)
                .then(function () {
                    notification.success('Post commented successfully');

                    $state.reload();
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                })
        };

        $scope.showComments = function (id, post) {
            api.getPostComments(id)
                .then(function (data) {
                    $scope.limit = data['data'].length;
                    post['comments'] = data['data'];
                })
        }
    }]);