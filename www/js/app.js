// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform, GlobalConfig, $ionicPopup) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            console.log('Hello!!');
            applewatch.init(function successHandler (appGroupId) {
                        console.log('successfully initialised');
                                    $ionicPopup.alert({
                                                               title: '<span class="alertTitle" >GOOD</span>',
                                                               template: '<p class="alertBody" >Your </p>'
                                                               });
                                             }, function errorHandler (err) {
                                             $ionicPopup.alert({
                                                               title: '<span class="alertTitle" >BAD</span>',
                                                               template: '<p class="alertBody" >Your user role cannot access Dashboard!</p>'
                                                               });
                                             },'group.com.ringchart.demo.dan');
                             
                             
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

                cordova.getAppVersion.getVersionNumber().then(function (version) {
                    GlobalConfig.appVersion = version;
                    console.log("app version: " + version);
                });

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.transition('none');


        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('home', {
                url: '/home',
                templateUrl: 'js/pages/home/home.html',
                controller: 'HomeCtrl'
            })

            .state('cexp', {
                url: '/cexp',
                templateUrl: 'templates/cexp.html',
                controller: 'CexpCtrl'
            })

            .state('cexpTerminals', {
                url: '/cexpTerminals',
                params: {
                    'airportTypeName': ''
                },
                templateUrl: 'templates/cexpTerminals.html',
                controller: 'cexpTerminalsCtrl'
            })

            .state('team', {
                url: '/team',
                templateUrl: 'templates/team.html',
                controller: 'TeamCtrl'
            })

            .state('ontime', {
                url: '/ontime',
                templateUrl: 'templates/ontime.html',
                controller: 'OntimeCtrl'
            })

            .state('safety', {
                url: '/safety',
                templateUrl: 'templates/safety.html',
                controller: 'SafetyCtrl'
            })

            .state('incident', {
                url: '/incident',
                templateUrl: 'templates/incident.html',
                controller: 'IncidentCtrl'
            })

            .state('activity', {
                url: '/activity',
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            })

            .state('terms', {
                url: '/terms',
                templateUrl: 'templates/terms.html'
            })

            .state('watch', {
                url: '/watch',
                templateUrl: 'js/pages/watch/watch.html',
                controller: 'WatchCtrl'
            })

        /*
         .state('app', {
         url: '/app',
         abstract: true,
         templateUrl: 'templates/menu.html',
         controller: 'AppCtrl'
         })

         .state('app.search', {
         url: '/search',
         views: {
         'menuContent': {
         templateUrl: 'templates/search.html'
         }
         }
         })

         .state('app.browse', {
         url: '/browse',
         views: {
         'menuContent': {
         templateUrl: 'templates/browse.html'
         }
         }
         })
         .state('app.playlists', {
         url: '/playlists',
         views: {
         'menuContent': {
         templateUrl: 'templates/playlists.html',
         controller: 'PlaylistsCtrl'
         }
         }
         })

         .state('app.single', {
         url: '/playlists/:playlistId',
         views: {
         'menuContent': {
         templateUrl: 'templates/playlist.html',
         controller: 'PlaylistCtrl'
         }
         }
         });
         */


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });
