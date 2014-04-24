//Experimental : Use with firefox 29 onwards (Australis UI) some even are with firefox 30

//var buttons = require('sdk/ui/button/action');
//var panels = require('sdk/panel');
//var tabs = require("sdk/tabs");

var toggles = require('sdk/ui/button/toggle');
var self = require('sdk/self');
var windows = require('sdk/windows').browserWindows;
var utils = require('sdk/window/utils');


//The Button
var button = toggles.ToggleButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  //onChange: handleClick
      onChange: handleChange
});




function handleChange(state) {
	if (state.checked) {
	var window1 = windows.open("http://google.com");
		console.log(state.checked + self.uri+utils.getMostRecentBrowserWindow().id);
	}
	else {
		var willing=true;
		panel.hide();
	}
}

/*
// Test for Panels, not that good


//The Panel
var panel = panels.Panel({
	width: 180,
	length: 400,
	contentURL: self.data.url("panel.html"),
	onHide: function () {
		if (!willing) {
		panel.show();
		}
		willing=false;
	}
});
*/

// classic button
//Listeners set with button.on
//Unset with removeListener
//state refers to the button

/*
function firstClick(state) {
  console.log("You clicked '" + state.label + "'");
  button.removeListener("click", firstClick);
  button.on("click", subsequentClicks);
}

function subsequentClicks(state) {
  console.log("You clicked '" +  state.label + "' again");
}
 */

//disabled property can be set globally or in any window

//toggle button
