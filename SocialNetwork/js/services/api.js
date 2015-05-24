app.factory('API', ['$rootScope', '$http', function ($rootScope, $http) {
    var baseUrl = 'http://softuni-social-network.azurewebsites.net/api/',
        headers = {
            headers: {}
        };

    setAuthorization();

    return {
        isAuthenticated: function () {
            if ($rootScope['currentUser']) {
                return true;
            } else if (sessionStorage['currentUser']) {
                $rootScope['currentUser'] = JSON.parse(sessionStorage['currentUser']);
                return true;
            } else {
                return false;
            }
        },
        login: function (username, password) {
            setAuthorization();

            var data = {
                username: username,
                password: password
            };

            return $http.post(baseUrl + 'users/login', data, headers);
        },
        register: function (username, password, confirmPassword, name, email, gender) {
            setAuthorization();

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
        getCurrentUserData: function () {
            setAuthorization();

            return $http.get(baseUrl + 'me', headers);
        },
        logout: function () {
            setAuthorization();

            return $http.post(baseUrl + 'users/logout', {}, headers);
        },
        getOwnFriends: function () {
            setAuthorization();

            return $http.get(baseUrl + 'me/friends', headers);
        },
        getFriendRequests: function () {
            setAuthorization();

            return $http.get(baseUrl + 'me/requests', headers);
        },
        sendFriendRequest: function (username) {
            setAuthorization();

            return $http.post(baseUrl + 'me/requests/' + username, {}, headers);
        },
        acceptFriendRequest: function (requestId) {
            setAuthorization();

            return $http.put(baseUrl + 'me/requests/' + requestId + '?status=approved', {}, headers);
        },
        denyFriendRequest: function (requestId) {
            setAuthorization();

            return $http.put(baseUrl + 'requests/' + requestId + '?status=rejected', {}, headers);
        },
        getNewsFeed: function (startId, pageSize) {
            setAuthorization();

            return $http.get(baseUrl + 'me/feed?StartPostId=' + startId + '&PageSize=' + pageSize, headers);
        },
        changePassword: function (oldPassword, newPassword, repeatNewPassword) {
            setAuthorization();

            var data = {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: repeatNewPassword
            };

            return $http.put(baseUrl + 'me/changepassword', data, headers);
        },
        editProfile: function (name, email, gender, profileImageData, coverImageData) {
            setAuthorization();

            var data = {
                name: name,
                email: email,
                profileImageData: profileImageData,
                coverImageData: coverImageData,
                gender: gender
            };

            return $http.put(baseUrl + 'me', data, headers);
        },
        getUserData: function (username, isPreviewData) {
            setAuthorization();

            var serviceUrl = baseUrl + 'users/' + username;

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        searchUsers: function (query) {
            setAuthorization();

            return $http.get(baseUrl + 'users/search?searchTerm=' + query, headers);
        },
        getFriendWall: function (username, startId, pageSize) {
            setAuthorization();

            return $http.get(baseUrl + 'users/' + username + '/wall?StartPostId=' + startId + '&PageSize=' + pageSize, headers);
        },
        getFriendsOfFriends: function (username, isPreviewData) {
            setAuthorization();

            var serviceUrl = baseUrl + 'users/' + username + '/friends';

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        getPostById: function (id) {
            setAuthorization();

            return $http.get(baseUrl + 'Posts/' + id, headers);
        },
        addPost: function (targetUsername, postContent) {
            setAuthorization();

            var data = {
                username: targetUsername,
                postContent: postContent
            };

            return $http.post(baseUrl + 'posts', data, headers);
        },
        editPost: function (postId, newText) {
            setAuthorization();

            var data = {
                postContent: newText
            };

            return $http.put(baseUrl + 'posts/' + postId, data, headers);
        },
        deletePost: function (postId) {
            setAuthorization();

            return $http.delete(baseUrl + 'Posts/' + postId, headers);
        },
        getPostLikes: function (postId, isPreviewData) {
            setAuthorization();

            var serviceUrl = baseUrl + 'Posts/' + postId + '/likes';

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        likePost: function (postId) {
            setAuthorization();

            return $http.post(baseUrl + 'Posts/' + postId + '/likes', {}, headers);
        },
        unlikePost: function (postId) {
            setAuthorization();

            return $http.delete(baseUrl + 'Posts/' + postId + '/likes', headers);
        },
        getPostComments: function (postId) {
            setAuthorization();

            return $http.get(baseUrl + 'posts/' + postId + '/comments', headers);
        },
        commentPost: function (postId, commentText) {
            setAuthorization();

            var data = {
                commentContent: commentText
            };

            return $http.post(baseUrl + 'posts/' + postId + '/comments', Database, headers)
        },
        getCommentLikes: function (postId, commentId, isPreviewData) {
            setAuthorization();

            var serviceUrl = baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes';

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        likeComment: function (postId, commentId) {
            setAuthorization();

            return $http.post(baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes', {}, headers)
        },
        unlikeComment: function (postId, commentId) {
            setAuthorization();

            return $http.delete(baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes', {}, headers)
        }
    };

    function setAuthorization() {
        if ($rootScope['currentUser']) {
            headers['headers']['Authorization'] = 'Bearer ' + $rootScope['currentUser']['accessToken'];
        } else if (sessionStorage['currentUser']) {
            $rootScope['currentUser'] = JSON.parse(sessionStorage['currentUser']);
            headers['headers']['Authorization'] = 'Bearer ' + $rootScope['currentUser']['accessToken'];
        } else {
            delete headers['headers']['Authorization'];
        }
    }
}]);