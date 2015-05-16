app.factory('storageService', [function () {
    function StorageManager() {
    }

    StorageManager.prototype.set = function (isPersistent, accessToken, userName, fullName) {
        if (isPersistent) {
            localStorage['logged-in'] = accessToken;
            localStorage['username'] = userName;
            localStorage['fullName'] = fullName;
        } else {
            sessionStorage['logged-in'] = accessToken;
            sessionStorage['username'] = userName;
            sessionStorage['fullName'] = fullName;
        }
    };

    StorageManager.prototype.clear = function (isPersistent) {
        if (isPersistent) {
            localStorage.removeItem('logged-in');
            localStorage.removeItem('username');
            localStorage.removeItem('fullName');
        } else {
            sessionStorage.removeItem('logged-in');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('fullName');
        }
    };

    return new StorageManager();
}]);