app.factory('headersService', [function () {
    function Headers() {
    }

    Headers.prototype.getHeaders = function (extras) {
        var headers = {
            'Content-Type': 'application/json'
        };

        if (typeof extras === 'object' && extras !== null) {
            angular.forEach(extras, function (value, key) {
                headers[key] = value;
            });
        }

        if (sessionStorage['logged-in']) {
            headers['Authorization'] = 'Bearer ' + sessionStorage['logged-in'];
        } else if (localStorage['logged-in']) {
            headers['Authorization'] = 'Bearer ' + localStorage['logged-in'];
        }

        return headers;
    };

    return new Headers();
}]);