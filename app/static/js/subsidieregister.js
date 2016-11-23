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
    var feiten = document.getElementById('feiten_content');
    var lijsten = document.getElementById('lijsten_content');
    
    if( toShow === 'feiten') {
        feiten.style.display = '';
        lijsten.style.display = 'none';
    } else {
        feiten.style.display = 'none';
        lijsten.style.display = '';
    }
}