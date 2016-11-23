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
    console.log('reading data')
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
    
    var mainDiv = document.getElementById('page-main-content');
    
    var data_update = document.createElement('div');
        data_update.id = 'bijgewerkttot';
        data_update.className =  'col-xs-12';
        data_update.innerHTML =  "<p align='right'>Bijgewerkt tot:<span id='dataupdate'></span></p>"
        mainDiv.appendChild(data_update);
    
    // row 1
    var feitenRow = document.createElement('div');
        feitenRow.id = 'feiten';
        feitenRow.className = 'row content-block';
        mainDiv.appendChild(feitenRow);
    
    var txtDiv = document.createElement('div');
        txtDiv.id = 'info_txt';
        txtDiv.className = 'col-xs-12 col-md-4';
        txtDiv.innerHTML = '<p>Met het openbaar subsidieregister verbetert Amsterdam de transparantie over de subsidies die de <a href="https://www.amsterdam.nl/subsidies/">gemeente</a> verstrekt. Het register bevat alle door de gemeente Amsterdam behandelde subsidieaanvragen vanaf 2016 die zijn verwerkt in het gemeentelijke subsidiebeheersysteem en wordt wekelijks bijgewerkt. Voor een juist gebruik van het register zijn de volgende uitgangspunten van belang: <ul class="ul-main"><li>Nog niet alle subsidies worden verstrekt via het gemeentelijke subsidiebeheersysteem; de navolgende subsidies zitten dan ook niet in het openbaar subsidieregister:</li> <ul class="ul-inner"> <li>Subsidies op basis van het Kunstenplan;</li><li>Huisvestingsvoorzieningen Amsterdam Onderwijs 2016;</li><li>Subsidies voor drinkwaterinstallaties;</li><li>Erfpachtsubsidies;</li><li>Subsidies voor gevelsanering tegen verkeerslawaai;</li><li>Subsidies voor lang parkeren;</li><li>Loonkostensubsidies.</li></ul><li>Op advies van de Commissie Privacy Amsterdam zijn de namen van particuliere subsidieontvangers weggehaald.</li><li>Op advies van de directie Openbare Orde en Veiligheid worden de namen van  organisaties waarvan de veiligheid van deze organisaties en/of hun werknemers en/of bezoekers in gevaar zouden kunnen komen, niet vermeld in het subsidieregister. Vooralsnog geldt deze maatregel alleen voor de subsidieregeling bijdrage beveiliging bedreigde religieuze en maatschappelijke instellingen.</li><li>De in het register getoonde kolom Project bevat een door de aanvrager ingevoerde projectomschrijving.</li><li>Het overnemen en gebruiken van gegevens is met de volgende bronvermelding toegestaan: Gemeente Amsterdam/Openbaar subsidieregister.</li><li>De inhoud van dit openbaar subsidieregister is met uiterste zorgvuldigheid tot stand gebracht. De inhoud wordt regelmatig gecontroleerd en geactualiseerd. De gemeente Amsterdam kan echter niet aansprakelijk worden gesteld voor de juistheid, volledigheid en actualiteit van het openbaar subsidieregister. De gemeente Amsterdam kan in het bijzonder niet aansprakelijk worden gesteld voor eventuele schade of consequenties ontstaan door direct of indirect gebruik van de inhoud van het openbaar subsidieregister.</li></ul></p>'
        
        feitenRow.appendChild(txtDiv);
    
    
    var feitenContainer = document.createElement('div');
        feitenContainer.id = 'feiten_info';
        feitenContainer.className =  'col-xs-12 col-md-8';
        feitenRow.appendChild(feitenContainer);
    
    
    var feitenSelectie = document.createElement('div');
        feitenSelectie.id = 'feiten_selectie';
        feitenSelectie.className =  'col-xs-12 col-md-12';
        feitenSelectie.innerHTML =  "<p align='right'>Toon statistieken voor:  <select id='fltrJaar'></select></p>"
        feitenContainer.appendChild(feitenSelectie);

    // ------------------
    // start structure for the first graph
    // -------------------
    var aangevraagd = document.createElement('div');
        aangevraagd.id = 'main_aangevraagd_toegekend';
        aangevraagd.className =  'col-xs-12 col-md-6 main_graph';
        feitenContainer.appendChild(aangevraagd);                                    

    var aangevraagdHeader = document.createElement('div')
        aangevraagdHeader.id = 'aangevraagd_head';
        aangevraagdHeader.className = 'graph-head';
        aangevraagdHeader.innerHTML = `<h3>Aangevraagd, verleend en vastgesteld<h3>`
        aangevraagd.appendChild(aangevraagdHeader);
    
    var aangevraagdGraph = document.createElement('div');
        aangevraagdGraph.id = 'aangevraagd_toegekend'
