var data = [];
var graph_aangevraagd_toegekend = null;
var graph_periodiek = null;
var graph_thema = null;

var NL = d3.locale({
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["€ ", ""],
        "dateTime": "%a %b %e %X %Y",
        "date": "%m/%d/%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
        "shortDays": ["Zo", "Ma", "Di", "Woe", "Do", "Vrij", "Zat"],
        "months": ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    });

var eur = NL.numberFormat("$,.2f");  

function readData() {
    'use strict';
    
    var ssv = d3.dsv(';');
    ssv("static/data/subsidie_out2.csv", type, function(error, data_csv) {
        if (error) { throw error; } ;
        data = data_csv;
        dataPrep();
    });  
};

function type(d) {
    'use strict';
    d.BEDRAG_VERLEEND = +d.BEDRAG_VERLEEND;
    d.BEDRAG_AANGEVRAAGD = +d.BEDRAG_AANGEVRAAGD; 
    d.SUBSIDIEJAAR = +d.SUBSIDIEJAAR;    
    return d;
};

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
    
    giveData(data_vraag_verleend, data_periode, data_thema);
};                  

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

function initPage () {
    'use strict';
    graph_aangevraagd_toegekend = new BarChart({placeholder:"graph_aangevraagd_toegekend"});
    graph_periodiek = new BarChart({placeholder:"graph_periodiek"});
    graph_thema = new HorBarChart({placeholder:"graph_thema"});
};
initPage();
readData();
