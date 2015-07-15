$(window).load(function(){
    htmlvalue = $('#lambda6').html();
    $('#lambda6').html('|');
    var marginTop = '0'
    $('#code6').attr('style','margin-top:'+marginTop+'px;');
    var active = false;
    
    $('#lambda6').click(function(){
        if (active == false){
            active = true;
            $('#code6').attr('style','margin-top:72px;');
            $(function(){
                $("#lambda6").typed({
                    strings: [htmlvalue],
                    typeSpeed: 0,
                    showCursor: false,
                });
	       });
            $('.contentRDD').toggle();
            $('#abovecode6').fadeToggle();
            $('#belowcode6').fadeToggle();            
            $('.previousline').toggle();
        }
    });
});