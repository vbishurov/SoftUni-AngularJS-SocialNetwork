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
        getCurrentUserData: function () {
            checkAuthorization();

            return $http.get(baseUrl + 'me', headers);
        },
        logout: function () {
            checkAuthorization();

            return $http.post(baseUrl + 'users/logout', {}, headers);
        },
        getOwnFriends: function () {
            checkAuthorization();

            return $http.get(baseUrl + 'me/friends', headers);
        },
        getFriendRequests: function () {
            checkAuthorization();

            return $http.get(baseUrl + 'me/requests', headers);
        },
        sendFriendRequest: function (username) {
            checkAuthorization();

            return $http.post(baseUrl + 'me/requests/' + username, {}, headers);
        },
        acceptFriendRequest: function (requestId) {
            checkAuthorization();

            return $http.put(baseUrl + 'me/requests/' + requestId + '?status=approved', {}, headers);
        },
        denyFriendRequest: function (requestId) {
            checkAuthorization();

            return $http.put(baseUrl + 'requests/' + requestId + '?status=rejected', {}, headers);
        },
        getNewsFeed: function (startId, pageSize) {
            checkAuthorization();

            return $http.get(baseUrl + 'me/feed?StartPostId=' + startId + '&PageSize=' + pageSize, headers);
        },
        changePassword: function (oldPassword, newPassword, repeatNewPassword) {
            checkAuthorization();

            var data = {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: repeatNewPassword
            };

            return $http.put(baseUrl + 'me/changepassword', data, headers);
        },
        editProfile: function (name, email, profileImageData, coverImageData, gender) {
            checkAuthorization();

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
            checkAuthorization();

            var serviceUrl = baseUrl + 'users/' + username;

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        searchUsers: function (query) {
            checkAuthorization();

            return $http.get(baseUrl + 'users/search?searchTerm=' + query, headers);
        },
        getFriendWall: function (username, startId, pageSize) {
            checkAuthorization();

            return $http.get(baseUrl + 'users/' + username + '/wall?StartPostId=' + startId + '&PageSize=' + pageSize, headers);
        },
        getFriendsOfFriends: function (username, isPreviewData) {
            checkAuthorization();

            var serviceUrl = baseUrl + 'users/' + username + '/friends';

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        getPostById: function (id) {
            checkAuthorization();

            return $http.get(baseUrl + 'Posts/' + id, headers);
        },
        addPost: function (targetUsername, postContent) {
            checkAuthorization();

            var data = {
                username: targetUsername,
                postContent: postContent
            };

            return $http.post(baseUrl + 'posts', data, headers);
        },
        editPost: function (postId, newText) {
            checkAuthorization();

            var data = {
                postContent: newText
            };

            return $http.put(baseUrl + 'posts/' + postId, data, headers);
        },
        deletePost: function (postId) {
            checkAuthorization();

            return $http.delete(baseUrl + 'Posts/' + postId, headers);
        },
        getPostLikes: function (postId, isPreviewData) {
            checkAuthorization();

            var serviceUrl = baseUrl + 'Posts/' + postId + '/likes';

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        likePost: function (postId) {
            checkAuthorization();

            return $http.post(baseUrl + 'Posts/' + postId + '/likes', {}, headers);
        },
        unlikePost: function (postId) {
            checkAuthorization();

            return $http.delete(baseUrl + 'Posts/' + postId + '/likes', headers);
        },
        getPostComments: function (postId) {
            checkAuthorization();

            return $http.get(baseUrl + 'posts/' + postId + '/comments', headers);
        },
        commentPost: function (postId, commentText) {
            checkAuthorization();

            var data = {
                commentContent: commentText
            };

            return $http.post(baseUrl + 'posts/' + postId + '/comments', Database, headers)
        },
        getCommentLikes: function (postId, commentId, isPreviewData) {
            checkAuthorization();

            var serviceUrl = baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes';

            if (isPreviewData) {
                serviceUrl += '/preview';
            }

            return $http.get(serviceUrl, headers);
        },
        likeComment: function (postId, commentId) {
            checkAuthorization();

            return $http.post(baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes', {}, headers)
        },
        unlikeComment: function (postId, commentId) {
            checkAuthorization();

            return $http.delete(baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes', {}, headers)
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