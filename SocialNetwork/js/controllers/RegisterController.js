app.controller('RegisterController', ['$scope', 'API', 'storage', '$location', function ($scope, api, storage, $location) {

    $scope.register = function (username, password, confirmPassword, name, email, gender) {
        api.register(username, password, confirmPassword, name, email, gender)
            .then(function (data) {
                var accessToken = data['data']['access_token'];
                storage.set(accessToken);

                api.getUser()
                    .then(function (data) {
                        var username = data['data']['username'];
                        var name = data['data']['name'];
                        var email = data['data']['email'];
                        var gender = data['data']['gender'];
                        var profilePic = data['data']['profilePic'];
                        var coverPic = data['data']['coverPic'];

                        storage.set(accessToken, username, name, email, gender, profilePic, coverPic);

                        $location.path('/');
                    });
            })
    }
}]);