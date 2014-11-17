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
            if(isMouseHover_circle(COIN_CIRCLE)){
                fric += fric_per_click*CLICK_COMBO_LEVEL[click_multiplier].multiplier;
                click_serie++;
                last_time_clicked = time;
                if(click_multiplier != CLICK_COMBO_LEVEL.length-1){
                    if(click_serie > CLICK_COMBO_LEVEL[click_multiplier+1].clicks)
                        click_multiplier++;
                }
            }
            else if(isMouseHover(BT_ACHIEVEMENTS)) {
                current_scene = SC_ACHIEVEMENTS;
            }
            else if(isMouseHover(BT_BANK)){
            	vertical_scroll = 0;
                current_scene = SC_BANK;
            }   
        }
        else if(current_scene === SC_ACHIEVEMENTS){
            //ACHIEVEMNT EVENTS
        }
        else if(current_scene === SC_BANK){
            for(var i in SAVINGS){
                if(isMouseHover(SAVINGS[i].box) && fric >= SAVINGS[i].cost){
                    fric -= SAVINGS[i].cost;
                    fric_per_second += SAVINGS[i].fric_per_second;
                    SAVINGS[i].nb_total++;
                    SAVINGS[i].cost += SAVINGS[i].cost*10/100;
                }
            }
        }
    }
    onmousewheel = DOMMouseScroll = function (e) {

    	vertical_scroll += Math.abs(e.wheelDeltaY)/e.wheelDeltaY;
    	//console.log(e);
    	console.log(vertical_scroll);
    	// TODO : // isMouseHover([box[0], box[1]-vertical_scroll*box[3], box[2], box[3]])
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
