var data = [];
var jaren = [];
var data_vraag_verleend = [];
var graph_aangevraagd_toegekend = null;
var graph_periodiek = null;
var graph_thema = null;


$(document).ready(function () {
    $('.navigation-toggle li a').click(function(e) {
        $('.navigation-toggle li').removeClass('active');
        
        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
        graph_periodiek.resized();
        graph_aangevraagd_toegekend.resized();
        graph_thema.resized();
    });
});

//Functon to show divs from the nav menu
function show_div(toShow)
{
    var feiten = document.getElementById('feiten');
    var lijsten = document.getElementById('lijsten');
    
    if( toShow === 'feiten') {
        feiten.style.display = '';
        lijsten.style.display = 'none';
    } else {
        feiten.style.display = 'none';
        lijsten.style.display = '';
    }
}


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
    })

var eur = NL.numberFormat("$,.0f");  

/**Parses string formatted as YYYY-MM-DD to a Date object.
* If the supplied string does not match the format, an 
* invalid Date (value NaN) is returned.
* @param {string} dateStringInRange format YYYY-MM-DD, with year in
* range of 0000-9999, inclusive.
* @return {Date} Date object representing the string.
*/
function parseISO8601(dateStringInRange) {
    'use strict';
    
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
        date = new Date(NaN), month,
        parts = isoExp.exec(dateStringInRange);
        if (parts) {
          month = +parts[2];
          date.setFullYear(parts[1], month - 1, parts[3]);
          if (month != date.getMonth() + 1) {
            date.setTime(NaN);
          }
        }
        return date;
};


/*
*  Basic function for reading the data from file
*  Used to read data and place it in a local variable
*/
function readData() {
    'use strict';
//    console.log('reading data')
    var ssv = d3.dsv(',');
    ssv("static/data/subsidie_out2.csv", type, function(error, data_csv) {
        if (error) { throw error; } ;
        data = data_csv
        
        jaren = d3.nest()
            .key( function(d){return d.SUBSIDIEJAAR;})
            .rollup(function(leaves) { return leaves.length; })
            .entries(data);
        
        buildPage();
    });  
};


/*
*   Function used for typecasting the data 
*   to required formats
*/

function type( d ) {
    'use strict';
    
    d.BEDRAG_VERLEEND = +d.BEDRAG_VERLEEND;
    d.BEDRAG_AANGEVRAAGD = +d.BEDRAG_AANGEVRAAGD; 
    d.BEDRAG_VASTGESTELD = +d.BEDRAG_VASTGESTELD;
    d.SUBSIDIEJAAR = +d.SUBSIDIEJAAR;  
    d.DATUM_OVERZICHT = parseISO8601(d.DATUM_OVERZICHT.substring(0, 10));
    
    return d;
    
};

//
//Function used to build up the webpage
//function places the basis structure of the page on 
//a blank webpage

function buildPage() {
    'use strict';
    
    buildGraphs();
    buildFilters();
    buildTables(data);
    
};

function buildGraphs(){
    
    var select_i = d3.select('#fltrJaar').on('change',dataPrep);
    var high = d3.max(jaren, function(d){ return d.key });

    select_i.selectAll("option")
        .data(jaren).enter()
        .append('option')
        .property("selected", function(d){ return d.key === high; })
        .text(function(d){return d.key;});
    
    initCharts();
};

