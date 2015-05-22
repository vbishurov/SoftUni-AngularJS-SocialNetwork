app.directive('file', ['$parse', function ($parse) {
    return {
        restrict: 'E',
        template: '<input type="file" />',
        replace: true,
        require: 'ngModel',
        link: function (scope, element, attributes) {
            var listener = function () {
                scope.$apply(function () {
                    var modelGetter = $parse(attributes['ngModel']);

                    var modelSetter = modelGetter.assign;

                    base64(element[0]['files'][0], function (data) {
                        modelSetter(scope, data['base64']);
                    });
                });
            };

            element.bind('change', listener);
        }
    };

    function base64(image, callback) {
        var file = {};

        var reader = new FileReader();

        reader.onload = function (e) {
            file.base64 = btoa(e.target.result);
            callback(file)
        };

        file['filetype'] = image['type'];
        file['size'] = image['size'];
        file['filename'] = image['name'];

        reader.readAsBinaryString(image);
    }
}]);