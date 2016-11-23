var HorBarChart = function(opts){ 
    this.data = opts.data || [];
    this.placeholder = opts.placeholder || '';

    // object dimensions
    this.width = parseInt(d3.select('#' + this.placeholder).style('width'), 10); // d3.select("#holder").node().getBoundingClientRect().width;//200;
    this.height = 0.7 * this.width;
    this.margin = {
        top: 20,
        right: 100,
        bottom: 20,
        left: 180
    };

    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    this.buid();
};

HorBarChart.prototype.buid = function (){
    this.canvas = d3.select("#"+ this.placeholder)
                        .append("svg")
                        .attr("preserveAspectRatio", "xMinYMin meet")
                        .attr("viewBox", "0 0 " + this.width + " " + this.height)
                        .classed("svg-hor-cont", true)
                        .append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x = d3.scale.linear().range([0, this.innerWidth]);
    this.y = d3.scale.ordinal().rangeRoundBands([0, this.innerHeight], .1);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom")
        .ticks(10);

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.canvas
        .append('g')
        .attr('class', 'y axis hor')
        .attr('transform', 'translate(10,0)')
        .call(this.yAxis);
    
    this.canvas.append('g')
        .attr("transform", 'translate('+ (this.width - this.margin.left - 10) +', 0)')
        .append('text')
        .text('Verleend bedrag (in duizenden)')
        .style("text-anchor", "end")
        .attr("font-size", "12px");
};

HorBarChart.prototype.redraw = function() {

        this.x.domain([0,d3.max(this.data, function(d){return d.values;})]);
        this.y.domain(this.data.map(function(d){return d.key;}));//['a','b','c']);

        this.canvas.select(".y.axis").transition().duration(300).call(this.yAxis);

        var that = this;

        var bars = this.canvas.selectAll(".bar").data(this.data, function(d){return d.key;});

        bars.exit().remove();

        bars.transition()
            .duration(300)
            .attr("width", function(d) { return  that.x(d.values); })
            .attr("y", function(d){ return that.y(d.key);})
            .attr("height", that.y.rangeBand());

        bars.enter()
            .append('rect')
            .attr('class', 'bar shown')
            .attr('id', function(d, i){ return d.key.replace(/[^\w]/g,''); })
            .attr('x', 10)
            .attr('y', function(d){ return that.y(d.key);})
            .attr('width', function(d){return that.x(d.values);})
            .attr( 'height', that.y.rangeBand() )
            .on('click', function(d){ 
                var topValue = 10;
                // set parameters
                if( d3.select(this).attr('class') == 'bar notshown' ){ d3.select(this).attr('class', 'bar shown') } else{ d3.select(this).attr('class', 'bar notshown') };     

                var bars = d3.selectAll('.bar.shown');

                // reset the domain of the x bar
                bars.each(function(d) {
                            if( d3.select(this).datum().values > topValue ) { topValue = d3.select(this).datum().values; } ; // Transform to d3 Object
                        });
                that.x.domain([0,topValue]);

                // updat the bars
                bars = that.canvas.selectAll(".bar").data(that.data, function(d){ return d.key; }); // bind the data to the bars
                bars.transition().duration(300).attr("width", function(d){ if( d3.select(this).attr("class") == 'bar notshown') { return 10; } else { return that.x(d.values); } } );

                txts = that.canvas.selectAll(".bartext").data(that.data, function(d){ return d.key; }); // bind the data to the bars
                txts.transition().duration(300).attr("x", function(d, i){ if( that.canvas.select("#"+d.key.replace(/[^\w]/g,'')).attr("class") == 'bar notshown') { return 20; } else { return that.x(d.values) + 15 ; } } );

                });

        var txts = this.canvas.selectAll(".bartext").data(this.data, function(d){return d.key;});

        txts.exit().remove();

        txts.transition()
            .duration(300)
            .attr("x", function(d){ return that.x(d.values) + 15 ; })
            .attr("y", function(d) {
                return that.y(d.key) + that.y.rangeBand() / 2 + (8 /2);
            })
            .text(function(d){
                 return d3.round(d.values);
            });

        txts.enter()
            .append("text")
            .attr("class", "bartext")
            .attr("text-anchor", "right")
            .attr("font-size", "1em")
            .attr("fill", "black")
            .attr("x", function(d){ return that.x(d.values) + 15 ; })
            .attr("y", function(d) {
                return that.y(d.key) + (that.y.rangeBand() / 2) + (8 /2);
            })
            .text(function(d){
                 return d3.round(d.values);
            });

    };

    HorBarChart.prototype.setData = function(data){
        this.data = data;
        this.canvas.selectAll('.bar.notshown').attr('class', 'bar shown');
        this.redraw();
    }
