/**
 Copyright (c) 2014 BrightPoint Consulting, Inc.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */

function radialProgress(parent) {
    var _data=null,
        _duration= 1000,
        _selection,
        _margin = {top:0, right:0, bottom:0, left:0},
        __width = 200,
        __height = 200,
        _diameter = 100,
        _chartType = 'N',
        _label="",
        _fontSize=20;


    var _mouseClick;

    var _value= 0,
        _value2= 0,
        _value3= 0,
        _minValue = 0,
        _maxValue = 100;

    var  _currentArc= 0, _currentArc2= 0, _currentArc3=0, _currentValue= 0, _currentValue2=0;

    var _arc = d3.svg.arc()
        .startAngle(0 * (Math.PI/180)); //just radians

    var _arc2 = d3.svg.arc()
        .startAngle(0 * (Math.PI/180))
        ; //just radians

    var _arc3 = d3.svg.arc()
            .startAngle(0 * (Math.PI/180))
        ; //just radians


    _selection=d3.select(parent);


    function component() {

        _selection.each(function (data) {

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            var enter = svg.enter().append("svg").attr("class","radial-svg").append("g");

            measure();

            svg.attr("width", __width)
                .attr("height", __height);


            var background1 = enter.append("g").attr("class","component1")
                .attr("cursor","pointer")
                .on("click",onMouseClick);


            var background2 = enter.append("g").attr("class","component2")
                .attr("cursor","pointer")
                .on("click",onMouseClick);

            var background3 = enter.append("g").attr("class","component3")
                .attr("cursor","pointer")
                .on("click",onMouseClick);


            _arc.endAngle(360 * (Math.PI/180));
            _arc2.endAngle(360 * (Math.PI/180));
            _arc3.endAngle(360 * (Math.PI/180));

           /*
            background.append("rect")
                .attr("class","background")
                .attr("width", _width)
                .attr("height", _height);
            */

            background1.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);

            if (_value2 > 0)
              background2.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc2);

            if (_value3 > 0)
              background3.append("path")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc3);


            background1.append("text")
                .attr("class", "label")
                .attr("transform", "translate(" + _width/2 + "," + (_width + _fontSize) + ")")
                .text(_label);


            var g = svg.select("g")
                .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");


            _arc.endAngle(_currentArc);
            enter.append("g").attr("class", "arcs");
            var path = svg.select(".arcs").selectAll(".arc").data(data);
            path.enter().append("path")
                .attr("class","arc")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc);

            //Another path in case we exceed 100%
            var path2 = svg.select(".arcs").selectAll(".arc2").data(data);
            if (_value2 > 0)
              path2.enter().append("path")
                .attr("class","arc2")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc2);

            //
            var path3 = svg.select(".arcs").selectAll(".arc3").data(data);
            if (_value3 > 0)
              path3.enter().append("path")
                .attr("class","arc3")
                .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
                .attr("d", _arc3);


            enter.append("g").attr("class", "labels");



            if (_value2 < 0 && _value3 < 0) {
              var label = svg.select(".labels").selectAll(".label").data(data);

              label.enter().append("text")
                .attr("class","label")
                .attr("y",_width/2+_fontSize/3)
                .attr("x",_width/2)
                .attr("cursor", "pointer")
                .attr("width", _width)
                //.attr("x",(3*_fontSize/2))
                .attr("fill", "white")
                .style("font-size", "20px")
                //.style("color","red")
                .on("click", onMouseClick);


            } /*else {

              var label = svg.select(".labels").selectAll(".label").data(data);

              label.enter().append("text")
                .attr("class", "label")
                //.attr("y",_height +_fontSize)
                .attr("y",_width/2+_fontSize/3)
                .attr("x",_width/2)
                .attr("cursor", "pointer")
                .attr("width", _width)
                //.attr("x",(3*_fontSize/2))
                .attr("fill", "white")
                .text(function (d) {
                  //return Math.round((_value - _minValue) / (_maxValue - _minValue) * 100) + "%"
                  return "";
                })
                .style("font-size", "11px")
                //.style("color","red")
                .on("click", onMouseClick);
            }*/


            path.exit().transition().duration(500).attr("x",1000).remove();


            layout(svg);

            function layout(svg) {

              var ratio = (_value - _minValue) / (_maxValue - _minValue);
              var endAngle = Math.min(360 * ratio, 360);
              endAngle = endAngle * Math.PI / 180;

              var ratio2 = (_value2 - _minValue) / (_maxValue - _minValue);
              var endAngle2 = Math.min(360 * ratio2, 360);
              endAngle2 = endAngle2 * Math.PI / 180;

              var ratio3 = (_value3 - _minValue) / (_maxValue - _minValue);
              var endAngle3 = Math.min(360 * ratio3, 360);
              endAngle3 = endAngle3 * Math.PI / 180;

              path.datum(endAngle);
              path.transition().duration(_duration)
                .attrTween("d", arcTween);

              /*
               if (ratio > 1) {
               path2.datum(Math.min(360*(ratio-1),360) * Math.PI/180);
               path2.transition().delay(_duration).duration(_duration)
               .attrTween("d", arcTween2);
               }
               */

              path2.datum(endAngle2);
              path2.transition().duration(_duration)
                .attrTween("d", arcTween2);


              path3.datum(endAngle3);

              path3.transition().duration(_duration)
                .attrTween("d", arcTween3);


              if (_value2 < 0 && _value3 < 0) {
                label.datum(Math.round(ratio * 100));
                label.transition().duration(_duration)
                  .tween("text", labelTween);
              }


              /*
                label2.datum(Math.round(ratio2*100));
                label2.transition().duration(_duration)
                    .tween("text",labelTween2);
              */

            }

        });

        function onMouseClick(d) {
            if (typeof _mouseClick == "function") {
                _mouseClick.call();
            }
        }
    }

    function labelTween(a) {
        var i = d3.interpolate(_currentValue, a);
        _currentValue = i(0);

        return function(t) {
            _currentValue = i(t);

            if (_chartType === 'N')
              this.textContent = Math.round(i(t));
            else if (_chartType === 'P')
              this.textContent = Math.round(i(t)) + "%";


        }
    }

    function labelTween2(a) {
        var i = d3.interpolate(_currentValue2, a);
        _currentValue2 = i(0);

        return function(t) {
          _currentValue2 = i(t);

          if (_chartType === 'P')
            this.textContent = Math.round(i(t)) + "%";
          else if (_chartType === 'N')
            this.textContent = Math.round(i(t));
        }
    }

    function arcTween(a) {
        var i = d3.interpolate(_currentArc, a);

        return function(t) {
            _currentArc=i(t);
            return _arc.endAngle(i(t))();
        };
    }

    function arcTween2(a) {
        var i = d3.interpolate(_currentArc2, a);

        return function(t) {
            return _arc2.endAngle(i(t))();
        };
    }

    function arcTween3(a) {
        var i = d3.interpolate(_currentArc3, a);

        return function(t) {
            return _arc3.endAngle(i(t))();
        };
    }


    function measure() {
        _width=_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
        _height=_width;
        _fontSize=_width*.2;
        _arc.outerRadius(_width/2);
        _arc.innerRadius(_width/2 * .75);
        _arc2.outerRadius(_width/2 * .75);
        _arc2.innerRadius(_width/2 * .75 - (_width/2 * .25));
        _arc3.outerRadius(_width/2 * .75 - (_width/2 * .25));
        _arc3.innerRadius(_width/2 * .75 - (_width/2 * .25) - (_width/2 * .25));
    }


    component.render = function() {
        measure();
        component();
        return component;
    }

    component.value = function (_) {
        if (!arguments.length) return _value;
        _value = [_];
        _selection.datum([_value]);
        return component;
    }

    component.value2 = function (_) {
        if (!arguments.length) return _value2;
        _value2 = [_];
        _selection.datum([_value2]);
        return component;
    }

    component.value3 = function (_) {
        if (!arguments.length) return _value3;
        _value3 = [_];
        _selection.datum([_value3]);
        return component;
    }

    component.margin = function(_) {
        if (!arguments.length) return _margin;
        _margin = _;
        return component;
    };

    component.diameter = function(_) {
        if (!arguments.length) return _diameter
        _diameter =  _;
        return component;
    };

    component.chartType = function(_) {
      if (!arguments.length) return _chartType
      _chartType =  _;
      return component;
    };

    component.minValue = function(_) {
        if (!arguments.length) return _minValue;
        _minValue = _;
        return component;
    };

    component.maxValue = function(_) {
        if (!arguments.length) return _maxValue;
        _maxValue = _;
        return component;
    };

    component.label = function(_) {
        if (!arguments.length) return _label;
        _label = _;
        return component;
    };

    component._duration = function(_) {
        if (!arguments.length) return _duration;
        _duration = _;
        return component;
    };

    component.onClick = function (_) {
        if (!arguments.length) return _mouseClick;
        _mouseClick=_;
        return component;
    }

    return component;

}
