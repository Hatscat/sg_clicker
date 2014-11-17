var IsLoaded=false;

window.addEventListener('load', function () {
    if(!IsLoaded){
        IsLoaded=true;
        loop(); 
    }
});

/* Intel native bridge is available */
document.addEventListener("intel.xdk.device.ready",function(){
    intel.xdk.device.hideSplashScreen();
    if(!IsLoaded){
        IsLoaded=true;
        loop(); 
    }    
},false);