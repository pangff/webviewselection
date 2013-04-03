// Namespace
var android = {};
android.selection = {};

android.selection.selectionStartRange = null;
android.selection.selectionEndRange = null;

/** The last point touched by the user. { 'x': xPoint, 'y': yPoint } */
android.selection.startTouchPoint = null;

/**
 * Starts the touch and saves the given x and y coordinates as last touch point
 */
android.selection.startTouch = function(x, y) {

	android.selection.startTouchPoint = {
		'x' : x,
		'y' : y
	};

};

/**
 * Checks to see if there is a selection.
 * 
 * @return boolean
 */
android.selection.hasSelection = function() {
	return window.getSelection().toString().length > 0;
};

/**
 * Clears the current selection.
 */
android.selection.clearSelection = function() {

	try {
		// if current selection clear it.
		var sel = window.getSelection();
		sel.removeAllRanges();
	} catch (err) {
		window.TextSelection.jsError(err);
	}
};

/**
 * Handles the long touch action by selecting the last touched element.
 */
android.selection.longTouch = function() {
	console.log('=======selection start========='+android.selection.startTouchPoint.x);
	try {
		android.selection.clearSelection();
		
		
		var sel = window.getSelection();
		var oneWordCaret = document.caretRangeFromPoint(android.selection.startTouchPoint.x,android.selection.startTouchPoint.y);
		oneWordCaret.expand("word");

		android.selection.selectionStartRange = oneWordCaret;

		var selectionStart = $("<span id=\"selectionStart\"></span>");
		oneWordCaret.insertNode(selectionStart[0]);
		
		sel.addRange(oneWordCaret);

	} catch (err) {
		window.TextSelection.jsError(err);
	}

};


android.selection.endTouch = function(){
	var sel = window.getSelection();
	sel.removeAllRanges();
	
	var newNode = document.createElement("span");
	
	var sNode = document.getElementById("selectionStart");
	var endNode = document.getElementById("selectionEnd");
	

	var range = document.createRange();
	range.setStartAfter(sNode);
	range.setEndBefore(endNode);
	
	
	if (sNode) {
		sNode.parentNode.removeChild(sNode);
	}
	
	if (endNode) {
		endNode.parentNode.removeChild(endNode);
	}
	
	range.surroundContents(newNode);
}

/**
 * Starts the touch and saves the given x and y coordinates as last touch point
 */
android.selection.moveTouch = function(x, y) {
	var endNode = document.getElementById("selectionEnd");
	if (endNode) {
		endNode.parentNode.removeChild(endNode);
	}

	android.selection.selectionEndRange = document.caretRangeFromPoint(x, y);

	var selectionEnd = $("<span id=\"selectionEnd\"></span>");
	android.selection.selectionEndRange.insertNode(selectionEnd[0]);


	var sNode = document.getElementById("selectionStart");
	endNode = document.getElementById("selectionEnd");
	
	var sel = window.getSelection();
	var range = sel.getRangeAt(0)
	range.setStartAfter(sNode);
	range.setEndBefore(endNode);
	
	sel.removeAllRanges();
	sel.addRange(range);
	
//	
//	if(sel.rangeCount == 0){
//		var range = document.createRange();
//		range.setStartAfter(sNode);
//		range.setEndBefore(endNode);
//		
//		sel.removeAllRanges();
//		sel.addRange(range);
//	}else if(sel.rangeCount == 1){
//		sel.removeRange(sel.getRangeAt(sel.rangeCount-1))
//		var rangelast = document.createRange();
//		var range = document.createRange();
//		range.setStart(rangelast.endContainer,rangelast.endOffset);
//		range.setEndBefore(endNode);
//		sel.addRange(range);
//	}else{
//		sel.removeRange(sel.getRangeAt(sel.rangeCount-1))
//		var rangelast = sel.getRangeAt(sel.rangeCount-1);
//		var range = document.createRange();
//		range.setStart(rangelast.endContainer,rangelast.endOffset);
//		range.setEndBefore(endNode);
//		sel.addRange(range);
//	}
	
//	
//	var range = document.createRange();
//	range.setStartAfter(sNode);
//	range.setEndBefore(endNode);
	

//	
	
//	documentFragment = range.extractContents();
//	
//	console.log('=======documentFragment========'+documentFragment);
//	
//	var innerSpan = document.createElement("span");
//	innerSpan.appendChild(documentFragment);
//	documentFragment=null;
//	//android.selection.insertAfter(innerSpan, sNode);
//	endNode.parentNode.insertBefore(innerSpan, endNode);

};

//android.selection.insertAfter = function(newElement, targetElement) {
//	var parent = targetElement.parentNode; // 把目标元素的parentNode属性值提到到变量parent里
//	if (parent.lastChild == targetElement) { // 检查目标元素是不是parent的最后一个元素，如果是，则直接追加到目标元素后面
//		parent.appendChild(newElement);
//	} else {
//		parent.insertBefore(newElement, targetElement, targetElement.nextSibling); // 如果不是，则把新元素插入到目标元素和parent元素的下一个子元素的中间
//	}
//}
