filters.filter('gender', function () {
    return function (input) {
        if (Number(input) === 0) {
            return 'Other';
        } else if (Number(input) === 1) {
            return 'Male';
        } else if (Number(input) === 2) {
            return 'Female';
        }
    }
});