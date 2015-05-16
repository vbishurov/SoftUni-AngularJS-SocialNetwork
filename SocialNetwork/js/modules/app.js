var app = angular.module('App', ['ngRoute', 'Filters']);

app.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function () {
        var isLoggedIn = sessionStorage['logged-in'] || localStorage['logged-in'],
            isUnauthorizedRoute = $location.path() !== '/welcome' && $location.path() !== '/register' && $location.path() !== '/login';

        if (!isLoggedIn && isUnauthorizedRoute) {
            $location.path('/welcome');
        } else if (isLoggedIn && $location.path() === '/welcome') {
            $location.path('/home');
        }
    })
}]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'UserController',
            templateUrl: 'views/home.html'
        })
        .when('/welcome', {
            templateUrl: 'views/welcome.html'
        })
        .when('/login', {
            controller: 'UserController',
            templateUrl: 'views/login.html'
        })
        .when('/register', {
            controller: 'UserController',
            templateUrl: 'views/register.html'
        })
        .when('/friendRequests', {
            templateUrl: 'views/friend-requests.html',
            controller: 'RequestsController'
        })
        .otherwise({
            redirectTo: '/welcome'
        });
});