var IsLoaded=false;

window.addEventListener('load', function () {
    if(!IsLoaded){
        IsLoaded=true;
        init_config();
        init_events();
        loop();
    }
});

/* Intel native bridge is available */
document.addEventListener("intel.xdk.device.ready",function(){
    intel.xdk.device.hideSplashScreen();
    if(!IsLoaded){
        IsLoaded=true;
        init_config();
        init_events();
        loop();
    }    
},false);