//        g1Div.className =  'col-xs-12 col-md-6';
        aangevraagd.appendChild(aangevraagdGraph);
    
    var aangevraagdText = document.createElement('div');
        aangevraagdText.id = 'aangevraagd_text'
        aangevraagdText.className =  'graph_text';
        aangevraagdText.innerHTML = `<p>Verhouding aangevraagd, verleend en vastgesteld</p>
                                        <p><ul align="left">
                                                <li>Aangevraagd: het bij de gemeente aangevraagde subsidiebedrag</li>
                                                <li>Verleend: het door de gemeente daadwerkelijk verleende subsidiebedrag</li>
                                                <li>Vastgesteld: de hoogte van het definitieve subsidiebedrag na verantwoording over de uitvoering van de gesubsidieerde activiteiten</li>
                                        </ul></p>`
        aangevraagd.appendChild(aangevraagdText);
 
    var aangevraagdTable = document.createElement('div');
        aangevraagdTable.id = 'aangevraagd_table'
        aangevraagdTable.className =  'graph-table';
        aangevraagdTable.innerHTML = `                    <table>
                        <tbody>
                        <tr>
                            <td>Aangevraagd:</td>
                            <td id='aangevraagd_cell'></td>
                        </tr>
                        <tr>
                            <td>Verleend:</td>
                            <td id='verleend_cell'></td>
                        </tr>
                        <tr>
                            <td>Vastgesteld</td>
                            <td id='vastgesteld_cell'></td>
                        </tr>
                        </tbody>
                    </table>`
        aangevraagd.appendChild(aangevraagdTable);
   
    // ------------------
    // eind structure for the first graph
    // -------------------

    // ------------------
    // start structure for the second graph
    // ------------------- 
    
    
    var soort = document.createElement('div');
        soort.id = 'main_soort';
        soort.className =  'col-xs-12 col-md-6 main_graph';
        feitenContainer.appendChild(soort);                                    

    var soortHeader = document.createElement('div')
        soortHeader.id = 'soort_head';
        soortHeader.className = 'graph-head';
        soortHeader.innerHTML = `<h3>Soort<h3>`
        soort.appendChild(soortHeader);
        
    var soortGraph = document.createElement('div');
        soortGraph.id = 'periodiek'
//        g1Div.className =  'col-xs-12 col-md-6';
        soort.appendChild(soortGraph);
    
    var soortText = document.createElement('div');
        soortText.id = 'soort_text'
        soortText.className =  'graph_text';
        soortText.innerHTML = `<p>Verleend subsidiebedrag weergegeven in "Periodiek" & "Eenmalig" </p>
                    <p>
                        <ul align="left">
                            <li>Eenmalige subsidie: subsidie ten behoeve van de activiteiten van de aanvrager die van bepaalde duur zijn en maximaal vier jaar bedragen</li>
                            <li>Periodieke subsidie: een subsidie voor activiteiten van in beginsel onbepaalde duur, die per boekjaar of voor een aantal boekjaren aan een aanvrager worden verstrekt met een maximum van vier jaar</li>
                        </ul>
                    </p>`
        soort.appendChild(soortText);
 
    var soortTable = document.createElement('div');
        soortTable.id = 'soort_table'
        soortTable.className =  'graph-table';
        soortTable.innerHTML = `<table>
                            <tbody>
                            <tr>
                                <td>Periodiek:</td>
                                <td id='periodiek_cell'></td>
                            </tr>
                            <tr>
                                <td>Eenmalig:</td>
                                <td id='eenmalig_cell'></td>
                            </tr>
                            </tbody>
                        </table>`
        soort.appendChild(soortTable);
    
    // ------------------
    // eind structure for the second graph
    // ------------------- 
    
    
    // ------------------
    // start structure for the third graph
    // ------------------- 
    
    
    var thema = document.createElement('div');
        thema.id = 'main_thema';
        thema.className =  'col-xs-12 col-md-12 main_graph';
        feitenContainer.appendChild(thema);                                    

    var themaHeader = document.createElement('div')
        themaHeader.id = 'thema_head';
        themaHeader.className = 'graph-head';
        themaHeader.innerHTML = `<h3>Verleend bedrag per thema<h3>`
        thema.appendChild(themaHeader);
        
    var themaGraph = document.createElement('div');
        themaGraph.id = 'thema'
