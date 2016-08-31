var data = [];
var graph_aangevraagd_toegekend = null;
var graph_periodiek = null;
var graph_thema = null;

function readData() {
    'use strict';
    
    var ssv = d3.dsv(';');
    ssv("subsidie_out2.csv", type, function(error, data_csv) {
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
};

function initPage () {
    'use strict';
    graph_aangevraagd_toegekend = new BarChart({placeholder:"graph_aangevraagd_toegekend"});
    graph_periodiek = new BarChart({placeholder:"graph_periodiek"});
    graph_thema = new HorBarChart({placeholder:"graph_thema"});
};
initPage();
readData();
