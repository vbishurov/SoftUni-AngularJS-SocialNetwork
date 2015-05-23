app.factory('storage', [function () {
    return {
        set: function (accessToken, username, name, email, gender, profilePic, coverPic) {
            if (!accessToken) {
                accessToken = sessionStorage['accessToken'];
            }

            sessionStorage['accessToken'] = accessToken;
            sessionStorage['username'] = username;
            sessionStorage['name'] = name;
            sessionStorage['email'] = email;
            sessionStorage['gender'] = gender;
            sessionStorage['profilePic'] = profilePic;
            sessionStorage['coverPic'] = coverPic;
        },
        clear: function () {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('gender');
            sessionStorage.removeItem('profilePic');
            sessionStorage.removeItem('coverPic');
        }
    }
}]);