// Namespace
var android = {};
android.selection = {};
	
android.selection.selectionStartRange = null;
android.selection.selectionEndRange = null;


/** The last point touched by the user. { 'x': xPoint, 'y': yPoint } */
android.selection.lastTouchPoint = null;


/** 
 * Starts the touch and saves the given x and y coordinates as last touch point
 */
android.selection.startTouch = function(x, y){
	
	android.selection.lastTouchPoint = {'x': x, 'y': y};
	
};


/**
 *	Checks to see if there is a selection.
 *
 *	@return boolean
 */
android.selection.hasSelection = function(){
	return window.getSelection().toString().length > 0;
};


/**
 *	Clears the current selection.
 */
android.selection.clearSelection = function(){
	
	try{
		// if current selection clear it.
	   	var sel = window.getSelection();
	   	sel.removeAllRanges();
	}catch(err){
		window.TextSelection.jsError(err);
	}	
};


/**
 *	Handles the long touch action by selecting the last touched element.
 */
android.selection.longTouch = function() {
	console.log('=======selection start=========');
	try{
    	android.selection.clearSelection();
	   	var sel = window.getSelection();
	   	var oneWordCaret = document.caretRangeFromPoint(android.selection.lastTouchPoint.x, android.selection.lastTouchPoint.y);
	   	oneWordCaret.expand("word");
	   	
	    var selectionStart = $("<span id=\"selectionStart\">*>>*</span>");
    	oneWordCaret.insertNode(selectionStart[0]);
	   	
	 }
	 catch(err){
	 	window.TextSelection.jsError(err);
	 }
   	
};



/** 
 * Starts the touch and saves the given x and y coordinates as last touch point
 */
android.selection.moveTouch = function(x, y){
	var endNode = document.getElementById("selectionEnd");
	if(endNode){
		endNode.parentNode.removeChild(endNode);
	}
	android.selection.selectionEndRange = document.caretRangeFromPoint(x, y);
	var selectionEnd = $("<span id=\"selectionEnd\">*<<*</span>");
	android.selection.selectionEndRange.insertNode(selectionEnd[0]);
};






