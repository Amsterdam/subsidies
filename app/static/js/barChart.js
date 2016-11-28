var barChart = function( opts ) {
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

    this.canvas = d3.select("#" + this.placeholder).append("svg")
        .attr("width", this.width)
        .attr("height",this.height)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    
    this.xScale = d3.scale.ordinal()
        .rangeRoundBands([0, this.innerWidth], .1);

    this.yScale = d3.scale.linear()
        .range([this.innerHeight, 0]);
    
    this.xAxis = d3.svg.axis()
        .scale(this.xScale)
        .orient("bottom");

    this.yAxis = d3.svg.axis()
        .scale(this.yScale)
        .orient("left")
        .ticks(10);

    this.xAxisGroup = this.canvas.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + this.innerHeight + ")")
                        .call(this.xAxis);

    this.yAxisGroup = this.canvas.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(-15,0)")
                        .call(this.yAxis)
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", "1em")
                        .style("text-anchor", "end")
                        .text("Verleend bedrag (in duizenden)");
    
    
    
    this.setData = function( data_i ){
        this.data = data_i;
        this.redrawData();
    };
    
    this.redrawData = function( ){
//        console.log( 'redraw was called' );
        var _this = this; // done to overcome the scoping issue

        this.xScale.domain(this.data.map(function(d) { return d.key; }));
        this.yScale.domain([0, d3.max(this.data, function(d) { return d.values; })]);

        this.canvas.select('.x.axis').transition().duration(300).call(this.xAxis);
        this.canvas.select('.y.axis').transition().duration(300).call(this.yAxis);

        var bars = this.canvas.selectAll(".bar").data(this.data, function(d) { return d.key; });

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return _this.xScale(d.key); })
            .attr("width", _this.xScale.rangeBand())
            .attr("y", function(d) { return _this.yScale(d.values); })
            .attr("height", function(d) { return _this.innerHeight - _this.yScale(d.values); });

        bars.transition()
            .duration(1000)
            .attr("x", function(d) { return _this.xScale(d.key); })
            .attr("width", this.xScale.rangeBand())
            .attr("y", function(d) { return _this.yScale(d.values); })
            .attr("height", function(d) { return _this.innerHeight - _this.yScale(d.values); });

        bars.exit().remove();
        
    };
    
    this.resized = function(){
        var width = d3.select('#' + this.placeholder).style('width');
    
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
        
        //console.log("resized", this.width);
        
        d3.select("#" + this.placeholder).select("svg").attr("width", width);
        this.xScale.rangeRoundBands([0, this.innerWidth], .1);
        this.xAxisGroup.call( this.xAxis);  
        
        this.yScale.range([this.innerHeight, 0]);
        this.yAxisGroup.call(this.yAxis);
        
        var that = this;
        var aWidth = this.xScale.rangeBand()
        this.canvas.selectAll('.bar')
            .attr("x", function(d) { return that.xScale(d.key); })
            .attr('width', aWidth );
    }
    
}