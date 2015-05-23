var app = angular.module('SocialNetwork', ['ui.router', 'ngMessages']);

app.run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && !sessionStorage['accessToken']) {
            event.preventDefault();

            $state.go('welcome')
        }
    });
});

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
        });

    $urlRouterProvider.otherwise('/');
});