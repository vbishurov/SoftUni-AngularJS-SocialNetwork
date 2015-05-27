app.controller('CommentController', ['$rootScope', '$scope', '$stateParams', 'API', '$state', function ($rootScope, $scope, $stateParams, api, $state) {
    $scope.like = function (postId, id) {
        api.likeComment(postId, id)
            .then(function () {
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
            });
    };

    $scope.unlike = function (postId, id) {
        api.unlikeComment(postId, id)
            .then(function () {
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
            });
    };

    $scope.delete = function (postId, id) {
        api.deleteComment(postId, id)
            .then(function () {
                $state.reload();
                console.log('deleted');
            })
    };

    $scope.edit = function (postId, id, newText) {
        api.editComment(postId, id, newText)
            .then(function () {
                $state.reload();
                console.log('success');
            })
    };
}]);