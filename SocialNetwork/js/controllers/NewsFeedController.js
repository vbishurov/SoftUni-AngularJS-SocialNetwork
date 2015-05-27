app.controller('NewsFeedController', ['$rootScope', '$scope', 'API', function ($rootScope, $scope, api) {
    if (api.isAuthenticated()) {
        api.getNewsFeed('', 10)
            .then(function (data) {
                console.log(data['data']);
                $scope.posts = data['data'];
            });

        api.getOwnFriends().
            then(function (data) {
                $scope.friends = data['data'];
                $scope.friendsCount = data['data'].length;
            })
    }
}]);