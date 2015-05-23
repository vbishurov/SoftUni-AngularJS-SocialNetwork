var app = angular.module('SocialNetwork', ['ui.router', 'ngMessages']);

app.run(['$rootScope', '$state', 'API', function ($rootScope, $state, api) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && !$rootScope.currentUser) {
            event.preventDefault();

            $state.go('welcome')
        } else if (requireLogin && toParams['username']) {
            var _event = event;

            api.getUserData(toParams['username'], true)
                .then(function (data) {
                    if (!data['data']['isFriend']) {
                        _event.preventDefault();

                        $state.go('welcome');
                    } else {
                        $rootScope['user'] = data['data'];
                    }
                })
        }
    });
}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('welcome', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            data: {
                requireLogin: false
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            data: {
                requireLogin: false
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterController',
            data: {
                requireLogin: false
            }
        })
        .state('editProfile', {
            url: '/editProfile',
            templateUrl: 'views/edit-profile.html',
            controller: 'EditProfileController',
            data: {
                requireLogin: true
            }
        })
        .state('changePassword', {
            url: '/changePassword',
            templateUrl: 'views/change-password.html',
            controller: 'ChangePasswordController',
            data: {
                requireLogin: true
            }
        })
        .state('viewUserWall', {
            url: '/users/:username',
            templateUrl: 'views/user-wall.html',
            controller: 'ViewUserWallController',
            data: {
                requireLogin: true
            }
        });

    $urlRouterProvider.otherwise('/');
});