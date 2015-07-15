document.getElementById("abc") => Element
document.getElementsByTagName("a") => Array of Elements
nodeType: (element [1], attribute[2] or text[3]?)

myElement.getAttribute("align");
myElement.setAttribute("align", "left");
myElement.innerHTML = "whatyouwant";

newElement = document.createElement("li");
document.appendChild(newElement);

text = document.createTextNode("the text");
newElement.appendChild(text);

# Events
myelement.onclick = function( ){
};

window.onload = function( ){
}; [ONCE PER PAGE]

onfocus // form when the input is selection
nobler // when the input is not selection anymore

setTimeout(function you want to trigger, number of milliseconds later);
setInterval(function you want to trigger, number of milliseconds between each trigger of the function); => returns a variable XYZ
clearInterval(XYZ); => stops the interval

# CSS
myElement.style.color = "red";