app.controller('NewsFeedController', ['$rootScope', '$scope', 'API', function ($rootScope, $scope, api) {
    api.getNewsFeed('', 10)
        .then(function (data) {
            $scope.feed = data['data'];
            console.log(data['data']);
        });

    api.getOwnFriends().
        then(function (data) {
            $scope.friends = data['data'];
            $scope.friendsCount = data['data'].length;
            console.log(data['data']);
        })
}]);