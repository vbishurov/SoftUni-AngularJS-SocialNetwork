app.controller('LoginController', ['$scope', 'API', 'storage', '$location', function ($scope, api, storage, $location) {

    $scope.login = function (username, password) {
        api.login(username, password)
            .then(function (data) {
                var accessToken = data['data']['access_token'];
                storage.set(accessToken);

                api.getUser()
                    .then(function (data) {
                        var username = data['data']['username'],
                            name = data['data']['name'],
                            email = data['data']['email'],
                            gender = data['data']['gender'],
                            profilePic = data['data']['profileImageData'],
                            coverPic = data['data']['coverImageData'];

                        storage.set(accessToken, username, name, email, gender, profilePic, coverPic);

                        $location.path('/');
                    })
            });
    };
}]);