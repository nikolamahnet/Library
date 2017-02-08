libraryApp.controller('RegisterCtrl', function($scope, AuthenticationService){

    $scope.register=function(valid){
        if ($scope.credentials.password==$scope.credentials.password2)
            AuthenticationService.register($scope.credentials);

    };
});

libraryApp.controller('LoginCtrl', function($scope, AuthenticationService, $location){
    $scope.login=function(){
        AuthenticationService.login($scope.credentials, function(data){

        });
    };

    $scope.register=function(){
        $location.path('/register');
    };
});

libraryApp.controller('LibraryCtrl', function($scope, $location){
    console.log('test');
    $scope.login=function(){
        $location.path('/login');
    }
})