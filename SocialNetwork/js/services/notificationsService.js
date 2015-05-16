app.factory('notificationsService', [function () {
    function Notifications() {
    }

    Notifications.prototype.success = function (message) {
        noty({
            layout: 'top',
            timeout: 3000,
            type: 'success',
            text: message,
            animation: {
                open: 'animated zoomInDown',
                close: 'animated zoomOutUp',
                speed: 200
            }
        });
    };

    Notifications.prototype.error = function (message) {
        noty({
            layout: 'top',
            timeout: 5000,
            type: 'error',
            text: message,
            animation: {
                open: 'animated zoomInDown',
                close: 'animated zoomOutUp',
                speed: 200
            }
        });
    };

    return new Notifications();
}]);