function dataPrep(){
    'use strict';
    var data_filterd = [];
    var yearSel = document.getElementById('fltrJaar');
    var year = yearSel.options[yearSel.selectedIndex].value;
    
    
    data_filterd = data.filter( function(row) {return row['SUBSIDIEJAAR'] === +year;});

    var data_vraag_verleend = [
        {'key':'Aangevraagd', 'values':d3.sum(data_filterd, function(d){return d.BEDRAG_AANGEVRAAGD / 1000;})},
        {'key':'Verleend', 'values':d3.sum(data_filterd, function(d){return d.BEDRAG_VERLEEND / 1000;})},
        {'key':'Vastgesteld', 'values':d3.sum(data_filterd, function(d){return d.BEDRAG_VASTGESTELD / 1000;})}
    ];
    
    //data_vraag_verleend.sort(function(a,b){return d3.ascending(a.key, b.key);})
    
    var data_periode = d3.nest()
          .key(function(d) { return d.TYPE_PERIODICITEIT;})
          .rollup(function(d) { 
           return d3.sum(d, function(g) {return g.BEDRAG_VERLEEND / 1000; });
          }).entries(data_filterd);

    data_periode.sort(function(a,b){return d3.ascending(a.key, b.key);})
    
    var data_thema = d3.nest()
          .key(function(d) { return d.BELEIDSTERREIN;})
          .rollup(function(d) { 
           return d3.sum(d, function(g) {return g.BEDRAG_VERLEEND / 1000; });
          }).entries(data_filterd);
        
    data_thema.sort(function(a,b){return d3.descending(a.values, b.values);})
    
    var x = data[0].DATUM_OVERZICHT;
    document.getElementById('dataupdate').textContent = x.getDate().toString() + "-" + ( x.getMonth() + 1).toString() + "-" + x.getFullYear().toString();
    
    
    giveData(data_vraag_verleend, data_periode, data_thema);
};

//
//takes the prepared data and gives it to the graphs and tables

function giveData( data_vraag_verleend, data_periode, data_thema ){
    'use strict';
    
    graph_aangevraagd_toegekend.setData(data_vraag_verleend);
    graph_periodiek.setData(data_periode);
    graph_thema.setData(data_thema);
    
    d3.select('#aangevraagd_cell').text(eur(data_vraag_verleend[0].values * 1000))
    d3.select('#verleend_cell').text(eur(data_vraag_verleend[1].values * 1000))
    d3.select('#vastgesteld_cell').text(eur(data_vraag_verleend[2].values * 1000))
    
    d3.select('#eenmalig_cell').text(eur(data_periode[0].values * 1000))
    d3.select('#periodiek_cell').text(eur(data_periode[1].values * 1000))
    
        
};

//----
//plaatst de d3 elementen in het raamwerk
//----
function initCharts(){
    'use strict';
    
    graph_aangevraagd_toegekend = new barChart({placeholder:"aangevraagd_toegekend"});
    graph_periodiek = new barChart({placeholder:"periodiek"});
    graph_thema = new horChart({placeholder:"thema"});
    
    dataPrep();
};

