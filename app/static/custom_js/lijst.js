var data = [];

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

var eur = NL.numberFormat("$,.2f");  


/*
    method gets data
    with the data the filter checkboxes are set
*/
var getData = function () {
    var ssv = d3.dsv(';');
    ssv('static/data/subsidie_out2.csv', type, function(error, data){
        if( error ) {throw error;};
        
        
        // routine to populate the filter menu with checkboxes for the type
        var nested = d3.nest().key( function(d){ return d.AFDELINGNAAM_BELEID; }).entries(data);    
        nested = nested.sort(function(a,b){return d3.ascending(a.key, b.key);});
        nested.forEach( function(d){ 

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "type";
            checkbox.value = d.key;
            checkbox.id = d.key.replace(/[^\w]/g,'')

            var label = document.createElement('label')
            label.htmlFor = d.key.replace(/[^\w]/g,'');
            label.className = 'check';
            label.appendChild(document.createTextNode(d.key));
            
            var aelement = document.getElementById('tst');
            aelement.appendChild(checkbox);
            aelement.appendChild(label);
            aelement.appendChild(document.createElement('br'));

        });
        document.getElementById('tst').appendChild(document.createElement('hr'));
        
        // sets the filter values for high and low value
        var i = document.getElementById("bedragTot"); // d3.max(data, function(d){return d.BEDRAG_VERLEEND;}) );
        i.setAttribute("value", d3.max(data, function(d){return d.OrgBedragVerleend;}));
        i = document.getElementById("bedragVanaf");
        i.setAttribute("value", 0)
        
        // give data too the routine that populates the datatable
        buildTable( data );
    });
};

/*
    method for typecasting
*/
var type = function( d ){
    d.SUBSIDIEJAAR = +d.SUBSIDIEJAAR;
    d.BEDRAG_AANGEVRAAGD = eur(+d.BEDRAG_AANGEVRAAGD);
    d.OrgBedragVerleend = +d.BEDRAG_VERLEEND;
    d.BEDRAG_VERLEEND = eur(+d.BEDRAG_VERLEEND);
    return d;   
};

/* 
    add sorting methods for currency columns
    this is in combination with the currency cast in the creation of the datatables instance
    if this is not done, than the currencys are treated as strings
*/
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function (a) {
        a = (a === "-") ? 0 : a.replace(/[^\d\-\,]/g, "");
        return parseFloat(a);
    },
    "currency-asc": function (a, b) {
        return a - b;
    },
    "currency-desc": function (a, b) {
        return b - a;
    }
});


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
            var tt = parseFloat((data[8] === "-") ? 0 : data[8].replace(/[^\d\-\,]/g, ""));
            var t2 = +maxvalue;
            //console.log( t1, t2, ((( minvalue != '') && (data[7] < t1 ))), data[7] )
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


        return returnValue;


})


var buildTable = function(data) {
        var cTable = $('#example').DataTable( {
            "data": data,
            "sDom": '<l<B><t>ip>',
            "processing": true, 
            "lengthMenu": [[25, 50, -1], [25, 50, "All"]],
            "language": {"url": "static/DataTables/language.json"},
            "columns": [ {"data":"AANVRAGER", "width": "10%"},
                         {"data":"PROJECT_NAAM", "width": "15%"},	
                         {"data":"REGELINGNAAM", "width": "15%"},
                         {"data":"AFDELINGNAAM_BELEID", "width": "10%"}, 
                         {"data":"AFDELINGNAAM_BELEID", "width": "10%"}, 
                         {"data":"SUBSIDIEJAAR", "width": "5%"}, 
                         {"data":"TYPE_PERIODICITEIT", "width": "5%"},	
                         {"data":"BEDRAG_AANGEVRAAGD", "width": "10%"},
                         {"data":"BEDRAG_VERLEEND", "width": "10%"},
                         {"data":"BEDRAG_VERLEEND", "width": "10%"}
                       ],
            "columnDefs": [
                            { type: 'currency', targets: 6 },
                            { type: 'currency', targets: 7 }
                          ],
            "buttons": [
                            'excel'
                        ]

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
            var aSet = document.getElementsByName('type');
            console.log( aSet );
            aSet.forEach( function(d){
                console.log(d.id)
                $('#'+ d.id).click( function(){ cTable.draw() });
            });

    };


 getData()  