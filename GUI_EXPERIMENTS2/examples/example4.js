$(window).load(function(){
    $("#funcplus").hide();
    $("#c4").hide();
    var funcValue = $("#function_body").html();
    var funcValueReplaced = funcValue.replace(/table/g, "list");
    $("#funcplus").html(funcValueReplaced);
    $("#code4").append('<img src="compute.png" class="plus" id="c41"/>');
    $("#code4").append('<img src="compute.png" class="plus" id="c42"/>');
    $("#c41, #c42").hide();
    var c41active = false;
    var c42active = false;
    var c4active = false;
    var previoushtml = ['', '', '']
    
    $("#p4").click(function(){
        $("#funcplus").toggle();
        $("#c4").toggle();
        $("#c41, #c42").toggle();
    });
    
    $("#c4").click(function(){
        if (c4active == false){
            inTheFirstLoop = $("#funcplus > .firstLoop").html();
            inTheSecondLoop = $("#funcplus > .secondLoop").html();
            stringToReturn = 'max_element = <span style="color:purple">None</span><br><strong>for</strong> <span style="color:#1a811a">element</span> <strong>in</strong> list1:<br><div class="indent firstLoop">'+inTheFirstLoop + '</div>';
            stringToReturn += 'max_element1 = 7<br>'
            stringToReturn += '<strong>for</strong> <span style="color:#1a811a">element</span> <strong>in</strong> list2:<br><div class="indent secondLoop">'+inTheSecondLoop+'</div>';
            stringToReturn += '<strong>if</strong> 7 == 8: <div class="indent">(False)</div><strong>else</strong> (True) <div class="indent"><span style="color:darkgreen; font-weight:bold;">return</span> list2<br></div>';
            $("#funcplus").html(stringToReturn);
            c4active = true;
        }
        else{
            c4active = false;
            inTheFirstLoop = $("#funcplus > .firstLoop").html();
            inTheSecondLoop = $("#funcplus > .secondLoop").html();
            stringToReturn = 'max_element = <span style="color:purple">None</span><br><strong>for</strong> <span style="color:#1a811a">element</span> <strong>in</strong> list1:<br><div class="indent firstLoop">'+inTheFirstLoop + '</div>';
            stringToReturn += 'max_element1 = max_element<br>'
            stringToReturn += '<strong>for</strong> <span style="color:#1a811a">element</span> <strong>in</strong> list2:<br><div class="indent secondLoop">'+inTheSecondLoop+'</div>';
            stringToReturn += '<strong>if</strong> max_element1 == max_element:<div class="indent"><span style="color:darkgreen; font-weight:bold;">return</span> table1</div><strong>else</strong> <div class="indent"><span style="color:darkgreen; font-weight:bold;">return</span> list2<br></div>';
            $("#funcplus").html(stringToReturn);            
        }
    });
    
    $("#c41").click(function(){
        console.log("Click");
        if (c41active == false){
            previoushtml[0] = $("#funcplus > .firstLoop").html();
            $("#funcplus > .firstLoop").html('<span class="number" style="position:relative; left:-20px;">element = 3</span><br><strong>if</strong> 3 > None: (True)<br><div class="indent">max_element = 3</div><span class="number" style="position:relative; left:-20px;">element = 5</span><br><strong>if</strong> 5 > 3: (True)<br><div class="indent">max_element = 5</div><span class="number" style="position:relative; left:-20px;">element = 7</span><br><strong>if</strong> 7 > 5: (True)<br><div class="indent">max_element = 7</div>');
            if (c42active == false){
                $("#c41").attr('style', 'top:-393px;');
            }
            else{
                $("#c41").attr('style', 'top:-503px;');
            }
            c41active = true;
        }
        else{
            $("#funcplus > .firstLoop").html(previoushtml[0]);
            console.log
            if (c42active == false){
                $("#c41").attr('style', '');
            }
            else{
                $("#c41").attr('style', 'top:-349px;');
            }
            c41active = false;
        }
    });
    
    $("#c42").click(function(){
        if (c42active == false){
            previoushtml[1] = $("#funcplus > .secondLoop").html();
            $("#funcplus > .secondLoop").html('<span class="number" style="position:relative; left:-20px;">element = 1</span><br><strong>if</strong> 1 > 7: (False)<br><span class="number" style="position:relative; left:-20px;">element = 2</span><br><strong>if</strong> 2 > 7: (False)<br><span class="number" style="position:relative; left:-20px;">element = 8</span><br><strong>if</strong> 8 > 7: (True)<br><div class="indent">max_element = 8</div>');
            $("#c42").attr('style', 'top:-260px;');
            if (c41active == false){
                $("#c41").attr('style', 'top:-349px;');
            }
            else{
                $("#c41").attr('style', 'top:-503px;');                
            }
            c42active = true;
        }
        else{
            $("#funcplus > .secondLoop").html(previoushtml[1]);
            $("#c42").attr('style', '');
            if (c41active == false){
                $("#c41").attr('style', '');
            }
            else{
                $("#c41").attr('style', 'top:-393px;');
            }
            c42active = false;
        }
    });
    
});