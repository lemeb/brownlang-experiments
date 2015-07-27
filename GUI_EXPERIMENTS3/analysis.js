// Technical stuff
editor.$blockScrolling = Infinity;

////////////////////////
//                    //
//  GLOBAL VARIABLES  //
//                    //
////////////////////////

// To store the changes in the editor, 
// and trigger the evaluations only when necessary
var submissionID = 0;
var submissionDict = {};

// To know if there is an evaluation in process
var evalInProcess = false;

// Every time the editor is changed
editor.on("change", function(){
    queue_add();
    adjustEditor();
});


///////////////
//           //
//  MANAGER  //
//           //
///////////////

// Triggered when there is change in the editor
// Triggers the evaluation process when necessary.
function queue_add(){
    // Create a unique identifier,
    // add it to the dictionary of submissions
    var uniqueID = submissionID;
    submissionID += 1;
    submissionDict[uniqueID] = Date.now();
    stop_eval(); // Stops the current evaluation
    
    // Wait 200 milliseconds to know if that is the good one
    setTimeout(function(){
        if (Object.keys(submissionDict).length == 1){
        	triggerEvaluation();
            delete submissionDict[uniqueID];
        }
        else {
            delete submissionDict[uniqueID];
        }
    },200);
}

// If we need to evaluate the code
function triggerEvaluation(){
    evalInProcess = true;
    go_eval(editor.getValue());
}

// Manages the evaluation
/*
	1. Get the lines in the editor
	2. Get the values associated to the variables
	3. Display the values
	If evalInProcess is changed (e.g., because the user is typing),
	the evaluation process is interrupted.
*/
function go_eval(inputtedCode){
	// console.log("Eval with" + inputtedCode);
    style_evaluating();
    if (evalInProcess) var typedLines = getTheLines(inputtedCode);
    if (evalInProcess) var valuesToDisplay = getValues(typedLines);
    if (valuesToDisplay == null) evalInProcess = false;
    // console.log(valuesToDisplay);
    if (evalInProcess) displayValues(valuesToDisplay);
    if (evalInProcess) finish_eval();
}


/////////////////////
//                 //
//  GET THE LINES  //
//                 //
/////////////////////


function getTheLines(inputtedCode){
    // Split the lines
	var preliminaryLines = inputtedCode.split('\n');
	return verifyTheLines(preliminaryLines);
}

