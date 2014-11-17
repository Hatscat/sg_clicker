function init_events(){
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
                fric += fric_per_click*click_combo_level[click_multiplier].multiplier;
                click_serie++;
                last_time_clicked = time;
                if(click_multiplier != click_combo_level.length-1){
                    if(click_serie > click_combo_level[click_multiplier+1].clicks)
                        click_multiplier++;
                }
            }
            else if(isMouseHover(BT_ACHIEVEMENTS)) {
                current_scene = SC_ACHIEVEMENTS;
            }
            else if(isMouseHover(BT_BANK)){
                current_scene = SC_BANK;
            }   
        }
        else if(current_scene === SC_ACHIEVEMENTS){
            //ACHIEVEMNT EVENTS
        }
        else if(current_scene === SC_BANK){
            //BANK EVENTS
        }
    }
}
// params : [x, y, w, h]
// return true is mouse is on the box
function isMouseHover (box) { 
	return mouse.x >= box[0] && mouse.x <= box[0]+box[2] && mouse.y >= box[1] && mouse.y <= box[1]+box[3];
}

// params : [x, y, radius]
// return true is mouse is on the circle
function isMouseHover_circle (circle) {
   return (mouse.x-circle[0])*(mouse.x-circle[0])+(mouse.y-circle[1])*(mouse.y-circle[1]) < circle[2]*circle[2];
}
