var app = angular.module('SocialNetwork', ['ngRoute', 'ngMessages']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/photo/:id', {
            templateUrl: 'views/detail.html',
            controller: 'DetailController'
        })
        .otherwise({
            redirectTo: '/'
        });
});