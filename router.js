module.exports = {
    route: function (method, url) {
        switch (method) {
            case 'GET':
                switch (url) {
                    case '/api/name':
                        return 'Duy Mai';
                    case '/api/age':
                        return '17';
                }
                break;
            case 'POST':
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
        }
    }
}