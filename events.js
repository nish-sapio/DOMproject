
function addNode(){
	var nodeItem = document.createElement("li");
	nodeItem.setAttribute("id", document.getElementById("nodeName").value + "Item")
	var name = document.createTextNode(document.getElementById("nodeName").value);
	var x = document.createElement("div");
	x.appendChild(name);
	x.setAttribute("id",document.getElementById("nodeName").value);
	x.setAttribute("class","node");
	nodeItem.appendChild(x);
	var nodeCollection = document.getElementById("nodeCollection");
	nodeCollection.appendChild(nodeItem);
}

// function createSVGblock(){
// 	var svgline = document.createElement("svg");
// 	var container = document.getElementById("container");
// 	svgline.setAttribute("width", "100%");
// 	svgline.setAttribute("height", "100%");
// 	svgline.setAttribute("style", "z-index : -1;");
// 	svgline.setAttribute("xmlns:svg", "http://www.w3.org/2000/svg");
// 	svgline.setAttribute("xmlns", "http://www.w3.org/2000/svg");
// 	svgline.setAttribute("id", "block");
// 	container.appendChild(svgline);
// }


function relateNode(){
	var src = document.getElementById("node1").value;
	var tgt = document.getElementById("nodeList").value
	// var node1 = document.getElementById(document.getElementById("node1").value);
	// var node2 = document.getElementById(document.getElementById("nodeList").value);
	// var connector = document.createElement("path");
	// var coordinates = "M"+ node1.offsetLeft + "," + node1.offsetTop + " L" + node2.offsetLeft + ","+ node2.offsetTop;
	// connector.setAttribute("d",coordinates);
	// connector.setAttribute("id", node1.innerHTML + "-" + node2.innerHTML);
	// connector.setAttribute("style", "stroke: red; stroke-width: 3");
	// svgline.appendChild(connector);
	// var pathTag = "<path id ="+"'" +node1.innerHTML + "-" + node2.innerHTML + "'" +"d = "+ coordinates +"stroke='red' stroke-width='2'/>"
	// $("#block").append('<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>');
	// $("#container").html($("#container").html());

	jsPlumb.ready(function() {
            var common = {
                connector: ["Straight"],
                anchor: ["Left", "Right"],
                endpoint:"Dot"
            };

            jsPlumb.connect({
                source:src,
                target:tgt,
                paintStyle:{ stroke:"blue", strokeWidth:3 },
                endpointStyle:{ fillStyle:"white", outlineStroke:"gray" },
                overlays:[ 
                    ["Arrow" , { width:12, length:12, location:0.67 }]
                ]
            }, common);

            jsPlumb.draggable(src);
            jsPlumb.draggable(tgt);
        });
}

function updateNodeList(){
	var nodeItem = document.createElement("option");
	var name = document.createTextNode(document.getElementById("nodeName").value);
	nodeItem.setAttribute("value",document.getElementById("nodeName").value);
	nodeItem.appendChild(name);
	var nodeList = document.getElementById("nodeList");
	nodeList.append(nodeItem);

}

function deleteNode(){
	// alert("hello"); 
	// var parent = document.getElementById("nodeCollection");
	var child = document.getElementById(document.getElementById("deleteNodeName").value);
	child.parentNode.removeChild(child);
}

function node1(elmnt){
	document.getElementById("node1").value = elmnt.innerHTML;
}

function addFunction(elmnt){
	elmnt.addEventListener("mousedown",function(){
		dragNode(elmnt);
	});
	elmnt.addEventListener("click",function(){
		node1(elmnt);
	})
}



var node;
var x0 =0 , y0 = 0, x1=0, y1=0;

function dragNode(set){
	node = set;
	set.onmousedown = dragDown;
}

function dragDown(e){
	e = e || window.event;
	e.preventDefault();
	x0 = e.clientX;
	y0 = e.clientY;
	document.onmouseup = closeDrag;
	document.onmousemove = nodeDrag;
}

function nodeDrag(e){
	x1 = x0 - e.clientX;
	y1 = y0 - e.clientY;
	x0 = e.clientX;
	y0 = e.clientY;
	node.style.top = ( y0) + "px";
	node.style.left = ( x0) + "px";
}

function closeDrag(e){
	document.onmouseup = null;
	document.onmousemove = null;
}