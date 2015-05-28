var app = angular.module('SocialNetwork', ['ui.router', 'ngMessages', 'infinite-scroll']);

app.run(['$rootScope', '$state', 'API', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && !$rootScope.currentUser) {
            event.preventDefault();

            $state.go('welcome')
        }
    });
}]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('welcome', {
            url: '/',
            views: {
                main: {
                    templateUrl: 'views/welcome.html',
                    controller: 'HomeController'
                },
                navigation: {
                    templateUrl: 'views/common/navigation.html',
                    controller: 'NavigationController'
                },
                'search@welcome': {
                    templateUrl: 'views/common/search.html',
                    controller: 'SearchController'
                },
                additional: {
                    templateUrl: 'views/news-feed.html',
                    controller: 'NewsFeedController'
                },
                'post@welcome': {
                    templateUrl: 'views/common/post.html',
                    controller: 'PostController'
                },
                'comment@welcome': {
                    templateUrl: 'views/common/comment.html',
                    controller: 'CommentController'
                },
                'friends@welcome': {
                    templateUrl: 'views/common/friends.html',
                    controller: 'NewsFeedController'
                }
            },
            data: {
                requireLogin: false
            }
        })
        .state('login', {
            url: '/login',
            views: {
                main: {
                    templateUrl: 'views/login.html',
                    controller: 'LoginController'
                },
                navigation: {
                    templateUrl: 'views/common/navigation.html',
                    controller: 'NavigationController'
                }
            },
            data: {
                requireLogin: false
            }
        })
        .state('register', {
            url: '/register',
            views: {
                main: {
                    templateUrl: 'views/register.html',
                    controller: 'RegisterController'
                },
                navigation: {
                    templateUrl: 'views/common/navigation.html',
                    controller: 'NavigationController'
                }
            },
            data: {
                requireLogin: false
            }
        })
        .state('editProfile', {
            url: '/editProfile',
            views: {
                main: {
                    templateUrl: 'views/edit-profile.html',
                    controller: 'EditProfileController'
                },
                navigation: {
                    templateUrl: 'views/common/navigation.html',
                    controller: 'NavigationController'
                },
                'search@editProfile': {
                    templateUrl: 'views/common/search.html',
                    controller: 'SearchController'
                }
            },
            data: {
                requireLogin: true
            }
        })
        .state('changePassword', {
            url: '/changePassword',
            views: {
                main: {
                    templateUrl: 'views/change-password.html',
                    controller: 'ChangePasswordController'
                },
                navigation: {
                    templateUrl: 'views/common/navigation.html',
                    controller: 'NavigationController'
                },
                'search@changePassword': {
                    templateUrl: 'views/common/search.html',
                    controller: 'SearchController'
                }
            },
            data: {
                requireLogin: true
            }
        })
        .state('viewUserWall', {
            url: '/users/:username',
            views: {
                main: {
                    templateUrl: 'views/user-wall.html',
                    controller: 'ViewUserWallController'
                },
                navigation: {
                    templateUrl: 'views/common/navigation.html',
                    controller: 'NavigationController'
                },
                'search@viewUserWall': {
                    templateUrl: 'views/common/search.html',
                    controller: 'SearchController'
                },
                'post@viewUserWall': {
                    templateUrl: 'views/common/post.html',
                    controller: 'PostController'
                }
            },
            data: {
                requireLogin: true
            }
        })
        .state('friends', {
            url: '/friends',
            views: {
                main: {
                    templateUrl: 'views/friends.html',
                    controller: 'FriendsController'
                },
                navigation: {
                    templateUrl: 'views/common/navigation.html',
                    controller: 'NavigationController'
                },
                'search@friends': {
                    templateUrl: 'views/common/search.html',
                    controller: 'SearchController'
                }
            },
            data: {
                requireLogin: true
            }
        });

    $urlRouterProvider.otherwise('/');
});