app.controller('PostController', ['$rootScope', '$scope', '$stateParams', 'API', '$state', function ($rootScope, $scope, $stateParams, api, $state) {
    $scope.like = function (id) {
        api.likePost(id)
            .then(function () {
                angular.forEach($scope.posts, function (value) {
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
                angular.forEach($scope.posts, function (value) {
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

    $scope.editPost = function (id, newText) {
        api.editPost(id, newText)
            .then(function () {
                $state.reload();
                console.log('success');
            })
    };

    $scope.commentPost = function (postId, commentText) {
        api.commentPost(postId, commentText)
            .then(function () {
                $state.reload();
                console.log('success');
            })
    }
}]);