//----
//opbouw van de verschillende filter elementen die controle invloed uitoefenen op de 
//table met subsidiegegevens 
//----
function buildFilters(){
    var divHolder = document.getElementById('lijstFilter');
    
    var zoek = document.createElement('div')
    zoek.innerHTML= "<label class='filter_label'>Zoeken</label><input type='text' id='myInputTextField'><hr>"
    divHolder.appendChild( zoek ) 
    
    
    var jaarFilter = document.createElement('div')
    jaarFilter.innerHTML= "<label class='filter_label'>Jaar</label><select id='jaar'></select><hr></div>"
    divHolder.appendChild( jaarFilter ) 
    
    var high = "2017"
    d3.select("#jaar")
                .selectAll("option")
                .data(jaren).enter()
                .append('option')
                .property("selected", function(d){ return d.key === high; })
                .text(function(d){ return d.key;});
    
    var bedragFilter = document.createElement('div')
    bedragFilter.innerHTML= '<label class="filter_label">Verleend bedrag</label>min.<br><input type="number" id="bedragVanaf"><br>max.<br><input type="number" id="bedragTot"><br><hr>';
    divHolder.appendChild( bedragFilter ) 
    

    var soortFilter = document.createElement('div')
    soortFilter.innerHTML= "<label class='filter_label'>Soort</label><label class='check'><input name='tijd' type= 'checkbox' id ='Periodiek'>Periodiek</label><br><label class='check'><input name='tijd' type='checkbox' id ='Eenmalig'>Eenmalig</label><hr>";
    divHolder.appendChild( soortFilter ) 
    
    
    // routine to populate the filter menu with checkboxes for the type
    var aDiv = document.createElement('div');
    aDiv.id = 'ftlrType'
    aDiv.innerHTML = '<label class="filter_label">Organisatie</label>'
    divHolder.appendChild(aDiv);
    
    var nested = d3.nest().key( function(d){ return d.ORGANISATIEONDERDEEL; }).entries(data);    
    nested = nested.sort(function(a,b){return d3.ascending(a.key, b.key);});
    nested.forEach( function(d){ 

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "type";
        checkbox.value = d.key;
        checkbox.id = "type_" + d.key.replace(/[^\w]/g,'')

        var label = document.createElement('label')
        label.htmlFor = "type_" + d.key.replace(/[^\w]/g,'');
        label.className = 'check';
        label.appendChild(document.createTextNode(d.key));

        aDiv.appendChild(checkbox);
        aDiv.appendChild(label);
        aDiv.appendChild(document.createElement('br'));

    });
    aDiv.appendChild(document.createElement('hr'));

    // routine to populate the filter menu with checkboxes for the type
    aDiv = document.createElement('div');
    aDiv.id = 'ftlrThema'
    aDiv.innerHTML = '<label class="filter_label">Thema</label>'
    divHolder.appendChild(aDiv);
    
    var nested = d3.nest().key( function(d){ return d.BELEIDSTERREIN; }).entries(data);    
    nested = nested.sort(function(a,b){return d3.ascending(a.key, b.key);});
    nested.forEach( function(d){ 

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "thema";
        checkbox.value = d.key;
        checkbox.id = "thema_" + d.key.replace(/[^\w]/g,'')

        var label = document.createElement('label')
        label.htmlFor = "thema_" + d.key.replace(/[^\w]/g,'');
        label.className = 'check';
        label.appendChild(document.createTextNode(d.key));

        aDiv.appendChild(checkbox);
        aDiv.appendChild(label);
        aDiv.appendChild(document.createElement('br'));

    });
    document.getElementById('ftlrThema').appendChild(document.createElement('hr'));  
        
};

//---
//creeert de tabel met subsidiegegevens, gebaseerd op de data die eerder is ingelezen
//---
function buildTables(data) {
    var cTable = $('#subsidieTable').DataTable( {
                "data": data,
                "sDom": '<l<B><t>ip>',
                "processing": true, 
                "lengthMenu": [[25, 50, -1], [25, 50, "All"]],
                "language": {"url": "static/DataTables/language.json"},
                "columns": [ {"data":"AANVRAGER", "width": "10%"},
                             {"data":"PROJECT_NAAM", "width": "10%"},	
                             {"data":"REGELINGNAAM", "width": "15%"},
                             {"data":"ORGANISATIEONDERDEEL", "width": "10%"}, 
                             {"data":"BELEIDSTERREIN", "width": "10%"}, 
                             {"data":"SUBSIDIEJAAR", "width": "5%"}, 
                             {"data":"TYPE_PERIODICITEIT", "width": "5%"},	
                             {"data":function(row, type, val, meta ){ 
                                 if(type === 'set'){ 
                                     row.BEDRAG_AANGEVRAAGD = val; 
                                     return; 
                                 } else if(type === 'display'){ 
                                     return eur( row.BEDRAG_AANGEVRAAGD ); 
                                 }
                                 return row.BEDRAG_AANGEVRAAGD;  
                             }, "width": "10%" },
                             {"data":function(row, type, val, meta ){ 
                                 if(type === 'set'){ 
                                     row.BEDRAG_VERLEEND = val; 
                                     return; 
                                 } else if(type === 'display'){ 
                                     return eur( row.BEDRAG_VERLEEND ); 
                                 }
                                 else if (type === 'filter') {
                                    return row.BEDRAG_VERLEEND;
                                  }
                                 return row.BEDRAG_VERLEEND;  
                             }, "width": "10%"},
                             {"data":function(row, type, val, meta ){ 
                                 if(type === 'set'){ 
                                     row.BEDRAG_VASTGESTELD = val; 
                                     return; 
                                 } else if(type === 'display'){ 
                                     return isNaN(row.BEDRAG_VASTGESTELD) ? '' : eur( row.BEDRAG_VASTGESTELD ); 
                                 }
                                 return row.BEDRAG_VASTGESTELD;  
                             }, "width": "10%"}

                           ],
                "columnDefs": [
                                {
                                    targets:7,
                                    data: function( row, type, val, meta) {
                                        if( type === 'set'){
                                            row.BEDRAG_AANGEVRAAGD = 'x';
                                            return;
                                        }
                                        return row.BEDRAG_AANGEVRAAGD;
                                    }
                                },
                              ],
                "buttons": [
                                'excel'
                            ],

                fixedHeader: {
                                header: false,  // staat uit... door huidige opzet vindt dit ook plaats wanneer je op de hoogd pagina zit
                                footer: false
                                }


                } );
    

                // Event listener to the two range filtering inputs to redraw on input
                $('#myInputTextField').keyup(function(){cTable.search($(this).val()).draw();})


                $('#jaar').change( function() {cTable.draw(); } );
                $('#jaar').keyup( function() {cTable.draw(); } );

                $('#bedragVanaf').keyup( function() {cTable.draw(); } );
                $('#bedragTot').keyup( function() {cTable.draw(); } );

                $('#Periodiek').click( function() {cTable.draw(); });
                $('#Eenmalig').click( function() {cTable.draw(); });

                // routine for placing event listners on the type checkboxes
                var aSet = document.getElementsByName('type')
                aSet = Array.prototype.slice.call(aSet,0); 
                aSet.forEach( function(d){
                    $('#'+d.id).click( function(){ cTable.draw() });
                });

                // routine for placing event listners on the type checkboxes
                var aSet = document.getElementsByName('thema');
                aSet = Array.prototype.slice.call(aSet,0); 
                aSet.forEach( function(d){
                    $('#'+d.id).click( function(){ cTable.draw() });
                });
    
    
            
     $('#loading').hide();
    
};


