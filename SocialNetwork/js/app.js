var app = angular.module('App', ['ngRoute']);

app.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
        if (!sessionStorage['logged-in'] && ($location.path() !== '/welcome' && $location.path() !== '/register' && $location.path() !== '/login')) {
            $location.path('/welcome');
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
        .otherwise({
            redirectTo: '/welcome'
        });
});