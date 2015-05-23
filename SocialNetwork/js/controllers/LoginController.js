app.controller('LoginController', ['$scope', 'API', 'storage', '$state', 'errorHandler', '$rootScope', function ($scope, api, storage, $state, handleError, $rootScope) {
    console.log($rootScope);

    $scope.login = function (username, password) {
        $scope.clicked = true;
        $scope.error = false;

        if (password.length < 6) {
            $scope.clicked = false;
            return;
        }

        api.login(username, password)
            .then(function (data) {
                var accessToken = data['data']['access_token'];
                storage.set(accessToken);

                api.getCurrentUserData()
                    .then(function (data) {
                        var username = data['data']['username'],
                            name = data['data']['name'],
                            email = data['data']['email'],
                            gender = data['data']['gender'],
                            profilePic = data['data']['profileImageData'],
                            coverPic = data['data']['coverImageData'];

                        storage.set(accessToken, username, name, email, gender, profilePic, coverPic);

                        $state.go('welcome', {}, {reload: true});
                    }, function (err) {
                        handleError($scope, err)
                    })
            }, function (err) {
                handleError($scope, err)
            });
    };
}]);