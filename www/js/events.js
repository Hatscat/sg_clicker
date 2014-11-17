onresize = set_size;

onmousemove = function (e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}
onmousedown = function () {
	mouse.isDown = true;
}
onmouseup = function () {
	mouse.isDown = false;
    if(current_scene === SC_GAME){
        if(isMouseHover(COIN_BOX)){
            //FRIC+= FRIC PER CLICK * COMBO
        }
        else if(isMouseHover(BT_ACHIEVEMENTS)) {
            //LOAD achievment scene
        }
        else if(isMouseHover(BT_BANK)){
            //LOAD upgrades scenes
        }   
    }
    else if(current_scene === SC_ACHIEVEMENTS){
        //ACHIEVEMNT EVENTS
    }
    else if(current_scene === SC_BANK){
        //BANK EVENTS
    }
}

// params : [x, y, w, h]
// return true is mouse is on the box
function isMouseHover (box) { 
	return mouse.x >= box[0] && mouse.x <= box[0] + box[2] && mouse.y >= box[1] && mouse.y <= box[1] + box[3];
}