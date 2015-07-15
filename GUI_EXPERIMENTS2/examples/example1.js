$(document).ready(function(){
    
    var p1dev = false;
    var c1dev = false;
    $("#c1").hide();
    
    var code1original = $("#code1").html();
    var indent1original = $("#code1 > .indent").html();
    var code1 = code1original;
    
    // Display all the iterations of the loop
    $("#p1").click(function(){
        if (p1dev == false){
            // Display the code
            $("#code1").html('for i in range(1:10):<br>');
            for (i = 1; i <= 10; i++) { 
                computedindent = 'a['+i+'] = sqrt('+i+')<br>';
                computedindent += 'e['+i+'] = a['+i+']*3<br>';                
                text = '<div class="number">'+i+'</div>';
                text += '<div class="indent individualindent">'+computedindent+'</div><br/>';
                $("#code1").append(text);
            }
            p1dev = true;
            $("#c1").show();
        }
        else{
            $("#code1").html(code1original);
            p1dev = false;
            c1dev = false;
            $("#c1").hide();
        }
    });
        
    // Display all the results
    $("#c1").click(function(){
        if (c1dev == false){
            code1 = $("#code1").html();
            // Display the code
            $("#code1").html('for i in range(1:10):<br>');
            for (i = 1; i <= 10; i++) { 
                computedindent = 'a['+i+'] = '+Math.sqrt(i)+'<br>';
                computedindent += 'e['+i+'] = '+3*Math.sqrt(i)+'<br>';
                text = '<div class="number">'+i+'</div>';
                text += '<div class="indent individualindent">'+computedindent+'</div><br/>';
                $("#code1").append(text);
            }
            c1dev = true;
        }
        else{
            $("#code1").html(code1);
            c1dev = false;
        }
    });

});