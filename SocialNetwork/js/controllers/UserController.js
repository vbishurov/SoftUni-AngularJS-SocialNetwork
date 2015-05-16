app.controller('UserController', ['$scope', 'requesterService', 'storageService', '$location', 'notificationsService',
    function ($scope, requester, storage, $location, notifications) {
        setScopeStorage(localStorage['logged-in']);

        $scope.gender = localStorage['gender'];
        $scope.login = function (user) {
            var username = user['username'],
                password = user['password'],
                data;

            if (!user || !username || !password) {
                notifications.error('Please enter username and password');
                return;
            }

            $scope.buttonClicked = true;

            data = {
                username: username,
                password: password
            };

            requester.post('users/login', data)
                .then(function (data) {
                    var accessToken = data['access_token'],
                        username = data['userName'],
                        rememberMe = user['remember'],
                        authorization = {Authorization: 'Bearer ' + accessToken};

                    requester.get('me', authorization)
                        .then(function (data) {
                            localStorage['gender'] = data['gender'];
                            var fullName = data['name'];

                            storage.set(rememberMe, accessToken, username, fullName);

                            notifications.success('Successfully logged in!');

                            $location.url('/home');
                        }, function (err) {
                            $scope.buttonClicked = false;
                            console.error(err);
                            notifications.error('There was an error logging in!')
                        })
                }, function (err) {
                    $scope.buttonClicked = false;
                    console.error(err);
                    notifications.error('There was an error logging in!')
                })
        };

        $scope.register = function (user) {
            var username = user['username'],
                password = user['password'],
                repeatPassword = user['repeatPassword'],
                fullName = user['name'],
                email = user['email'],
                gender = user['gender'],
                rememberMe = user['remember'],
                emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                data;

            if (!user || !username || !password || !repeatPassword || !fullName || !email || !gender) {
                notifications.error('Please enter the required information');
                return;
            } else if (password !== repeatPassword) {
                notifications.error('Password and repeat password do not match');
                return;
            } else if (password.length < 6) {
                notifications.error('Minimum password length is 6');
                return;
            }
            else if (!emailRegex.test(email)) {
                notifications.error('Please enter a valid email');
                return;
            }

            $scope.buttonClicked = true;

            data = {
                username: username,
                password: password,
                confirmPassword: repeatPassword,
                name: fullName,
                email: email,
                gender: Number(gender)
            };

            requester.post('users/register', data)
                .then(function (data) {
                    storage.set(rememberMe, data['access_token'], username, fullName);

                    notifications.success('Successfully registered!');

                    $location.url('/home');
                }, function (err) {
                    $scope.buttonClicked = false;
                    console.error(err);
                    notifications.error('There was an error registering!')
                })
        };

        $scope.logout = function () {
            $scope.buttonClicked = true;

            requester.post('users/logout')
                .then(function () {
                    storage.clear(true);
                    storage.clear(false);

                    notifications.success('Successfully logged out!');

                    $location.url('/welcome');
                }, function (err) {
                    $scope.buttonClicked = false;
                    console.error(err);
                    notifications.error('There was an error logging out!')
                })
        };

        function setScopeStorage(isPersistent) {
            if (isPersistent) {
                if (!localStorage['fullName'] || !localStorage['username']) {
                    return;
                }

                $scope.fullName = localStorage['fullName'];
                $scope.username = localStorage['username'];
            } else {
                if (!sessionStorage['fullName'] || !sessionStorage['username']) {
                    return;
                }

                $scope.fullName = sessionStorage['fullName'];
                $scope.username = sessionStorage['username'];
            }
        }
    }]);