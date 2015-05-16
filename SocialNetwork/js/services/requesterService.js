app.factory('requesterService', ['$http', 'headersService', '$q', function ($http, headers, $q) {
    function Requester(baseUrl) {
        this._baseUrl = baseUrl;
    }

    Requester.prototype.get = function (serviceUrl, extraHeaders) {
        return makeRequest('GET', headers.getHeaders(extraHeaders), this._baseUrl + serviceUrl);
    };

    Requester.prototype.post = function (serviceUrl, data, extraHeaders) {
        return makeRequest('POST', headers.getHeaders(extraHeaders), this._baseUrl + serviceUrl, data);
    };

    Requester.prototype.put = function (serviceUrl, data, extraHeaders) {
        return makeRequest('PUT', headers.getHeaders(extraHeaders), this._baseUrl + serviceUrl, data);
    };

    Requester.prototype.remove = function (serviceUrl, extraHeaders) {
        return makeRequest('DELETE', headers.getHeaders(extraHeaders), this._baseUrl + serviceUrl);
    };

    function makeRequest(method, headers, url, data) {
        var deferred = $q.defer();

        $http(
            {
                method: method,
                headers: headers,
                url: url,
                data: JSON.stringify(data)
            })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    return new Requester('http://softuni-social-network.azurewebsites.net/api/');
}]);