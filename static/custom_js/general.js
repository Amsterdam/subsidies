$(document).ready(function() {
   $('#mainContainer').load('templates/feiten.html'); 
   
   $('div#navbar ul li a').click(function(){
        var page = $(this).attr('href');
        $('#mainContainer').load('templates/' + page + '.html');
    });
});