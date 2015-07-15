$(document).ready(function(){
   // $(".contentEpisodeObject").hide();
    $(".listPlaceholder").append($("#p299r").html());
    $(".listPlaceholder").hide();
    $("#tree").hide();
    $("#dataT").hide();
    
    $("#p299r").hide();
    $("#p2_1").click(function(){
        $("#p299r").toggle();
    });
    
    $("#p299s").hide();
    $("#p2_2").click(function(){
        $("#p299s").toggle();
    });
    
    $("#p2").click(function(){
        $("#dataT").toggle();
        $("#code2 > .nameRDD").toggle();
        $("#code2 > .contentTree").hide();        
        $("#code2 > .contentEpisodeObject").hide();        
    });
    
    $("#p21").click(function(){
        $("#tree").toggle();
        $(".contentTree").toggle();        
        $(".contentEpisodeObject").hide();        
    });
    
    $(".p22").click(function(){
        console.log("hello");
        $(event.target).parent().next(".contentEpisodeObject").toggle();      
    });
    
    $("#p299").click(function(){
        $(".listPlaceholder").toggle();
    });
});