app.factory('notification', [function () {
    return {
        success: function (message) {
            noty({
                layout: 'top',
                timeout: 3000,
                type: 'success',
                text: message
            });
        },
        error: function (message) {
            noty({
                layout: 'top',
                timeout: 5000,
                type: 'error',
                text: message
            });
        }
    }
}]);