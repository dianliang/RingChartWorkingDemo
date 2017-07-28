angular.module('starter.controllers', ['starter.controllers.home','starter.controllers.watch'])
/*
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
  .controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
  })

  .controller('PlaylistCtrl', function($scope, $stateParams) {
  })
  */

  .controller('LoginCtrl', function($scope, $ionicPopup, $http, $state, $rootScope, GlobalConfig, $timeout, $ionicLoading) {

    if (window.innerHeight === 692 || window.innerHeight === 736) {
      console.log("reset login div");
      $(".loginDiv").css("margin-top", "340px");
    } else if (window.innerHeight === 568) {
      $(".loginDiv").css("margin-top", "220px");
    } else
      $(".loginDiv").css("margin-top", "300px");

    $(".pane:before").css("height", "80px");

    $scope.logon = {};
    $scope.logon.acceptTC = false;

    $scope.logon.userid = '';
    $scope.logon.password = '';

    $scope.versionNum = "";


    $timeout(function() {
      $scope.versionNum = GlobalConfig.appVersion;
    }, 1000);


    $scope.acceptTCClicked = function (checkboxItem) {

      $scope.logon.acceptTC = checkboxItem;

    };

    $scope.doLogin = function () {

      if ($scope.logon.userid.trim() === '' || $scope.logon.password.trim() === '') {
        $ionicPopup.alert({
          title: '<span class="alertTitle" >Login</span>',
          template: '<p class="alertBody" >Please enter your login credential</p>'
        });

        return;
      }

      if (!$scope.logon.acceptTC) {
        $ionicPopup.alert({
          title: '<span class="alertTitle" >Terms & Conditions Not Accepted</span>',
          template: '<p class="alertBody" >You must accept Dashboard Terms & Conditions before login</p>'
        });

        return;
      }
        $state.go('home');
        $ionicLoading.hide();
      //console.log("Login start...");

    };
  })

  .controller('CexpCtrl', function ($scope, GlobalServices, $http, $state, GlobalConfig, $interval, $ionicLoading) {

    console.log("Cexp started");

    var offsetHeight = 130;
    var contentHeight = window.innerHeight - offsetHeight;

    $scope.annotationButt = {};

    $scope.domesticButton = {};
    $scope.internationalButton = {};

    $scope.domesticButton5 = {
      "left": "101px",
      "top": "83px",
      "width": "115px",
      "height": "115px"
    };

    $scope.internationalButton5 = {
      "left": "101px",
      "top": "330px",
      "width": "115px",
      "height": "115px"
    };

    $scope.domesticButton6 = {
      "left": "118px",
      "top": "93px",
      "width": "142px",
      "height": "142px"
    };

    $scope.internationalButton6 = {
      "left": "118px",
      "top": "392px",
      "width": "142px",
      "height": "142px"
    };

    $scope.domesticButton6p = {
      "left": "126px",
      "top": "99px",
      "width": "165px",
      "height": "165px"
    };

    $scope.internationalButton6p = {
      "left": "126px",
      "top": "432px",
      "width": "165px",
      "height": "165px"
    };

    if (window.innerHeight === 623 || window.innerHeight === 692)
      contentHeight = contentHeight + 44;

    if (window.innerHeight === 623 || window.innerHeight === 667) {
      $scope.domesticButton = $scope.domesticButton6;
      $scope.internationalButton = $scope.internationalButton6;
    }else if(window.innerHeight === 524 || window.innerHeight === 568) {
      $scope.domesticButton = $scope.domesticButton5;
      $scope.internationalButton = $scope.internationalButton5;
    }else {
      $scope.domesticButton = $scope.domesticButton6p;
      $scope.internationalButton = $scope.internationalButton6p;
    }

    console.log("window height: " + window.innerHeight);

    $(".domesticButton").css("left", $scope.domesticButton.left);
    $(".domesticButton").css("top", $scope.domesticButton.top);
    $(".domesticButton").css("width", $scope.domesticButton.width);
    $(".domesticButton").css("height", $scope.domesticButton.height);

    $(".internationalButton").css("left", $scope.internationalButton.left);
    $(".internationalButton").css("top", $scope.internationalButton.top);
    $(".internationalButton").css("width", $scope.internationalButton.width);
    $(".internationalButton").css("height", $scope.internationalButton.height);


    $scope.annotationButt.clicked = false;

    $scope.annotationClicked = function () {

      if ($scope.annotationButt.clicked) {
        $scope.annotationButt.clicked = false;

        //console.log("sending email with screenshot");

        sendEmail(function() {

          var canvas = document.getElementById('sketchCexp');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, 420, 800);
          $('#sketchCexp').sketch('actions',[]);
          $('#sketchCexp').css("display", "none");

        });

      }
      else {
        $scope.annotationButt.clicked = true;
        $('#sketchCexp').css("display", "block");
        $('#sketchCexp').sketch({defaultColor: "#ff0"});
      }

    };

    $scope.domesticClicked = function() {

      $state.go('cexpTerminals', {
        'airportTypeName': 'Domestic'
      });

    };

    $scope.internationalClicked = function() {

      $state.go('cexpTerminals', {
        'airportTypeName': 'International'
      });

    };

    if (window.innerHeight === 623 || window.innerHeight === 692)
      contentHeight = contentHeight + 44;

    if (window.innerHeight === 623 || window.innerHeight === 667) {
      $scope.domesticButton = $scope.domesticButton6;
      $scope.internationalButton = $scope.internationalButton6;
    } else if(window.innerHeight === 524 || window.innerHeight === 568) {
      $scope.domesticButton = $scope.domesticButton5;
      $scope.internationalButton = $scope.internationalButton5;
    }else {
      $scope.domesticButton = $scope.domesticButton6p;
      $scope.internationalButton = $scope.internationalButton6p;
    }

    console.log("window height: " + window.innerHeight);

    $(".cexpChartCell").css("height", (contentHeight / 2) + "px");
    $(".cexpChartCell").css("width", (contentHeight / 2) + "px");

    var legendLabel = {};
    var deviceSettings = {
      iPhone5Height: 568,
      iPhone6Height: 667,
      iPhone6PHeight: 736
    };

    if (window.innerHeight === deviceSettings.iPhone5Height || window.innerHeight === deviceSettings.iPhone5Height - 44)
      legendLabel = {x: 97, y1: 16, y2: 29, y3: 32, lx: 110, ly: 75};
    else if (window.innerHeight === deviceSettings.iPhone6Height || window.innerHeight === deviceSettings.iPhone6Height - 44)
      legendLabel = {x: 122, y1: 18, y2: 34, y3: 40, lx: 135, ly: 95};
    else if (window.innerHeight === deviceSettings.iPhone6PHeight || window.innerHeight === deviceSettings.iPhone6PHeight - 44)
      legendLabel = {x: 139, y1: 21, y2: 38, y3: 47, lx: 155, ly: 105};

    var reloadCexpPage = function() {

      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });

      $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + 'pulse/cexp/airportType'
      }).then(function successCallback(response) {

        var results = response.data;
        //console.log('Here is the response: ' + JSON.stringify(summary) );

        GlobalServices.generateMultiChart('cexpDomesticChart', results.domesticAirport.lineOne, results.domesticAirport.lineTwo, results.domesticAirport.lineThree, window.innerHeight, '15px', legendLabel);

        GlobalServices.generateMultiChart('cexpInternationalChart', results.internationalAirport.lineOne, results.internationalAirport.lineTwo, results.internationalAirport.lineThree, window.innerHeight, '15px', legendLabel);

        $ionicLoading.hide();

      }, function errorCallback(response) {
        $ionicLoading.hide();
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    reloadCexpPage();

    var refreshTimer = $interval(function () {

      reloadCexpPage();

    }, GlobalConfig.refreshInterval);

    $scope.$on("$destroy", function (event) {
      if ( refreshTimer ) {
        $interval.cancel( refreshTimer );
      }
    });

  })

  .controller('TeamCtrl', function ($scope, $state, GlobalServices, $http, GlobalConfig, $interval, $ionicLoading) {

    console.log("Team engagement page started");

    var offsetHeight = 130;
    var contentHeight = window.innerHeight - offsetHeight;

    $scope.annotationButt = {};

    $scope.annotationButt.clicked = false;

    if (window.innerHeight === 623 || window.innerHeight === 692)
      contentHeight = contentHeight + 44;

    console.log("window height: " + window.innerHeight);

    $(".homeChartCell").css("height", (contentHeight / 3) + "px");


    var legendLabel = {};
    var deviceSettings = {
      iPhone5Height: 568,
      iPhone6Height: 667,
      iPhone6PHeight: 736
    };

    if (window.innerHeight === deviceSettings.iPhone5Height || window.innerHeight === deviceSettings.iPhone5Height - 44)
      legendLabel = {x: 69, y1: 7, y2: 16, y3: 17, lx: 80, ly: 37};
    else  if (window.innerHeight === deviceSettings.iPhone6Height || window.innerHeight === deviceSettings.iPhone6Height - 44)
      legendLabel = {x: 81, y1: 11, y2: 22, y3: 23, lx: 95, ly: 53};
    else if (window.innerHeight === deviceSettings.iPhone6PHeight || window.innerHeight === deviceSettings.iPhone6PHeight - 44)
      legendLabel = {x: 90, y1: 14, y2: 26, y3: 28, lx: 100, ly: 63};

    //console.log("set legend: " + JSON.stringify(legendLabel));

    var reloadTeamPage = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });

      $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + 'pulse/summary'
      }).then(function successCallback(response) {

        var summary = response.data;
        //console.log('Here is the response: ' + JSON.stringify(summary) );

        GlobalServices.generateMultiChart('team1Chart', summary.teamSummary.lineOne, summary.teamSummary.lineTwo, summary.teamSummary.lineThree, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateMultiChart('team2Chart', 23, 44, 33, window.innerHeight, '10px', legendLabel);

        GlobalServices.generateMultiChart('team3Chart', 23, 54, 33, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateMultiChart('team4Chart', 56, 34, 10, window.innerHeight, '10px', legendLabel);

        GlobalServices.generateMultiChart('team5Chart', 65, 34, 1, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateMultiChart('team6Chart', 19, 53, 28, window.innerHeight, '10px', legendLabel);

        $ionicLoading.hide();

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $ionicLoading.hide();
      });
    };

    reloadTeamPage();

    var refreshTimer = $interval(function () {

      reloadTeamPage();

    }, GlobalConfig.refreshInterval);

    $scope.$on("$destroy", function (event) {
      if ( refreshTimer ) {
        $interval.cancel( refreshTimer );
      }
    });

    $scope.annotationClicked = function () {

      if ($scope.annotationButt.clicked) {
        $scope.annotationButt.clicked = false;

        //console.log("sending email with screenshot");

        sendEmail(function () {

          var canvas = document.getElementById('sketchTeam');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, 420, 800);
          $('#sketchTeam').sketch('actions', []);
          $('#sketchTeam').css("display", "none");

        });

      }
      else {
        $scope.annotationButt.clicked = true;
        $('#sketchTeam').css("display", "block");
        $('#sketchTeam').sketch({defaultColor: "#ff0"});
      }


    }



  })

  .controller('OntimeCtrl', function ($scope, GlobalServices, $http, GlobalConfig, $interval, $ionicLoading) {

    console.log("On time performance started");

    var offsetHeight = 130;
    var contentHeight = window.innerHeight - offsetHeight;

    $scope.annotationButt = {};

    $scope.runwayButton = {};
    $scope.serviceButton = {};


    $scope.runwayButton5 = {
      "left": "101px",
      "top": "83px",
      "width": "115px",
      "height": "115px"
    };

    $scope.serviceButton5 = {
      "left": "101px",
      "top": "330px",
      "width": "115px",
      "height": "115px"
    };

    $scope.runwayButton6 = {
      "left": "47px",
      "top": "62px",
      "width": "95px",
      "height": "95px"
    };

    $scope.serviceButton6 = {
      "left": "235px",
      "top": "62px",
      "width": "95px",
      "height": "95px"
    };

    $scope.runwayButton6p = {
      "left": "52px",
      "top": "68px",
      "width": "105px",
      "height": "105px"
    };

    $scope.serviceButton6p = {
      "left": "258px",
      "top": "68px",
      "width": "105px",
      "height": "105px"
    };

    $scope.annotationButt.clicked = false;

    $scope.annotationClicked = function () {

      if ($scope.annotationButt.clicked) {
        $scope.annotationButt.clicked = false;

        //console.log("sending email with screenshot");

        sendEmail(function() {

          var canvas = document.getElementById('sketchOntime');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, 420, 800);
          $('#sketchOntime').sketch('actions',[]);
          $('#sketchOntime').css("display", "none");

        });

      }
      else {
        $scope.annotationButt.clicked = true;
        $('#sketchOntime').css("display", "block");
        $('#sketchOntime').sketch({defaultColor: "#ff0"});
      }

    }


    if (window.innerHeight === 623 || window.innerHeight === 692)
      contentHeight = contentHeight + 44;

    if (window.innerHeight === 623 || window.innerHeight === 667) {
      $scope.runwayButton = $scope.runwayButton6;
      $scope.serviceButton = $scope.serviceButton6;
    } else if(window.innerHeight === 524 || window.innerHeight === 568){
      $scope.runwayButton = $scope.runwayButton5;
      $scope.serviceButton = $scope.serviceButton5;
    } else {
      $scope.runwayButton = $scope.runwayButton6p;
      $scope.serviceButton = $scope.serviceButton6p;
    }

    console.log("window height: " + window.innerHeight);

    $(".cexpChartCell").css("height", (contentHeight / 2) + "px");
    $(".cexpChartCell").css("width", (contentHeight / 2) + "px");

    var legendLabel = {};
    var deviceSettings = {
      iPhone5Height: 568,
      iPhone6Height: 667,
      iPhone6PHeight: 736
    };

    if (window.innerHeight === deviceSettings.iPhone5Height || window.innerHeight === deviceSettings.iPhone5Height - 44)
      legendLabel = {lx: 110, ly: 80};
    else if(window.innerHeight === deviceSettings.iPhone6Height || window.innerHeight === deviceSettings.iPhone6Height - 44)
      legendLabel = {lx: 135, ly: 110};
    else if (window.innerHeight === deviceSettings.iPhone6PHeight || window.innerHeight === deviceSettings.iPhone6PHeight - 44)
      legendLabel = {lx: 145, ly: 125};

    console.log(JSON.stringify(legendLabel));


    var reloadOnTimePage = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });

      $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + 'pulse/onTimePerformance'
      }).then(function successCallback(response) {

        var results = response.data;
        //console.log('Here is the response: ' + JSON.stringify(results) );

        GlobalServices.generateDoubleChart('ontimeRunwayChart', 90, 70, results.priChart.lineOne, results.priChart.lineTwo, window.innerHeight, '15px', legendLabel);

        GlobalServices.generateDoubleChart('ontimeServChart', 90, 70, results.siChart.lineOne, results.siChart.lineTwo, window.innerHeight, '15px', legendLabel);

        $ionicLoading.hide();

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $ionicLoading.hide();
      });
    };

    reloadOnTimePage();

    var refreshTimer = $interval(function () {

      reloadOnTimePage();

    }, GlobalConfig.refreshInterval);

    $scope.$on("$destroy", function (event) {
      if ( refreshTimer ) {
        $interval.cancel( refreshTimer );
      }
    });

  })

  .controller('SafetyCtrl', function ($scope, GlobalServices, $http, GlobalConfig, $interval, $ionicLoading) {

    console.log("Safety and compliance page started");

    var offsetHeight = 130;
    var contentHeight = window.innerHeight - offsetHeight;

    $scope.annotationButt = {};

    $scope.annotationButt.clicked = false;

    $scope.annotationClicked = function () {

      if ($scope.annotationButt.clicked) {
        $scope.annotationButt.clicked = false;

        //console.log("sending email with screenshot");

        sendEmail(function() {

          var canvas = document.getElementById('sketchSafety');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, 420, 800);
          $('#sketchSafety').sketch('actions',[]);
          $('#sketchSafety').css("display", "none");

        });

      }
      else {
        $scope.annotationButt.clicked = true;
        $('#sketchSafety').css("display", "block");
        $('#sketchSafety').sketch({defaultColor: "#ff0"});
      }

    }


    if (window.innerHeight === 623 || window.innerHeight === 692)
      contentHeight = contentHeight + 44;

    console.log("window height: " + window.innerHeight);

    $(".cexpChartCell").css("height", (contentHeight / 2.2) + "px");
    $(".cexpChartCell").css("width", (contentHeight / 2.2) + "px");

    var legendLabel = {};
    var deviceSettings = {
      iPhone5Height: 568,
      iPhone6Height: 667,
      iPhone6PHeight: 736
    };

    if (window.innerHeight === deviceSettings.iPhone5Height || window.innerHeight === deviceSettings.iPhone5Height - 44)
      legendLabel = {lx: 100, ly: 70};
    else if (window.innerHeight === deviceSettings.iPhone6Height || window.innerHeight === deviceSettings.iPhone6Height - 44)
      legendLabel = {lx: 125, ly: 95};
    else if (window.innerHeight === deviceSettings.iPhone6PHeight || window.innerHeight === deviceSettings.iPhone6PHeight - 44)
      legendLabel = {lx: 137, ly: 115};

    console.log(JSON.stringify(legendLabel));

    var reloadSafetyPage = function() {

      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });

      $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + 'pulse/safety'
      }).then(function successCallback(response) {

        var results = response.data;
        //console.log('Here is the response: ' + JSON.stringify(results) );

        GlobalServices.generateDoubleChart('safetyDayChart', 90, 70, results.dayShift.lineOne, results.dayShift.lineTwo, window.innerHeight, '15px', legendLabel);

        GlobalServices.generateDoubleChart('safetyNightChart', 90, 70, results.nightShift.lineOne, results.nightShift.lineTwo, window.innerHeight, '15px', legendLabel);

        //GlobalServices.generateSingleChart('safetyDayChart', 90, 70, results.dayShift.lineOne, window.innerHeight, '15px', legendLabel);
        //GlobalServices.generateSingleChart('safetyNightChart', 90, 70, results.nightShift.lineOne, window.innerHeight, '15px', legendLabel);

        $ionicLoading.hide();

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $ionicLoading.hide();
      });

    };

    reloadSafetyPage();

    var refreshTimer = $interval(function () {

      reloadSafetyPage();

    }, GlobalConfig.refreshInterval);

    $scope.$on("$destroy", function (event) {
      if ( refreshTimer ) {
        $interval.cancel( refreshTimer );
      }
    });


  })

  .controller('IncidentCtrl', function ($scope, GlobalServices, $http, GlobalConfig, $interval, $ionicLoading) {

    console.log("Incident started");

    var offsetHeight = 130;
    var contentHeight = window.innerHeight - offsetHeight;

    $scope.annotationButt = {};

    $scope.annotationButt.clicked = false;

    $scope.annotationClicked = function () {

      if ($scope.annotationButt.clicked) {
        $scope.annotationButt.clicked = false;

        //console.log("sending email with screenshot");

        sendEmail(function() {

          var canvas = document.getElementById('sketchIncident');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, 420, 800);
          $('#sketchIncident').sketch('actions',[]);
          $('#sketchIncident').css("display", "none");

        });

      }
      else {
        $scope.annotationButt.clicked = true;
        $('#sketchIncident').css("display", "block");
        $('#sketchIncident').sketch({defaultColor: "#ff0"});
      }

    }


    if (window.innerHeight === 623 || window.innerHeight === 692)
      contentHeight = contentHeight + 44;

    var legendLabel = {};
    var deviceSettings = {
      iPhone5Height: 568,
      iPhone6Height: 667,
      iPhone6PHeight: 736
    };

    if (window.innerHeight === deviceSettings.iPhone5Height || window.innerHeight === deviceSettings.iPhone5Height - 44)
      legendLabel = {lx: 110, ly: 80};
    else if (window.innerHeight === deviceSettings.iPhone6Height || window.innerHeight === deviceSettings.iPhone6Height - 44)
      legendLabel = {lx: 135, ly: 110};
    else if (window.innerHeight === deviceSettings.iPhone6PHeight || window.innerHeight === deviceSettings.iPhone6PHeight - 44)
      legendLabel = {lx: 145, ly: 125};


    $(".cexpChartCell").css("height", (contentHeight / 2) + "px");

    $(".cexpChartCell").css("width", (contentHeight / 2) + "px");


    var reloadIncidentPage = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });

      $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + 'pulse/incidentsAndFaults'
      }).then(function successCallback(response) {

        var results = response.data;
        //console.log('Here is the response: ' + JSON.stringify(results) );

        GlobalServices.generateInctChartDouble('incidentsChart', 1, 5, results.incidents.lineOne, results.incidents.lineTwo, window.innerHeight, '15px', legendLabel);
        GlobalServices.generateInctChartDouble('faultsChart', 1, 5, results.faults.lineOne, results.faults.lineTwo, window.innerHeight, '15px', legendLabel);

        //GlobalServices.generateInctChart('incidentsChart', 1, 5, results.incidents.lineOne, window.innerHeight, '15px', legendLabel);
        //GlobalServices.generateInctChart('faultsChart', 1, 5, results.faults.lineOne, window.innerHeight, '15px', legendLabel);

        $ionicLoading.hide();

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $ionicLoading.hide();
      });
    };

    reloadIncidentPage();

    var refreshTimer = $interval(function () {

      reloadIncidentPage();

    }, GlobalConfig.refreshInterval);

    $scope.$on("$destroy", function (event) {
      if ( refreshTimer ) {
        $interval.cancel( refreshTimer );
      }
    });


  })

  .controller('ActivityCtrl', function ($scope, GlobalServices, $http, GlobalConfig, $interval, $ionicLoading) {

    console.log("Activity started");

    var offsetHeight = 130;
    var contentHeight = window.innerHeight - offsetHeight;

    $scope.annotationButt = {};

    $scope.annotationButt.clicked = false;

    $scope.annotationClicked = function () {

      if ($scope.annotationButt.clicked) {
        $scope.annotationButt.clicked = false;

        //console.log("sending email with screenshot");

        sendEmail(function() {

          var canvas = document.getElementById('sketchActivity');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, 420, 800);
          $('#sketchActivity').sketch('actions',[]);
          $('#sketchActivity').css("display", "none");

        });

      }
      else {
        $scope.annotationButt.clicked = true;
        $('#sketchActivity').css("display", "block");
        $('#sketchActivity').sketch({defaultColor: "#ff0"});
      }

    }


    if (window.innerHeight === 623 || window.innerHeight === 692)
      contentHeight = contentHeight + 44;

    console.log("window height: " + window.innerHeight);

    $(".cexpChartCell").css("height", (contentHeight / 3.15) + "px");
    $(".cexpChartCell").css("width", (contentHeight / 3.15) + "px");

    var legendLabel = {};
    var legendLabelActivity = {};
    var deviceSettings = {
      iPhone5Height: 568,
      iPhone6Height: 667,
      iPhone6PHeight: 736
    };

    if (window.innerHeight === deviceSettings.iPhone5Height || window.innerHeight === deviceSettings.iPhone5Height - 44) {
      legendLabel = {lx: 70, ly: 48};
      legendLabelActivity = {lx: 100, ly: 70};
    }
    else if (window.innerHeight === deviceSettings.iPhone6Height || window.innerHeight === deviceSettings.iPhone6Height - 44) {
      legendLabel = {lx: 85, ly: 60};
      legendLabelActivity = {lx: 120, ly: 98};
    }
    else if (window.innerHeight === deviceSettings.iPhone6PHeight || window.innerHeight === deviceSettings.iPhone6PHeight - 44) {
      legendLabel = {lx: 95, ly: 65};
      legendLabelActivity = {lx: 138, ly: 113};
    }

    //console.log(JSON.stringify(legendLabel));

    $(".activityChartCell").css("width", (contentHeight / 2.2) + "px");
    $(".activityChartCell").css("height", (contentHeight / 2.2) + "px");

    var reloadActivityPage = function() {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });

      $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + 'pulse/workforceActivities'
      }).then(function successCallback(response) {

        var results = response.data;
        //console.log('Here is the response: ' + JSON.stringify(results) );

        GlobalServices.generateActivityChartDouble('bayChart', 15, 11, results.biCount, results.biAveCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChartDouble('auaChart', 15, 11, results.vacCount, results.vacAveCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChartDouble('infChart', 15, 11, results.aiCount, results.aiAveCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChartDouble('lightChart', 15, 11, results.liCount, results.liAveCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChartDouble('spillChart', 15, 11, results.stiCount, results.stiAveCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChartDouble('escortChart', 15, 11, results.vaeCount, results.vaeAveCount, window.innerHeight, '10px', legendLabel);

        GlobalServices.generateActivityChartDouble('engineChart', 15, 11, results.egrCount, results.egrAveCount, window.innerHeight, '10px', legendLabelActivity);
        GlobalServices.generateActivityChartDouble('wildlifeChart', 15, 11, results.wcCount, results.wcAveCount, window.innerHeight, '10px', legendLabelActivity);

        /*
        GlobalServices.generateActivityChart('bayChart', 15, 11, results.biCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChart('auaChart', 15, 11, results.vacCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChart('infChart', 15, 11, results.aiCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChart('lightChart', 15, 11, results.liCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChart('spillChart', 15, 11, results.stiCount, window.innerHeight, '10px', legendLabel);
        GlobalServices.generateActivityChart('escortChart', 15, 11, results.vaeCount, window.innerHeight, '10px', legendLabel);

        GlobalServices.generateActivityChart('engineChart', 15, 11, results.egrCount, window.innerHeight, '10px', legendLabelActivity);
        GlobalServices.generateActivityChart('wildlifeChart', 15, 11, results.wcCount, window.innerHeight, '10px', legendLabelActivity);
        */

        $ionicLoading.hide();
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $ionicLoading.hide();
      });
    };

    reloadActivityPage();

    var vacBoxSlider = $('.activities').bxSlider({
      infiniteLoop: false,
      captions: true
    });

    var refreshTimer = $interval(function () {

      reloadActivityPage();

    }, GlobalConfig.refreshInterval);

    $scope.$on("$destroy", function (event) {
      if ( refreshTimer ) {
        $interval.cancel( refreshTimer );
      }
    });

  })

;
