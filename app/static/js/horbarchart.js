var horChart = function( opts ) {
     'use strict';
    
    this.data = opts.data || [];
    this.placeholder = opts.placeholder || '';   
    
    // object dimensions
    this.width =  parseInt(d3.select('#' + this.placeholder).style('width'), 10);
    this.height = 600;
    this.margin = {
        top: 20,
        right: 110,
        bottom: 20,
        left: 180
    };
    

    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.innerHeight = this.height - this.margin.top - this.margin.bottom;

    this.canvas = d3.select("#" + this.placeholder).append("svg")
        .attr("width", this.width)
        .attr("height",this.height)
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.xScale = d3.scale.linear()
        .range([0,this.innerWidth]);
    
    this.yScale = d3.scale.ordinal()
        .rangeRoundBands([0, this.innerHeight], .1);

    
    this.xAxis = d3.svg.axis()
        .scale(this.xScale)
        .orient("bottom")
        .ticks(10);

    this.yAxis = d3.svg.axis()
        .scale(this.yScale)
        .orient("left");
        
//
//    this.xAxisGroup = this.canvas.append("g")
//                        .attr("class", "x axis")
//                        .attr("transform", "translate(0," + this.innerHeight + ")")
//                        .call(this.xAxis);

    this.yAxisGroup = this.canvas.append("g")
                        .attr("class", "y axis hor")
                        .attr("transform", "translate(10,0)")
                        .call(this.yAxis);
//                        .append("text")
//                        .attr("transform", "rotate(-90)")
//                        .attr("y", 6)
//                        .attr("dy", "1em")
//                        .style("text-anchor", "end")
//                        .text("Verleend bedrag (in duizenden)");
//    
    
    this.canvas.append('g').attr("class", "barsubtext")
        .attr("transform", 'translate('+ (this.width - this.margin.left - 10) +', 0)')
        .append('text')
        .text('Verleend bedrag (in duizenden)')
        .style("text-anchor", "end");
    
    
    this.setData = function( data_i ){
        this.data = data_i;
        this.redrawData();
    };
    
    this.redrawData = function( ){
        var that = this; // done to overcome the scoping issue

        this.xScale.domain([0, d3.max(this.data, function(d) { return d.values; })]);
        this.yScale.domain(this.data.map(function(d) { return d.key; }));
        
        this.canvas.select('.x.axis').transition().duration(300).call(this.xAxis);
        this.canvas.select('.y.axis').transition().duration(300).call(this.yAxis);

        var bars = this.canvas.selectAll(".bar").data(this.data, function(d) { return d.key; });

        bars.enter().append("rect")
            .attr('class', 'bar shown')
            .attr('id', function(d, i){ return d.key.replace(/[^\w]/g,''); })
            .attr('x', 10)
            .attr('y', function(d){ return that.yScale(d.key);})
            .attr('width', function(d){return that.xScale(d.values);})
            .attr( 'height', that.yScale.rangeBand() )
            .on('click', function(d){ 
                var topValue = 10;
                // set parameters
                if( d3.select(this).attr('class') == 'bar notshown' ){ d3.select(this).attr('class', 'bar shown') } else{ d3.select(this).attr('class', 'bar notshown') };     

                var bars = d3.selectAll('.bar.shown');

                // reset the domain of the x bar
                bars.each(function(d) {
                            if( d3.select(this).datum().values > topValue ) { topValue = d3.select(this).datum().values; } ; // Transform to d3 Object
                        });
                that.xScale.domain([0,topValue]);

                // update the bars
                bars = that.canvas.selectAll(".bar").data(that.data, function(d){ return d.key; }); // bind the data to the bars
                bars.transition().duration(300).attr("width", function(d){ if( d3.select(this).attr("class") == 'bar notshown') { return 10; } else { return that.xScale(d.values); } } );

                txts = that.canvas.selectAll(".bartext").data(that.data, function(d){ return d.key; }); // bind the data to the bars
                txts.transition().duration(300).attr("x", function(d, i){ if( that.canvas.select("#"+d.key.replace(/[^\w]/g,'')).attr("class") == 'bar notshown') { return 20; } else { return that.xScale(d.values) + 15 ; } } );

                });
        
        bars.transition()
            .duration(300)
            .attr("width", function(d) { return  that.xScale(d.values); })
            .attr("y", function(d){ return that.yScale(d.key);})
            .attr("height", that.yScale.rangeBand());
        
        bars.exit().remove();
        
        var txts = this.canvas.selectAll(".bartext").data(this.data, function(d){return d.key;});

        txts.exit().remove();

        txts.transition()
            .duration(300)
            .attr("x", function(d){ return that.xScale(d.values) + 15 ; })
            .attr("y", function(d) {
                return that.yScale(d.key) + that.yScale.rangeBand() / 2 + (8 /2);
            })
            .text(function(d){
                 return eur(d3.round(d.values));
            });

        txts.enter()
            .append("text")
            .attr("class", "bartext")
            .attr("text-anchor", "right")
            .attr("fill", "black")
            .attr("x", function(d){ return that.xScale(d.values) + 15 ; })
            .attr("y", function(d) {
                return that.yScale(d.key) + (that.yScale.rangeBand() / 2) + (8 /2);
            })
            .text(function(d){
                 return eur(d3.round(d.values));
            });
        
    };
    
    this.resized = function(){
        this.width =  parseInt(d3.select('#' + this.placeholder).style('width'), 10);
        this.height = 300;
        this.margin = {
            top: 20,
            right: 110,
            bottom: 20,
            left: 180
        };
    
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;
        
        //console.log("resized", this.width);
        
        d3.select("#" + this.placeholder).select("svg").attr("width", this.width);
        
        this.xScale.range([0, this.innerWidth])
//        this.xAxisGroup.call(this.xAxis);
        
        var that = this;
        this.canvas.selectAll('.bar')
            .attr("width", function(d){ if( d3.select(this).attr("class") == 'bar notshown') { return 10; } else { return that.xScale(d.values); } } );
//            .attr("width", function(d){return that.xScale(d.values);} );
        
        
        this.canvas.selectAll('.bartext')
            .attr("x", function(d, i){ if( that.canvas.select("#"+d.key.replace(/[^\w]/g,'')).attr("class") == 'bar notshown') { return 25; } else { return that.xScale(d.values) + 15 ; } } );
        
        this.canvas.selectAll('.barsubtext')
            .attr("transform", 'translate('+ (this.width - this.margin.left - 10) +', 0)')
            
//            .attr('x', function(d){ return that.xScale(d.values) + 15 ; });
//        this.yScale.rangeRoundBands([0, this.innerHeight], .1);
//        this.yAxisGroup.call( this.yAxis);  
//        
//        this.xScale.range([this.innerWidth, 0]);
//        this.xAxisGroup.call(this.xAxis);
        
//        var that = this;
//        var aWidth = this.xScale.rangeBand()
//        this.canvas.selectAll('.bar')
//            .attr("x", function(d) { return that.xScale(d.key); })
//            .attr('width', aWidth );
    }
    
}