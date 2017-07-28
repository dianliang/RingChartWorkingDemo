angular.module('starter.controllers.watch', [])
    .controller('WatchCtrl', function ($scope, $state, $ionicPopup) {

        $scope.onTestAlert = function () {
            console.log('Test alert');
            $ionicPopup.alert({
                title: '<span class="alertTitle" >GOOD</span>',
                template: '<p class="alertBody" >Your </p>'
            });
        };

        $scope.onInitWatch = function () {
            
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
        };

        $scope.onSendNotification = function () {
            applewatch.registerNotifications(function success() {
                var payload = {
                    "title": "Short!",
                    "category": "default",
                    "body": "Shown in the long-look interface to provide more detail",
                    "badge": 1
                };

                applewatch.sendNotification(function succ() {
                    $ionicPopup.alert({
                        title: '<span class="alertTitle" >GOD</span>',
                        template: '<p class="alertBody" >Notification sent!</p>'
                    });
                }, function err() {
                    $ionicPopup.alert({
                        title: '<span class="alertTitle" >bad</span>',
                        template: '<p class="alertBody" >Notification not sent!</p>'
                    });
                }, payload);


            }, function error() {
                $ionicPopup.alert({
                    title: '<span class="alertTitle" >bad</span>',
                    template: '<p class="alertBody" >register failed not sent!</p>'
                });
            });

        };

        $scope.sendMessage = function () {
                applewatch.sendMessage({name:'text', age:25}, 'TEST123', function succ() {
                $ionicPopup.alert({
                    title: '<span class="alertTitle" >Message sent</span>',
                    template: '<p class="alertBody" >Message sent </p>'
                });
            }, function error() {
                $ionicPopup.alert({
                    title: '<span class="alertTitle" >Bad</span>',
                    template: '<p class="alertBody" >Message no sent! </p>'
                });
            })
        };
                
        
                $scope.regListener = function(){
                    applewatch.addListener("button", function (message) {
                                       // handle your message here
                                           $ionicPopup.alert({
                                                             title: '<span class="alertTitle" >Listener triggerd</span>',
                                                             template: message
                                                             });
                                           
                    });
            
                    $ionicPopup.alert({
                                  title: '<span class="alertTitle" >Listener button added</span>',
                                  template: '<p class="alertBody" >Listener added! </p>'
                                  });
                
                
                }

    });
