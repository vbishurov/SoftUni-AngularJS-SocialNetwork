app.controller('RegisterController', ['$scope', 'API', 'storage', '$state', 'errorHandler', '$rootScope', function ($scope, api, storage, $state, handleError,$rootScope) {
    console.log($rootScope);

    $scope.register = function (username, password, confirmPassword, name, email, gender) {
        $scope.clicked = true;
        $scope.error = false;

        api.register(username, password, confirmPassword, name, email, gender)
            .then(function (data) {
                var accessToken = data['data']['access_token'];
                storage.set(accessToken);

                api.getCurrentUserData()
                    .then(function (data) {
                        var username = data['data']['username'];
                        var name = data['data']['name'];
                        var email = data['data']['email'];
                        var gender = data['data']['gender'];
                        var profilePic = data['data']['profilePic'];
                        var coverPic = data['data']['coverPic'];

                        storage.set(accessToken, username, name, email, gender, profilePic, coverPic);

                        $state.go('welcome');
                    }, function (err) {
                        handleError($scope, err)
                    });
            }, function (err) {
                handleError($scope, err)
            })
    }
}]);