// Verifies that there is no more than one instruction per line
function verifyTheLines(lines){
	var evOK = true;
	var originalLine = 0;
	// Regex to detect whether there is more than one instruction
    var rx = /(?!\s|;|$)[^;"]*("(\\.|[^\\"])*"[^;"]*)*/g;
    // Regex to detect the indentation before the instruction
    var indentrx = /(^[\s]+)/;
    // For every line
	for (var i = 0; i <= lines.length - 1; i++) {
		var line = lines[i];
		var spaces = line.match(indentrx);
		if (spaces == null) spaces = [''];
		var res = line.match(rx);
		if (!multiInstructionFalsePositive(res)){
			if (res[1].charAt(0) != '/'){
				evOK = false;
				lines = (lines.slice(0,i)
						  .concat([spaces[0] + res[0]+';'])
						  .concat([spaces[0] + res[1]+';'])
                          .concat(lines.slice(i+1,lines.length)));
				i++;
			}
		}
		originalLine += 1;		
	}
	// If we need to readjust the code displayed in the editor
	// console.log(lines);
	if (evOK == false) readjustWrittenCode(lines);
	return lines;
}

function multiInstructionFalsePositive(result){
	// console.log("Checking "+ String(result));
    if (result == null) return true;
    if (result.length == 1) return true;
    if (result[0].substr(0,3) == "for") return true;
    if (result[0].substr(0,2) == "//") return true;
    return false;
}

// Makes sure there is one instruction per line in the editor
function readjustWrittenCode(lines){
	var pos = editor.getCursorPosition();
	editor.selectAll();
	editor.removeLines();
	for (var i = 0; i < lines.length; i++) {
		if (i != lines.length-1) editor.insert(lines[i]+'\n');
		else editor.insert(lines[i]);
	};
	editor.moveCursorToPosition(pos);
	style_cleaning();
}

//////////////////////////
//                      //
//  COMPUTE THE VALUES  //
//                      //
//////////////////////////

function getValues(lines){
	var criticalLines = computeCriticalLines(lines);
	console.log(criticalLines);
	var newCode = createNewCode(lines,criticalLines);
	console.log(newCode);
	return getVariablesByEvalCode(newCode);
}

function computeCriticalLines(lines){
	return addDictionary(
		[computeCriticalVariables(lines),
		 computeCriticalBranches(lines),
		 computeCriticalLoops(lines)]);
}

function addDictionary(arrayofDict){
	var arraytoReturn = arrayofDict[0];
	for (var i = 1; i < arrayofDict.length; i++) {
		for (var key in arrayofDict[i]){
			arraytoReturn[key] = arrayofDict[i][key];
		}
	};
	return arraytoReturn;
}

// Detect branches
function computeCriticalLoops(lines){
	var cLoop = {};
	var rx = /^[\s}]*(for|while)/;
	for (var i = 0; i < lines.length; i++) {
		var res = lines[i].match(rx);
		if (valueChange(res, lines[i])) {
			// console.log("NP with "+lines[i]);
			cLoop[i] = ["loop",res[1]];
		}
	};
	return cLoop;
}

// Detect branches
function computeCriticalBranches(lines){
	var cBranch = {};
	var rx = /^[\s}]*(if|else|else if)/;
	for (var i = 0; i < lines.length; i++) {
		var res = lines[i].match(rx);
		if (valueChange(res, lines[i])) {
			// console.log("NP with "+lines[i]);
			cBranch[i] = ["branch",res[1]];
		}
	};
	return cBranch;
}

// Detect where variables change values
function computeCriticalVariables(lines){
	var cVar = {};
	// Regex
	var rx = /\s*(\S*)\s*(\+=|-=|\+\+|=[^=])/;
	for (var i = 0; i < lines.length; i++) {
		var res = lines[i].match(rx);
		if (valueChange(res, lines[i])) {
			// console.log("NP with "+lines[i]);
			cVar[i] = ["var",res[1]];
		}
	};
	return cVar;
}

function valueChange(result, line){
	// console.log(result + " - " + line)
	if (result == null) return false; 
	if (result[1].charAt(0) == '=') return false;
	if (line.substring(0,3) == "for") return false;
	return true;
}

// Adds lines of code to store the values
function createNewCode(lines, varDict){
	var code = "";
	for (var i = 0; i < lines.length; i++) {
		if (varDict[i] == null) {
			code += lines[i] + "\n";
		}
		else {
			if (varDict[i][0] == "var") code += addComputeVar(lines[i], varDict[i][1],i);
			if (varDict[i][0] == "branch") code += addComputeBranch(lines[i], varDict[i][1], i);
			if (varDict[i][0] == "loop") code += addComputeLoop(lines[i], varDict[i][1], i);
		}
	};
	return code;
}

function addComputeBranch(line, varName, i){
	return ('XXXXXXXXXX['+i+'] = '+
			'["'+varName+'"'+
			',"Branch not taken"'+
			', "branch"]\n'+
			line + "\n" +
			'XXXXXXXXXX['+i+'] = '+
			'["'+varName+'"'+
			',"Branch taken"'+
			', "branch"]\n');
}

function addComputeLoop(line, varName, i){
	return (line + "\n" +
			'if (XXXXXXXXXX['+i+'] == null) var temp = 0;\n'+
			'else var temp = XXXXXXXXXX['+i+'][1]+1;\n'+
			'XXXXXXXXXX['+i+'] = '+
			'["'+varName+'"'+
			',(temp)'+
			', "loop"]\n');
}

function addComputeVar(line, varName,i){
	return (line + "\n" +
			'XXXXXXXXXX['+i+'] = '+
			'["'+varName+'"'+
			',String('+varName+')'+
			', typeof '+varName+']\n');
	/* code += 
	'console.log("'+varName+': " 
	+ toString('+varName+'))';
	 code += 'console.log("Hi");\n'; */
}

// Evaluates the code
function getVariablesByEvalCode(code){
	var XXXXXXXXXX = {};
	// console.log(code);
	// console.log(code);
	try {
		eval(code);
	}
	catch(err) {
		style_error();
        console.log(err.message);
		return null;
	}
	return XXXXXXXXXX;
}

//////////////////////////
//                      //
//  DISPLAY THE VALUES  //
//                      //
//////////////////////////


function displayValues(val){
	// Remove previous buttons and inspectors
	$(".inspector, .inspector_img, .inspector_br, .inspector_lp").remove(); 

	// Display the inspector for each value to display
	for(var key in val){
		// console.log($(".ace_gutter-cell:eq(32)").html());
		// Get the position
		var xpos = $(".ace_gutter-cell:eq("+key+")").position().top;

		if (val[key][2] == "branch") displayBranch(val[key], key, xpos);
		else if (val[key][2] == "loop") displayLoop(val[key], key, xpos);
		else displayVariableValues(val[key], key, xpos);
		
    }
}

function displayBranch(record, id, xpos){
    $("#inspector_display").append(''+
    	'<div class="inspector_br"'+ 
    	'id = "inspector_br'+id+'"'+
    	'style="position:absolute;top:'+xpos+'px;">'+
    	'('+record[1]+')'+
		'</div>');
}

function displayVariableValues(record, id, xpos){
	// The button
    $("#inspector_display").append(''+
    	'<img class="inspector_img"'+ 
    	'id = "inspector_img'+id+'"'+
    	'src="compute.png"'+
    	'style="position:absolute;top:'+xpos+'px;"/>');

    // The inspector
    $("#inspector_display").append(''+
    	'<div class="inspector" id="inspector'+id+'"'+
    	'style="display:none;'+
    	'position:absolute;top:'+(xpos+20)+'px;">'+
    	'<div class="var_name">Value of '+
        record[0]+'</div>'+
    	formatValue(record)+'</div>');
}

function displayLoop(record, id, xpos){
    $("#inspector_display").append(''+
	'<div class="inspector_lp"'+ 
	'id = "inspector_lp'+id+'"'+
	'style="position:absolute;top:'+xpos+'px;">'+
	'(Loop taken '+record[1]+' times)'+
	'</div>');
}

$(window).load(function(){
	var inspector_active = -1;
	$(document).on('click', ".inspector_img", function(){
		var html_id = $(this).attr("id");
		var num_id = html_id.substr(html_id.indexOf("g")+1);
		inspector_active = collapseUnfold(num_id, inspector_active);
	});
})

function collapseUnfold(id, active){
	// Back to everything collapsed
	if (active == id){
		active = -1;
		$("#inspector"+id).hide();
	}
	// Unfold something 
	else{
		active = id;
		$(".inspector").hide();
		$("#inspector"+id).show();
	}
	return active;
}

// Hides the inspector
function blur_inspector(){
	$(".inspector_img").hide();
}


function formatValue(valArray){
	// console.log(valArray);
	if (valArray[1] == "null" && valArray[2] == "object"){
		valArray[2] = "null";
	}
	var b = '<div class="value';
	var e = '</div>'
	switch (valArray[2]){
		case "string":
			return formatString(b,valArray[1],e);
		case "number":
			return formatNumber(b,valArray[1],e);
		case "boolean":
			return formatBool(b,valArray[1],e);
		case "null":
			return formatNull(b,e);
		default:
			return String(valArray[1])
	}
	return String(valArray[1]);
}

function adjustEditor(){
	console.log(editor.session.getLength());
	if (editor.session.getLength() < 10){
		$("#inspector_display").attr('style', 'left:618px;     width:calc(100% - 618px);');
	}
}

/////////////////////////
//                     //
//  FORMAT THE VALUES  //
//                     //
/////////////////////////

function formatString(b,string,e){
	return (b
			+' v_string">'
			+'<div class="apo">\'</div>'
			+(string
              .split("\n")
              .join('<span class="retu">↵</span>'+
                    '<br />'))
			+'<div class="apo">\'</div>'
			+e);
}

function formatNumber(b,numb,e){
	return (b
			+' v_numb">'
			+numb
			+e);
}

function formatNull(b,e){
	return (b
			+' v_null">'
            +'<img src="null.png"/>'
			+"null"
			+e);
}

function formatBool(b,str,e){
    if (str == "false"){
        return (b
			+' v_bool b_false">'
            +'<img src="notok.png"/>'
			+"False"
			+e);
    }
    else if (str == "true"){
        return (b
			+' v_bool b_true">'
            +'<img src="oksmall.png"/>'
			+"True"
			+e);
    }
    return formatNull(b,e);
}


/////////////
//         //
//  EVAL2  //
//         //
/////////////

// Stops the current evaluation when the user is typing
function stop_eval(){
    evalInProcess = false;
    style_typing();
    blur_inspector();
}

// When eveything has been properly done
function finish_eval(){
    evalInProcess = false;
    style_ready();
}

/////////////
//         //
//  STYLE  //
//         //
/////////////

function style_evaluating(){
    $("#statusBar").removeAttr("class");
    $("#statusBar").attr("class", "evaluating");
    $("#statusBar").html("Evaluating...");
}

function style_error(){
    $("#statusBar").removeAttr("class");
    $("#statusBar").attr("class", "error");
    $("#statusBar").html("There is an error in your code");
}

function style_ready(){
    $("#statusBar").removeAttr("class");
    $("#statusBar").attr("class", "ready");
    $("#statusBar").html("Ready");
}

function style_typing(){
    $("#statusBar").removeAttr("class");
    $("#statusBar").attr("class", "typing");
    $("#statusBar").html("Typing...");
}

function style_cleaning(){
    $("#statusBar").removeAttr("class");
    $("#statusBar").attr("class", "cleaning");
    $("#statusBar").html("We cleaned your code");
}