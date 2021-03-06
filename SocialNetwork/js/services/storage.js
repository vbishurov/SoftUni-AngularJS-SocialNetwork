app.factory('storage', ['$rootScope', function ($rootScope) {
    return {
        set: function (accessToken, username, name, email, gender, profilePic, coverPic) {
            if (!accessToken) {
                accessToken = $rootScope['accessToken'];
            }

            $rootScope.currentUser = {
                accessToken: accessToken,
                username: username,
                name: name,
                email: email,
                gender: gender,
                profilePic: profilePic,
                coverPic: coverPic
            };

            sessionStorage['currentUser'] = JSON.stringify($rootScope['currentUser']);
        },
        clear: function () {
            delete $rootScope['currentUser'];
            delete sessionStorage['currentUser'];
        }
    }
}]);