var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var windows = require('sdk/windows');
var utils = require('sdk/window/utils');
var pageMod = require("sdk/page-mod");
var self    = require('sdk/self');
var workers = require("sdk/content/worker");
var timers = require("sdk/timers");

var extensionWindow = null;
var extensionWorker = null;
//Defining the button
var button = buttons.ActionButton({
  id: "bublup-button",
  label: "Open Bublup",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
    onClick: handleClick
});

function _attachWorker (){
  let worker =  workers.Worker({
    window: extensionWindow,
    contentScriptFile: self.data.url("injected_script.js")
  });
  console.log("Worker url :" + worker.url);
  extensionWorker = worker;
}

function handleClick() {
  console.log("=====Click"); 
  var _windowExists=false;
  var i=0;
  var windowsArray=utils.windows();

  while (_windowExists===false && i<windowsArray.length){
    console.log("Window name: " + windowsArray[i].name);
    if(windowsArray[i].name==="extensionWindow"){
      _windowExists=true;
      extensionWindow=windowsArray[i];
    }
    i++;
  }

  if(!_windowExists){
    extensionWindow = utils.openDialog({
      url: "http://bublup.herokuapp.com",
      name: "extensionWindow",
      features: 'width=250, height=700,dialog=no,location=no'
    });
    timers.setTimeout(_attachWorker,500);
  }
  else{
    extensionWindow.focus();
    extensionWorker.port.emit('OpenAlert', "MESSAGE RECEIVED");
  }  
}
      //features : "resizable=yes,width=10,height=800");
  /*for  (var i=0; i<tabs.length; i++) {
    console.log(tabs[i].title+"    id : "+tabs[i].id);
    tabs[i].activate();
  } 
  for  (var i=0; i<utils.windows().length; i++) {
    console.log(utils.windows()[i].name);
  }
  */
pageMod.PageMod({
  include: '*',
  contentScriptFile: self.data.url("injected_script.js"),
  attachTo: ["existing","top"],
  onAttach: function(worker) {
    console.log("Attaching the script with worker id..."+ worker.tab.id);
  }
}); 
/*

tabs.on('open', function(tab){
  tab.on('activate', function(tab){
    console.log("Activate" + tab.title);
  });
  tab.on('deactivate', function(tab){
    console.log("Deactivate" + tab.title);
  });
});

*/