//        g1Div.className =  'col-xs-12 col-md-6';
        thema.appendChild(themaGraph);
    
    var themaText = document.createElement('div');
        themaText.id = 'thema_text'
        themaText.className =  'graph_text';
        themaText.innerHTML = `<p>Verdeling van het totaal verleend bedrag per thema.</p><p>Door de balk behorende bij een categorie te selecteren wordt de balk ingekort, waardoor de verhoudingen tussen de overige categorieën beter zichtbaar wordt. Door nogmaals op de balk te klikken krijgt de categorie zijn oorspronkelijke schaal.</p>`
        thema.appendChild(themaText);
 
    var themaTable = document.createElement('div');
        themaTable.id = 'thema_table'
        themaTable.className =  'graph-table';
        thema.appendChild(themaTable);
    
    // ------------------
    // eind structure for the third graph
    // ------------------- 
    
    
    // row 2
    var lijstenRow = document.createElement('div');
        lijstenRow.id = 'lijsten';
        lijstenRow.className = 'row';
        lijstenRow.style.display = 'none';
        mainDiv.appendChild(lijstenRow);

    var filterDiv = document.createElement('div');
        filterDiv.id = 'lijstFilter';
        filterDiv.className = 'col-xs-4 col-md-2'
        lijstenRow.appendChild(filterDiv);
    
    var tableDiv = document.createElement('div');
        tableDiv.id = 'dataTable';
        tableDiv.className = 'col-xs-8 col-md-10'
        tableDiv.innerHTML = `
                        <table id="subsidieTable">
                                <thead>
                                    <tr>
                                        <th>Naam</th>
                                        <th>Project</th>
                                        <th>Regeling</th>
                                        <th>Organisatie</th>
                                        <th>Thema</th>
                                        <th>Jaar</th>
                                        <th>Periodiciteit</th>
                                        <th>Aangevraagd</th>
                                        <th>Verleend</th>
                                        <th>Vastgesteld</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Naam</th>
                                        <th>Project</th>
                                        <th>Regeling</th>
                                        <th>Organisatie</th>
                                        <th>Thema</th>
                                        <th>Jaar</th>
                                        <th>Periodiciteit</th>
                                        <th>Aangevraagd</th>
                                        <th>Verleend</th>
                                        <th>Vastgesteld</th>
                                    </tr>
                                </tfoot>
                            </table>  `
       
        lijstenRow.appendChild(tableDiv);
    
    buildGraphs();
    buildFilters();
    buildTables(data);
    
    
    
};

function buildGraphs(){
    
    var select_i = d3.select('#fltrJaar').on('change',dataPrep);
    var high = d3.min(jaren, function(d){ return d.key });

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
    
    graph_aangevraagd_toegekend = new BarChart({placeholder:"aangevraagd_toegekend"});
    graph_periodiek = new BarChart({placeholder:"periodiek"});
    graph_thema = new HorBarChart({placeholder:"thema"});
    
    dataPrep();
};

//----
//opbouw van de verschillende filter elementen die controle invloed uitoefenen op de 
//table met subsidiegegevens 
//----
function buildFilters(){
    var divHolder = document.getElementById('lijstFilter');
    
    var zoek = document.createElement('div')
    zoek.innerHTML= "<label>Zoeken</label><input type='text' id='myInputTextField'><hr>"
    divHolder.appendChild( zoek ) 
    
    
    var jaarFilter = document.createElement('div')
    jaarFilter.innerHTML= "<label>Jaar</label><select id='jaar'></select><hr></div>"
    divHolder.appendChild( jaarFilter ) 
    
    var high = "2017"
    d3.select("#jaar")
                .selectAll("option")
                .data(jaren).enter()
                .append('option')
                .property("selected", function(d){ return d.key === high; })
                .text(function(d){ return d.key;});
    
    var bedragFilter = document.createElement('div')
    bedragFilter.innerHTML= `<label>Verleend bedrag</label>
        min.<br><input type="number" id="bedragVanaf"><br>
        max.<br><input type="number" id="bedragTot"><br>
        <hr>`
    divHolder.appendChild( bedragFilter ) 
    

    var soortFilter = document.createElement('div')
    soortFilter.innerHTML= `<label>Soort</label>
                            <label class='check'><input name='tijd' type="checkbox" id ='Periodiek'>Periodiek</label>
                            <br>
                            <label class='check'><input name='tijd' type="checkbox" id ='Eenmalig'>Eenmalig</label>
                            <hr>`
    divHolder.appendChild( soortFilter ) 
    
    
    // routine to populate the filter menu with checkboxes for the type
    var aDiv = document.createElement('div');
    aDiv.id = 'ftlrType'
    aDiv.innerHTML = '<label>Organisatie</label>'
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
    aDiv.innerHTML = '<label>Organisatie</label>'
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


readData();

