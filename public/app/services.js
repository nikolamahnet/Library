libraryApp.factory('AuthenticationService', function($location, $http, $rootScope){

    return{
        login: function(credentials){
            $http.post('/authenticate', {credentials: credentials}).success(function(data){
                if(data.status == 'ok'){
                    sessionStorage.setItem('authenticated', true);
                    sessionStorage.setItem('user', JSON.stringify(data.user));

                    $rootScope.authenticated = true;
                    $rootScope.user = data.user;

                    $location.path('/');
                }
                else{
                    alert('Wrong credentials!');
                    console.log(data);
                }
            });
        },

        logout: function(credentials){
            sessionStorage.setItem('authentication', false);
            $rootScope.authenticated = false;
            $location.path('/');
        },

        register: function(credentials){
            $http.post('/api/users', {user:credentials}).success(function(data){
                if(data.status == 'ok'){
                    $location.path('/login');
                }
                else{
                    alert('Error while registering!');
                }
            });
        }
    }
});