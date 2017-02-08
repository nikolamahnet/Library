var libraryApp = angular.module('libraryApp', ['ngRoute']).run(function($rootScope){
    if (!sessionStorage.getItem('authenticated') || sessionStorage.getItem('authenticated')=="false") {
        $rootScope.authenticated=false
    } else {
        $rootScope.authenticated=true;
    };

    if ($rootScope.authenticated) $rootScope.user=sessionStorage.getItem('user');

});

libraryApp.config(function($routeProvider){

    $routeProvider.when('/', {
        templateUrl: 'templates/main.html',
        controller: 'LibraryCtrl'
    }).when('/login', {
        templateUrl: 'templates/login.html',
        controller : 'LoginCtrl'
    }).when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    }).when('/admin', {
        templateUrl: 'templates/admin.html',
        controller: 'AdminCtrl'
    }).when('/user', {
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
    }).when('/:id', {
        templateUrl: 'templates/details.html',
        controller: 'DetailsCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});