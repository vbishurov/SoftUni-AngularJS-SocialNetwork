app.factory('API', function ($http) {

    var baseUrl = 'http://softuni-social-network.azurewebsites.net/api/',
        headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

    return {
        isAuthenticated: function () {
            return sessionStorage['accessToken'] ? true : false;
        },
        getUser: function () {
            checkAuthorization();

            return $http.get(baseUrl + 'me', headers);
        },
        login: function (username, password) {
            checkAuthorization();

            var data = {
                username: username,
                password: password
            };

            return $http.post(baseUrl + 'users/login', data, headers);
        },
        register: function (username, password, confirmPassword, name, email, gender) {
            checkAuthorization();

            var data = {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                name: name,
                email: email,
                gender: gender
            };

            return $http.post(baseUrl + 'users/register', data, headers);
        },
        logout: function () {
            checkAuthorization();

            return $http.post(baseUrl + 'users/logout', {}, headers);
        }
    };

    function checkAuthorization() {
        if (sessionStorage['accessToken']) {
            headers['headers']['Authorization'] = 'Bearer ' + sessionStorage['accessToken'];
        } else {
            delete headers['headers']['Authorization'];
        }
    }
});