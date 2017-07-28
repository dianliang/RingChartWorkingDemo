angular.module('starter.controllers.home', [])
  .controller('HomeCtrl', function ($scope, $state, GlobalServices, GlobalConfig, $http, $interval, $ionicLoading, $q) {

    var homeSlider;
    var homeSliderLoaded;
    console.log("home page started");

    var offsetHeight = 130;
    var contentHeight = window.innerHeight - offsetHeight;

    $scope.annotationButt = {};

    $scope.cexpButton = {};
    $scope.teamButton = {};
    $scope.ontimeButton = {};
    $scope.safetyButton = {};
    $scope.incidentButton = {};
    $scope.activityButton = {};


    $scope.cexpButton5 = {
      "left": "40px",
      "top": "54px",
      "width": "82px",
      "height": "82px"
    };

    $scope.teamButton5 = {
      "left": "200px",
      "top": "54px",
      "width": "82px",
      "height": "82px"
    };

    $scope.ontimeButton5 = {
      "left": "31px",
      "top": "210px",
      "width": "100px",
      "height": "100px"
    };

    $scope.safetyButton5 = {
      "left": "190px",
      "top": "210px",
      "width": "100px",
      "height": "100px"
    };

    $scope.incidentButton5 = {
      "left": "31px",
      "top": "376px",
      "width": "100px",
      "height": "100px"
    };

    $scope.activityButton5 = {
      "left": "190px",
      "top": "376px",
      "width": "100px",
      "height": "100px"
    };

    $scope.cexpButton6 = {
      "left": "47px",
      "top": "62px",
      "width": "95px",
      "height": "95px"
    };

    $scope.teamButton6 = {
      "left": "235px",
      "top": "62px",
      "width": "95px",
      "height": "95px"
    };

    $scope.cexpButton6p = {
      "left": "52px",
      "top": "68px",
      "width": "105px",
      "height": "105px"
    };

    $scope.teamButton6p = {
      "left": "258px",
      "top": "68px",
      "width": "105px",
      "height": "105px"
    };


    $scope.ontimeButton6 = {
      "left": "37px",
      "top": "251px",
      "width": "115px",
      "height": "115px"
    };

    $scope.ontimeButton6p = {
      "left": "39px",
      "top": "277px",
      "width": "131px",
      "height": "131px"
    };

    $scope.safetyButton6 = {
      "left": "224px",
      "top": "251px",
      "width": "115px",
      "height": "115px"
    };

    $scope.safetyButton6p = {
      "left": "245px",
      "top": "277px",
      "width": "131px",
      "height": "131px"
    };

    $scope.incidentButton6 = {
      "left": "37px",
      "top": "450px",
      "width": "115px",
      "height": "115px"
    };

    $scope.incidentButton6p = {
      "left": "38px",
      "top": "500px",
      "width": "131px",
      "height": "131px"
    };

    $scope.activityButton6 = {
      "left": "225px",
      "top": "450px",
      "width": "115px",
      "height": "115px"
    };

    $scope.activityButton6p = {
      "left": "245px",
      "top": "500px",
      "width": "131px",
      "height": "131px"
    };


    $scope.annotationButt.clicked = false;

    if (window.innerHeight === 623 || window.innerHeight === 692) {
      contentHeight = contentHeight + 44;
    }


    if (window.innerHeight === 623 || window.innerHeight === 667) {
      $scope.cexpButton = $scope.cexpButton6;
      $scope.teamButton = $scope.teamButton6;
      $scope.ontimeButton = $scope.ontimeButton6;
      $scope.safetyButton = $scope.safetyButton6;
      $scope.incidentButton = $scope.incidentButton6;
      $scope.activityButton = $scope.activityButton6;
    } else if (window.innerHeight === 524 || window.innerHeight === 568) {
      $scope.cexpButton = $scope.cexpButton5;
      $scope.teamButton = $scope.teamButton5;
      $scope.ontimeButton = $scope.ontimeButton5;
      $scope.safetyButton = $scope.safetyButton5;
      $scope.incidentButton = $scope.incidentButton5;
      $scope.activityButton = $scope.activityButton5;
    } else {
      $scope.cexpButton = $scope.cexpButton6p;
      $scope.teamButton = $scope.teamButton6p;
      $scope.ontimeButton = $scope.ontimeButton6p;
      $scope.safetyButton = $scope.safetyButton6p;
      $scope.incidentButton = $scope.incidentButton6p;
      $scope.activityButton = $scope.activityButton6p;
    }

    console.log("window height: " + window.innerHeight);

    $(".homeChartCell").css("height", (contentHeight / 3) + "px");

    $(".cexpButton").css("left", $scope.cexpButton.left);
    $(".cexpButton").css("top", $scope.cexpButton.top);
    $(".cexpButton").css("width", $scope.cexpButton.width);
    $(".cexpButton").css("height", $scope.cexpButton.height);

    $(".teamButton").css("left", $scope.teamButton.left);
    $(".teamButton").css("top", $scope.teamButton.top);
    $(".teamButton").css("width", $scope.teamButton.width);
    $(".teamButton").css("height", $scope.teamButton.height);

    $(".ontimeButton").css("left", $scope.ontimeButton.left);
    $(".ontimeButton").css("top", $scope.ontimeButton.top);
    $(".ontimeButton").css("width", $scope.ontimeButton.width);
    $(".ontimeButton").css("height", $scope.ontimeButton.height);

    $(".safetyButton").css("left", $scope.safetyButton.left);
    $(".safetyButton").css("top", $scope.safetyButton.top);
    $(".safetyButton").css("width", $scope.safetyButton.width);
    $(".safetyButton").css("height", $scope.safetyButton.height);

    $(".incidentButton").css("left", $scope.incidentButton.left);
    $(".incidentButton").css("top", $scope.incidentButton.top);
    $(".incidentButton").css("width", $scope.incidentButton.width);
    $(".incidentButton").css("height", $scope.incidentButton.height);

    $(".activityButton").css("left", $scope.activityButton.left);
    $(".activityButton").css("top", $scope.activityButton.top);
    $(".activityButton").css("width", $scope.activityButton.width);
    $(".activityButton").css("height", $scope.activityButton.height);


    var legendLabel = {};
    var legendLabelSingle = {};
    var legendLabelDouble = {};
    var deviceSettings = {
      iPhone5Height: 568,
      iPhone6Height: 667,
      iPhone6PHeight: 736
    };

    if (window.innerHeight === deviceSettings.iPhone5Height || window.innerHeight === deviceSettings.iPhone5Height - 44) {
      legendLabel = {x: 68, y1: 7, y2: 16, y3: 17, lx: 80, ly: 38};
      legendLabelSingle = {lx: 95, ly: 63};
      legendLabelDouble = {lx: 80, ly: 40};
    }
    else if (window.innerHeight === deviceSettings.iPhone6Height || window.innerHeight === deviceSettings.iPhone6Height - 44) {
      legendLabel = {x: 81, y1: 11, y2: 22, y3: 23, lx: 95, ly: 53};
      legendLabelSingle = {lx: 95, ly: 63};
      legendLabelDouble = {lx: 95, ly: 57};
    }

    else if (window.innerHeight === deviceSettings.iPhone6PHeight || window.innerHeight === deviceSettings.iPhone6PHeight - 44) {
      legendLabel = {x: 90, y1: 14, y2: 26, y3: 28, lx: 100, ly: 63};
      legendLabelSingle = {lx: 105, ly: 75};
      legendLabelDouble = {lx: 105, ly: 67};
    }
    //console.log("set legend: " + JSON.stringify(legendLabel));

    var reloadHomePage = function () {
      if (homeSliderLoaded) {
        homeSlider.destroySlider();
        homeSliderLoaded = false;
      }

      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
      });

      console.log('request go to',GlobalConfig.hostUrl + GlobalConfig.appName + 'shiftCoverage');
      // https://bculjel3h8.execute-api.ap-southeast-2.amazonaws.com/dev/pulse/summaryshiftCoverage
      // https://bculjel3h8.execute-api.ap-southeast-2.amazonaws.com/dev/pulse/summary/shiftEfficiency
      var getFirstBorad = $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + '/shiftCoverage'
      });

      var getSecondBorad = $http({
        method: 'GET',
          url: GlobalConfig.hostUrl + GlobalConfig.appName + '/shiftEfficiency'
      });


      var getShiftOntime = $http({
        method: 'GET',
        url: GlobalConfig.hostUrl + GlobalConfig.appName + '/shiftOnTimePerf'
      });

      $q.all([getFirstBorad, getSecondBorad, getShiftOntime]).then(function (responseList) {
        var summary1 = responseList[0].data;
        var summary2 = responseList[1].data;
        var summary3 = responseList[2].data;
        console.log('sm3', summary3);
        //console.log('Here is the response: ' + JSON.stringify(summary) );
        // summary1.shiftCoverageMotor
        GlobalServices.generateDoubleChart('rwi', 4, 3, summary1.shiftCoverageMotor, summary1.shiftCoverageMotorWk, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', false);
        GlobalServices.generateDoubleChart('txi', 4, 3, summary1.shiftCoverageTaxiway, summary1.shiftCoverageTaxiwayWk, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', false);
        GlobalServices.generateDoubleChart('apr', 4, 3, summary1.shiftCoverageApron, summary1.shiftCoverageApronWk, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', false);
        GlobalServices.generateDoubleChart('bay', 4, 3, summary1.shiftCoverageBay, summary1.shiftCoverageBayWk, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', false);
        GlobalServices.generateDoubleChart('wa', 4, 3, summary1.shiftCoverageWildlife, summary1.shiftCoverageWildlifeWk, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', false);
        GlobalServices.generateDoubleChart('db', 4, 3, summary1.shiftCoverageDriverObs, summary1.shiftCoverageDriverObsWk, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', false);

        GlobalServices.generateDoubleChart('sh', 90, 70, summary2.shiftHandoverStatus, summary2.shiftHandoverStatusWk, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', true);
        GlobalServices.generateDoubleChart('sa', 90, 70, summary2.serviceabilityStatus, summary2.serviceabilityStatus, window.innerHeight, '10px', legendLabelDouble, 'Current Shift', true);

        GlobalServices.generateDoubleChart('ca', summary3.currentShiftCountIndex, (summary3.currentShiftCountIndex * 0.6), summary3.currentShiftCount, summary3.currentShiftCountIndex,
          window.innerHeight, '10px', legendLabelDouble,'NOW', false);
        GlobalServices.generateDoubleChart('wtd', summary3.wtdShiftCountIndex, (summary3.wtdShiftCountIndex * 0.6), summary3.wtdShiftCount, summary3.currentShiftCountIndex,
          window.innerHeight, '10px', legendLabelDouble,'WTD', false);
        GlobalServices.generateDoubleChart('mtd', summary3.mtdShiftCountIndex, (summary3.mtdShiftCountIndex * 0.6), summary3.mtdShiftCount, summary3.mtdShiftCountIndex,
          window.innerHeight, '10px', legendLabelDouble,'NOW', false);
        GlobalServices.generateDoubleChart('qtd', summary3.qtdShiftCountIndex, (summary3.qtdShiftCountIndex * 0.6), summary3.qtdShiftCount, summary3.qtdShiftCountIndex,
          window.innerHeight, '10px', legendLabelDouble,'QTD', false);

        //GlobalServices.generateInctChartDouble('wtd', 4, 10, summary2.shiftCoverageWildlife, summary2.shiftCoverageWildlife, window.innerHeight, '10px', legendLabelDouble);

        // GlobalServices.generateInctChartDouble('NOW','mtd', 4, 10, summary2.shiftCoverageWildlife, summary2.shiftCoverageWildlife, window.innerHeight, '10px', legendLabelDouble);
        // GlobalServices.generateInctChartDouble('WTD','qtd', 4, 10, summary2.shiftCoverageWildlife, summary2.shiftCoverageWildlife, window.innerHeight, '10px', legendLabelDouble);

        if (!homeSliderLoaded) {
          homeSlider = $('.homeSlider').bxSlider({
            infiniteLoop: false,
            onSliderLoad: function () {
              homeSliderLoaded = true;
            },
            captions: true
          });
        }
        $ionicLoading.hide();
      });

    };

    reloadHomePage();

    var refreshTimer = $interval(function () {

      reloadHomePage();

    }, GlobalConfig.refreshInterval);

    $scope.$on("$destroy", function (event) {
      if (refreshTimer) {
        $interval.cancel(refreshTimer);
      }
    });

    $scope.annotationClicked = function () {

      if ($scope.annotationButt.clicked) {
        $scope.annotationButt.clicked = false;

        //console.log("sending email with screenshot");

        sendEmail(function () {

          var canvas = document.getElementById('sketchHome');
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, 420, 800);
          $('#sketchHome').sketch('actions', []);
          $('#sketchHome').css("display", "none");

        });

      }
      else {
        $scope.annotationButt.clicked = true;
        $('#sketchHome').css("display", "block");
        $('#sketchHome').sketch({defaultColor: "#ff0"});
      }

    }


    $scope.cexpClicked = function () {

      // console.log("cexp clicked");
      // $state.go("cexp");

    };

    $scope.teamClicked = function () {

      // console.log("team clicked");
      // $state.go("team");

    };

    $scope.ontimeClicked = function () {

      // console.log("ontime clicked");
      // $state.go("ontime");

    };

    $scope.safetyClicked = function () {

      // console.log("safety clicked");
      // $state.go("safety");

    };

    $scope.incidentClicked = function () {

      // console.log("incident clicked");
      // $state.go("incident");

    };

    $scope.activityClicked = function () {

      // console.log("activity clicked");
      // $state.go("activity");

    };


  })
