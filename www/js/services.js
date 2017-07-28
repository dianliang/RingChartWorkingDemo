angular.module('starter.services', [])

  .factory('GlobalConfig', function () {

    return {
      hostUrl: 'https://bculjel3h8.execute-api.ap-southeast-2.amazonaws.com',
      appName: '/dev/pulse/summary',
      trackerSvcName: 'RingChartDemo-1.2/',
      appVersion: '0.0.2',
      refreshInterval: 30000,
      mediaPath: 'Pulse/media/'
    };

  })

  .service('GlobalServices', function ($http, GlobalConfig) {


    this.generateMultiChart = function (targetName, like, neutral, dislike, windowHeight, lineWidth, legendLabel) {

      var chartOptions = {
        colors: ['#1CF928', '#E8A22A', '#D41E07'],
        labelColor: '#ffffff'
      };

      var chart = $('#' + targetName).highcharts({

          chart: {
            type: 'solidgauge',
            backgroundColor: 'black',
            marginTop: -10,
            marginBottom: -10
          },

          title: {
            text: ''
          },

          tooltip: {
            borderWidth: 0,
            hideDelay: 10000000,
            useHTML: true,
            backgroundColor: 'none',
            shadow: false,
            style: {
              textAlign: 'center',
              fontSize: '16px'
            },
            pointFormat: '<table style="width:100%"><tr><td style="color: #ffffff; text-align:center">{series.name}</td></tr><tr><td style="text-align: center; font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</td></tr></table>',
            positioner: function (labelWidth, labelHeight) {
              return {
                x: legendLabel.lx - labelWidth / 2,
                y: legendLabel.ly
              };
            }
          },

          pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{
              outerRadius: '115%',
              innerRadius: '100%',
              backgroundColor: Highcharts.Color(chartOptions.colors[0]).setOpacity(0.3).get(),
              borderWidth: 0
            }, {
              outerRadius: '99%',
              innerRadius: '84%',
              backgroundColor: Highcharts.Color(chartOptions.colors[1]).setOpacity(0.3).get(),
              borderWidth: 0
            }, {
              outerRadius: '83%',
              innerRadius: '68%',
              backgroundColor: Highcharts.Color(chartOptions.colors[2]).setOpacity(0.3).get(),
              borderWidth: 0
            }]
          },

          yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
          },

          plotOptions: {
            solidgauge: {
              borderWidth: lineWidth,
              dataLabels: {
                enabled: false
              },
              linecap: 'round',
              stickyTracking: false
            }
          },

          series: [{
            name: 'Like',
            borderColor: chartOptions.colors[0],
            data: [{
              color: chartOptions.colors[0],
              radius: '108%',
              innerRadius: '108%',
              y: parseInt(like)
            }]
          }, {
            name: 'Neutral',
            borderColor: chartOptions.colors[1],
            data: [{
              color: chartOptions.colors[1],
              radius: '92%',
              innerRadius: '92%',
              y: parseInt(neutral)
            }]
          }, {
            name: 'Dislike',
            borderColor: chartOptions.colors[2],
            data: [{
              color: chartOptions.colors[2],
              radius: '76%',
              innerRadius: '76%',
              y: parseInt(dislike)
            }]
          }]
        },

        /**
         * In the chart load callback, add icons on top of the circular shapes
         */
        function callback () {

          this.renderer.label("+", legendLabel.x, legendLabel.y1)
            .css({
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '800'
            })
            //.translate(190, 26)
            .add(this.series[2].group);


          this.renderer.label("~", legendLabel.x, legendLabel.y2)
            .css({
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '800'
            })
            //.translate(190, 61)
            .add(this.series[2].group);

          // Stand icon
          this.renderer.label("-", legendLabel.x, legendLabel.y3)
            .css({
              color: '#ffffff',
              fontSize: '27px',
              fontWeight: '500'
            })
            //.translate(190, 96)
            .add(this.series[2].group);

          this.tooltip.refresh(this.series[0].points[0]);

        });


    };

    this.generateDoubleChart = function (targetName, thresholdGreen, thresholdYellow, lineOne, lineTwo, windowHeight, lineWidth, legendLabel, title, percentage) {
      var template = '<table style="width:100%"><tr><td style="color: #ffffff; text-align:center">{series.name}</td></tr><tr><td style="text-align: center; font-size:2em; color: {point.color}; font-weight: bold">{point.y}</td></tr></table>';
      if (percentage){
        template = '<table style="width:100%"><tr><td style="color: #ffffff; text-align:center">{series.name}</td></tr><tr><td style="text-align: center; font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</td></tr></table>';
      }

      var chartOptions = [
        {
          color: '#1CF928',
          labelColor: '#ffffff',
          iPhone6Height: 667,
          iPhone6PHeight: 736
        },
        {
          color: '#ffffff',
          labelColor: '#ffffff',
          iPhone6Height: 667,
          iPhone6PHeight: 736
        }
      ];

      if (lineOne >= thresholdGreen)
        chartOptions[0].color = '#1CF928';
      else if (lineOne >= thresholdYellow)
        chartOptions[0].color = '#E8A22A';
      else
        chartOptions[0].color = '#D41E07';

      /*
       if (lineTwo >= thresholdGreen)
       chartOptions[1].color = '#1CF928';
       else if (lineTwo >= thresholdYellow)
       chartOptions[1].color = '#E8A22A';
       else
       chartOptions[1].color = '#D41E07';
       */

      var chart = $('#' + targetName).highcharts({

          chart: {
            type: 'solidgauge',
            backgroundColor: 'black',
            marginTop: -10,
            marginBottom: -10
          },

          title: {
            text: ''
          },

          tooltip: {
            animation: true,
            hideDelay: 10000000,
            borderWidth: 0,
            useHTML: true,
            backgroundColor: 'none',
            shadow: false,
            style: {
              textAlign: 'center',
              fontSize: '16px'
            },
            //pointFormat: '<table style="width:100%"><tr><td style="text-align: center; font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</td></tr></table>',
            pointFormat: template,
            positioner: function (labelWidth, labelHeight) {
              return {
                x: legendLabel.lx - labelWidth / 2,
                y: legendLabel.ly
              };
            }
          },

          pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{
              outerRadius: '115%',
              innerRadius: '100%',
              backgroundColor: Highcharts.Color(chartOptions[0].color).setOpacity(0.3).get(),
              borderWidth: 0
            }, {
              outerRadius: '99%',
              innerRadius: '84%',
              backgroundColor: Highcharts.Color(chartOptions[1].color).setOpacity(0.3).get(),
              borderWidth: 0
            }]
          },

          yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
          },

          plotOptions: {
            solidgauge: {
              borderWidth: lineWidth,
              dataLabels: {
                enabled: false
              },
              linecap: 'round',
              stickyTracking: false
            }
          },

          series: [{
            name: title,
            borderColor: chartOptions[0].color,
            data: [{
              color: chartOptions[0].color,
              radius: '108%',
              innerRadius: '108%',
              y: parseInt(lineOne)
            }]
          }, {
            name: 'LW 24Hr Ave',
            borderColor: chartOptions[1].color,
            data: [{
              color: chartOptions[1].color,
              radius: '92%',
              innerRadius: '92%',
              y: parseInt(lineTwo)
            }]
          }]
        }
      ).highcharts();

      //chart.series[0].tooltip.show();
      chart.tooltip.refresh(chart.series[0].points[0]);

    };


    this.generateActivityChartDouble = function (targetName, thresholdGreen, thresholdYellow, lineOne, lineTwo, windowHeight, lineWidth, legendLabel) {

      var chartOptions = [
        {
          color: '#1CF928',
          labelColor: '#ffffff',
          iPhone6Height: 667,
          iPhone6PHeight: 736
        },
        {
          color: '#ffffff',
          labelColor: '#ffffff',
          iPhone6Height: 667,
          iPhone6PHeight: 736
        }
      ]

      if (lineOne >= thresholdGreen)
        chartOptions[0].color = '#1CF928';
      else if (lineOne >= thresholdYellow)
        chartOptions[0].color = '#E8A22A';
      else
        chartOptions[0].color = '#D41E07';

      /*
       if (lineTwo >= thresholdGreen)
       chartOptions[1].color = '#1CF928';
       else if (lineTwo >= thresholdYellow)
       chartOptions[1].color = '#E8A22A';
       else
       chartOptions[1].color = '#D41E07';
       */

      var chart = $('#' + targetName).highcharts({

          chart: {
            type: 'solidgauge',
            backgroundColor: 'black',
            marginTop: -10,
            marginBottom: -10
          },

          title: {
            text: ''
          },

          tooltip: {
            animation: true,
            hideDelay: 10000000,
            borderWidth: 0,
            useHTML: true,
            backgroundColor: 'none',
            shadow: false,
            style: {
              textAlign: 'center',
              fontSize: '16px'
            },
            pointFormat: '<table style="width:100%"><tr><td style="color: #ffffff; text-align:center">{series.name}</td></tr><tr><td style="text-align: center; font-size:2em; color: {point.color}; font-weight: bold">{point.y}</td></tr></table>',
            positioner: function (labelWidth, labelHeight) {
              return {
                x: legendLabel.lx - labelWidth / 2,
                y: legendLabel.ly
              };
            }
          },

          pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{
              outerRadius: '115%',
              innerRadius: '100%',
              backgroundColor: Highcharts.Color(chartOptions[0].color).setOpacity(0.3).get(),
              borderWidth: 0
            }, {
              outerRadius: '99%',
              innerRadius: '84%',
              backgroundColor: Highcharts.Color(chartOptions[1].color).setOpacity(0.3).get(),
              borderWidth: 0
            }]
          },

          yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
          },

          plotOptions: {
            solidgauge: {
              borderWidth: lineWidth,
              dataLabels: {
                enabled: false
              },
              linecap: 'round',
              stickyTracking: false
            }
          },

          series: [{
            name: 'Last 24Hrs',
            borderColor: chartOptions[0].color,
            data: [{
              color: chartOptions[0].color,
              radius: '108%',
              innerRadius: '108%',
              y: parseInt(lineOne)
            }]
          }, {
            name: 'LW 24Hr Ave',
            borderColor: chartOptions[1].color,
            data: [{
              color: chartOptions[1].color,
              radius: '92%',
              innerRadius: '92%',
              y: parseInt(lineTwo)
            }]
          }]
        }
      ).highcharts();

      //chart.series[0].tooltip.show();
      chart.tooltip.refresh(chart.series[0].points[0]);

    };


  })

