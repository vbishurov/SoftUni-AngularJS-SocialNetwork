app.controller('EditProfileController', ['$scope', 'API', 'storage', 'errorHandler', '$state', '$rootScope', function ($scope, api, storage, handleError, $state, $rootScope) {
    console.log($rootScope);

    if (!$scope.newProfilePic) {
        $scope.newProfilePic = $scope.profilePic
    }

    if (!$scope.newCoverPic) {
        $scope.newCoverPic = $scope.coverPic
    }

    $scope.editProfile = function (name, email, gender, profilePic, coverPic) {
        var profilePicBase64 = profilePic.split(',')[1],
            coverPicBase64 = coverPic.split(',')[1];

        api.editProfile(name, email, gender, profilePicBase64, coverPicBase64)
            .then(function (data) {
                api.getCurrentUserData()
                    .then(function (data) {
                        var username = data['data']['username'],
                            name = data['data']['name'],
                            email = data['data']['email'],
                            gender = data['data']['gender'],
                            profilePic = data['data']['profileImageData'],
                            coverPic = data['data']['coverImageData'];

                        storage.set(null, username, name, email, gender, profilePic, coverPic);

                        $state.go('welcome');
                    }, function (err) {
                        handleError($scope, err)
                    })

            }, function (err) {
                handleError($scope, err)
            });
    };

    $scope.uploadFile = function (event) {
        $scope.errorPic = false;
        $scope.errorCoverPic = false;
        var name = event['srcElement']['name'];

        var file = event.target['files'][0],
            reader = new FileReader();

        if (file['size'] > 1024000 && name === 'newCoverPic') {
            $scope.errorCoverPic = true;
            $scope.errorCoverPicMessage = 'Cover picture size must be less than 1024kb';
            angular.element(event['srcElement']).val(null);

            triggerChange();

            return;
        } else if (file['size'] > 128000 && name === 'newProfilePic') {
            $scope.errorPic = true;
            $scope.errorPicMessage = 'Profile picture size must be less than 128kb';
            angular.element(event['srcElement']).val(null);

            triggerChange();

            return;
        }

        $scope.errorPic = false;

        reader.onload = function (event) {
            $scope[name] = event.currentTarget.result;

            triggerChange();
        };

        reader.readAsDataURL(file);
    };

    function triggerChange() {
        var triggerChangeOn = document.querySelector('input[name="gender"]:checked')
        angular.element(triggerChangeOn).triggerHandler('click');
    }
}]);