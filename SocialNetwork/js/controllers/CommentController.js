app.controller('CommentController', ['$rootScope', '$scope', '$stateParams', 'API', '$state', 'notification', 'errorHandler',
    function ($rootScope, $scope, $stateParams, api, $state, notification, handleError) {
        $scope.like = function (postId, id) {
            api.likeComment(postId, id)
                .then(function () {
                    notification.success('Comment liked successfully');
                    angular.forEach($scope.posts, function (value) {
                        if (value['id'] === postId) {
                            angular.forEach(value['comments'], function (val) {
                                if (val['id'] === id) {
                                    val['liked'] = true;
                                    val['likesCount']++;
                                }
                            })
                        }
                    })
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                });
        };

        $scope.unlike = function (postId, id) {
            api.unlikeComment(postId, id)
                .then(function () {
                    notification.success('Comment disliked successfully');
                    angular.forEach($scope.posts, function (value) {
                        if (value['id'] === postId) {
                            angular.forEach(value['comments'], function (val) {
                                if (val['id'] === id) {
                                    val['liked'] = false;
                                    val['likesCount']--;
                                }
                            })
                        }
                    })
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                });
        };

        $scope.delete = function (postId, id) {
            api.deleteComment(postId, id)
                .then(function () {
                    notification.success('Comment deleted successfully');
                    $state.reload();
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                })
        };

        $scope.edit = function (postId, id, newText) {
            api.editComment(postId, id, newText)
                .then(function () {
                    notification.success('Comment edited successfully');
                    $state.reload();
                }, function (err) {
                    handleError($scope, err);
                    notification.error($scope.errorMessage);
                })
        };
    }]);