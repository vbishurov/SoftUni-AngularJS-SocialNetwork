app.controller('NewsFeedController', ['$rootScope', '$scope', 'API', function ($rootScope, $scope, api) {
    $scope.posts = [];

    $scope.$watch('$viewContentLoaded', function () {
        if (api.isAuthenticated()) {
            api.getNewsFeed('', 10)
                .then(function (data) {
                    if (data['data'][data['data'].length - 1]) {
                        $scope.id = data['data'][data['data'].length - 1]['id'];
                        $scope.posts = $scope.posts.concat(data['data']);
                    }
                });

            api.getOwnFriends()
                .then(function (data) {
                    $scope.friends = data['data'];
                });

        }
    });

    $scope.update = function () {
        if ($scope.id) {
            api.getNewsFeed($scope.id, 10).
                then(function (data) {
                    if (data['data'].length > 0) {
                        $scope.id = data['data'][data['data'].length - 1]['id'];
                        $scope.posts = $scope.posts.concat(data['data']);
                    } else {
                        $scope.id = false;
                    }
                })
        }
    }
}]);