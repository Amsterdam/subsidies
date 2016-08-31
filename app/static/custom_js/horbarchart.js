var HorBarChart = function (opts) {
    'use strict';
    
    this.data = opts.data || [];
    this.placeholder = opts.placeholder || '';
    
    // object dimensions
    this.width = 800;
    this.height = 500;
    this.margin = {
        top: 30,
        right: 20,
        bottom: 20,
        left: 180
    };
    
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    this.draw();
    this.initScales();
    this.initAxes();
    this.redrawData();
};

HorBarChart.prototype.draw = function () {
    'use strict';
    this.canvas = d3.select("#" + this.placeholder).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
};

HorBarChart.prototype.initScales = function () {
    'use strict';
    
    this.x = d3.scale.linear()
        .range([0, this.innerWidth]);
    
    this.y = d3.scale.ordinal()
        .rangeRoundBands([0, this.innerHeight], .1);
    
};

HorBarChart.prototype.initAxes = function () {
    'use strict';
    
    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("top")
        .ticks(10);

    this.canvas.append("g")
        .attr("class", "y axis hor")
        .attr("transform",  "translate(0,0)") //"translate(0," + this.innerHeight + ")")
        .call(this.yAxis);

    this.canvas.append("g")
        .attr("class", "x axis hor")
        .attr("transform", "translate(0,-10)")
        .call(this.xAxis)
        .append('text')
        .style("text-anchor", "end")
        .attr("transform", "translate(" + this.innerWidth + ",10)")
        .text('Toegekend bedrag (in duizenden)')
};

HorBarChart.prototype.redrawData = function () {
    'use strict';
    var _this = this; // done to overcome the scoping issue

    this.x.domain([0, d3.max(this.data, function(d) { return d.values; })]);
    this.y.domain(this.data.map(function(d) { return d.key; }));
    
    this.canvas.select('.x.axis').transition().duration(300).call(this.xAxis);
    this.canvas.select(".y.axis").transition().duration(300).call(this.yAxis);

    var bars = this.canvas.selectAll(".bar").data(this.data, function(d) { return d.key; });

    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("width", function(d) { return  _this.x(d.values); })
        .attr("y", function(d) { return _this.y(d.key); })
        .attr("height", _this.y.rangeBand());

    bars.transition()
        .duration(1000)
        .attr("width", function(d) { return  _this.x(d.values); })
        .attr("y", function(d) { return _this.y(d.key); })
        .attr("height", _this.y.rangeBand());
    
    bars.exit().remove();
};

// later option to call a function
HorBarChart.prototype.onEnterTrans = function () {
    
};

HorBarChart.prototype.setData = function (newData) {
    'use strict';
    this.data = newData;
    this.redrawData()
};

/*
var tst = new BarChart({placeholder: 'jscontainer'});

setTimeout(function(){
    tst.setData([{key: 'A', values:120},{key: 'B', values:40},{key: 'C', values: 70}]);
}, 2000);*/
