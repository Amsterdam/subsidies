var BarChart = function (opts) {
    'use strict';
    this.data = opts.data || [];
    this.placeholder = opts.placeholder || '';
    
    // object dimensions
    this.width =  parseInt(d3.select('#' + this.placeholder).style('width'), 10);
    this.height = 300;
    this.margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 80
    };
    
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    
    this.draw();
    this.initScales();
    this.initAxes();
    this.redrawData();
    
};

BarChart.prototype.resized = function () {
    var w = parseInt(d3.select('#' + this.placeholder).style('width'), 10);

    this.width = w;
    this.height = 300;
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;
    
    this.canvassvg
        .attr("width", this.width)
        .attr("height", this.height)
        .style("background-color", "yellow");
    
    this.canvas.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    
    this.y.range([0, this.innerHeight]);
    this.x.rangeRoundBands([this.innerWidth, 0], 0.1);
    
    this.canvas.select(".x axis")
                .call(this.xAxis)
                .attr("transform", "translate(0," + innerHeight + ")")
      
    
//    this.canvassvg.select(".x.axis").call(this.xAxis);//.attr("transform", "translate(0," + this.width + ")");
    
//    this.canvassvg.attr("width", w)
//                .attr("height", .7 *  w);
//    
//    this.canvas.attr("width", w)
//            .attr("height", .7 *  w);
}

BarChart.prototype.draw = function () {
    'use strict';
    
    this.canvassvg = d3.select("#" + this.placeholder).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .style("background-color", "yellow");
    
    this.canvas = this.canvassvg
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
};

BarChart.prototype.initScales = function () {
    'use strict';
    
    this.x = d3.scale.ordinal()
        .rangeRoundBands([0, this.innerWidth], .1);

    this.y = d3.scale.linear()
        .range([this.innerHeight, 0]);
};

BarChart.prototype.initAxes = function () {
    'use strict';
    
    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left")
        .ticks(10);

    this.canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.innerHeight + ")")
        .call(this.xAxis);

    this.canvas.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(-15,0)")
        .call(this.yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Verleend bedrag (in duizenden)");
};

BarChart.prototype.redrawData = function () {
    'use strict';
    var _this = this; // done to overcome the scoping issue

    this.x.domain(this.data.map(function(d) { return d.key; }));
    this.y.domain([0, d3.max(this.data, function(d) { return d.values; })]);

    this.canvas.select('.x.axis').transition().duration(300).call(this.xAxis);
    this.canvas.select(".y.axis").transition().duration(300).call(this.yAxis);

    var bars = this.canvas.selectAll(".bar").data(this.data, function(d) { return d.key; });

    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return _this.x(d.key); })
        .attr("width", _this.x.rangeBand())
        .attr("y", function(d) { return _this.y(d.values); })
        .attr("height", function(d) { return _this.innerHeight - _this.y(d.values); });

    bars.transition()
        .duration(1000)
        .attr("x", function(d) { return _this.x(d.key); })
        .attr("width", this.x.rangeBand())
        .attr("y", function(d) { return _this.y(d.values); })
        .attr("height", function(d) { return _this.innerHeight - _this.y(d.values); });

    bars.exit().remove();
};

// later option to call a function
BarChart.prototype.onEnterTrans = function () {
    
};

BarChart.prototype.setData = function (newData) {
    'use strict';
    this.data = newData;
    this.redrawData()
};