//---
// zet de listners voor de filter onderdelen
//---
$.fn.dataTable.ext.search.push( 
    function(settings, data, dataIndex){
        var returnValue = true;


        var value = $("#jaar").val();
            //console.log(data[3], value, data[3] != value);
            if( data[5] != value){ 
                returnValue = false; 
            };

        if( returnValue ){
            var minvalue = $("#bedragVanaf").val();
            var maxvalue = $("#bedragTot").val();

            var t1 = +minvalue;
            var tt = +data[8]//parseFloat((data[8] === "-") ? 0 : data[8].replace(/[^\d\-\,]/g, ""));
            var t2 = +maxvalue;
            //console.log( t1, t2, ((( minvalue != '') && (+data[8] < t1 ))), +data[8], tt )
            if(
                (( minvalue != '') && (tt < t1 )) 
              )
            {
                returnValue = false;
            }
            if (( maxvalue !='') && (tt > t2))
            {
                returnValue = false;
            }

        };

        if( returnValue ){
            var tijdFilter = $('input:checkbox[name="tijd"]:checked').map(function() {
                                return this.id;
                            }).get()

            //console.log(data[0], tFilter, tFilter.length, tFilter.indexOf(data[0]));
            if( (tijdFilter.indexOf(data[6]) === -1) &&  !(tijdFilter.length === 0) ){
                returnValue = false;
            }

        };

        if( returnValue){
            var typeFilter = $('input:checkbox[name="type"]:checked').map(function() {
                            return this.value;
                          }).get()
            //console.log(data[0], tFilter, tFilter.length, tFilter.indexOf(data[0]));
            if( ((typeFilter.indexOf(data[3]) === -1) &&  !(typeFilter.length === 0) )){
                returnValue = false;
            }
        };
        
        if( returnValue){
            var typeFilter = $('input:checkbox[name="thema"]:checked').map(function() {
                            return this.value;
                          }).get()
            //console.log(data[0], tFilter, tFilter.length, tFilter.indexOf(data[0]));
            if( ((typeFilter.indexOf(data[4]) === -1) &&  !(typeFilter.length === 0) )){
                returnValue = false;
            }
        };
        
        return returnValue;
});


d3.select(window).on("resize", resized);

function resized(){
    graph_aangevraagd_toegekend.resized();
    graph_periodiek.resized();
    graph_thema.resized();
};


readData();

