/*
    initialization of basic variables
*/
var data = [];
var graph_aangevraagd_toegekend = null;
var graph_periodiek = null;
var graph_thema = null;
var minEntries = 50;
var NL = d3.locale({
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["€ ", ""],
        "dateTime": "%a %b %e %X %Y",
        "date": "%m/%d/%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Zondag", "Maandag", "Dinsgag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
        "shortDays": ["Zo", "Ma", "Di", "Woe", "Do", "Vrij", "Zat"],
        "months": ["januarie", "februarie", "Maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    });

var eur = NL.numberFormat("$,.2f");  

/*
    read data from source, place in local variable and start further initialization of the app
*/
function readData() {
    'use strict';
    
    var ssv = d3.dsv(';');
    ssv("static/data/subsidie_out2.csv", type, function(error, data_csv) {
        if (error) { throw error; } ;
        data = data_csv;
        buildYearSelecter();
        dataPrep();
    });  
};

/*
    method fills a pull down menu for selecting data
    options are populated via nested structure to create year selector
*/
var buildYearSelecter = function(){
    'use strict';
    var nest = d3.nest()
        .key( function(d){return d.SUBSIDIEJAAR;})
        .rollup(function(leaves) { return leaves.length; })
        .entries(data)
    
    nest = nest.filter(function(d) { return d.values > minEntries })

    var select_i = d3.select('#fltrJaar').on('change',dataPrep);

    select_i.selectAll("option")
        .data(nest).enter()
        .append('option')
        .text(function(d){return d.key;});
}

/*
    Basic data preperation function. Used to typecast data
*/
function type(d) {
    'use strict';
    d.BEDRAG_VERLEEND = +d.BEDRAG_VERLEEND;
    d.BEDRAG_AANGEVRAAGD = +d.BEDRAG_AANGEVRAAGD; 
    d.SUBSIDIEJAAR = +d.SUBSIDIEJAAR;    
    return d;
};

/*
    method that prepares the data for use in the different charts
*/
function dataPrep() {
   'use strict';
    var data_filterd = [];
    var yearSel = document.getElementById('fltrJaar');
    var year = yearSel.options[yearSel.selectedIndex].value;
    
    data_filterd = data.filter( function(row) {return row['SUBSIDIEJAAR'] === +year;});

    var data_vraag_verleend = [
        {'key':'Aangevraagd', 'values':d3.sum(data_filterd, function(d){return d.BEDRAG_AANGEVRAAGD / 1000;})},
        {'key':'Verleend', 'values':d3.sum(data_filterd, function(d){return d.BEDRAG_VERLEEND / 1000;})}];
    
    data_vraag_verleend.sort(function(a,b){return d3.ascending(a.key, b.key);})
    
    var data_periode = d3.nest()
          .key(function(d) { return d.TYPE_PERIODICITEIT;})
          .rollup(function(d) { 
           return d3.sum(d, function(g) {return g.BEDRAG_VERLEEND / 1000; });
          }).entries(data_filterd);

    data_periode.sort(function(a,b){return d3.ascending(a.key, b.key);})
    
    var data_thema = d3.nest()
          .key(function(d) { return d.AFDELINGNAAM_BELEID;})
          .rollup(function(d) { 
           return d3.sum(d, function(g) {return g.BEDRAG_VERLEEND / 1000; });
          }).entries(data_filterd);
        
    data_thema.sort(function(a,b){return d3.descending(a.values, b.values);})
    
    
    var maxValue;
    maxValue = d3.max(data_thema, function(d) { return d.values; });
    var i = document.getElementById("input");
    i.setAttribute("max", maxValue);
    i.setAttribute("value", maxValue);
    graph_thema.upper = maxValue;
    
    giveData(data_vraag_verleend, data_periode, data_thema);
};                  

/*
    method used to place data in the different widgets in the app.
*/
function giveData( data_vraag_verleend, data_periode, data_thema ){
    'use strict';
    graph_aangevraagd_toegekend.setData(data_vraag_verleend);
    graph_periodiek.setData(data_periode);
    graph_thema.setData(data_thema);
    
    d3.select('#aangevraagd').text(eur(data_vraag_verleend[0].values * 1000))
    d3.select('#verleend').text(eur(data_vraag_verleend[1].values * 1000))
        
    d3.select('#periodiek').text(eur(data_periode[0].values * 1000))
    d3.select('#eenmalig').text(eur(data_periode[1].values * 1000))
        
};

/*
    method used for initialization of the app
*/
function initPage () {
    'use strict';
    graph_aangevraagd_toegekend = new BarChart({placeholder:"graph_aangevraagd_toegekend"});
    graph_periodiek = new BarChart({placeholder:"graph_periodiek"});
    graph_thema = new HorBarChart({placeholder:"graph_thema"});
};

function sliderChange(d){
    graph_thema.upper = +d;
    graph_thema.redrawData()
};
initPage();
readData();
