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
                set_new_particles();
                fric += fric_per_click*CLICK_COMBO_LEVEL[click_multiplier].multiplier;
                click_serie++;
                total_click++;
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
            is_new_achievement = false;
            if(isMouseHover_circle(BT_BACK_CIRCLE)){
                current_scene = SC_GAME;
            }
        }
        else if(current_scene === SC_BANK){
            is_new_saving = false;
            if(isMouseHover_circle(BT_BACK_CIRCLE)){
                current_scene = SC_GAME;
            }
            for(var i=0;i< SAVINGS.length;i++){
                var box = [SAVINGS[i].box[0],SAVINGS[i].box[1]+vertical_scroll*SAVINGS[i].box[3]+HEADER_H,SAVINGS[i].box[2],SAVINGS[i].box[3]];
                if(isMouseHover(box) && fric >= SAVINGS[i].cost) {
                    console.log(SAVINGS[i].name);
                    fric -= SAVINGS[i].cost;
                    fric_per_second += SAVINGS[i].fric_per_second;
                    SAVINGS[i].nb_total++;
                    SAVINGS[i].cost += SAVINGS[i].cost*10/100;
                    break;
                }
            }
        }
    }
    onmousewheel = function (e) {
    	vertical_scroll += Math.abs(e.wheelDeltaY)/e.wheelDeltaY;
    	//console.log(e);
    	//console.log(vertical_scroll);
    	// TODO : // isMouseHover([box[0], box[1]-vertical_scroll*box[3], box[2], box[3]])
    }
    onwheel = function(e) {
        vertical_scroll -= Math.abs(e.deltaY)/e.deltaY;
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

function set_new_particles () {

    for (var i = particles_max_nb; i--;) {

        var size = particles_min_size + Math.random() * particles_max_size | 0;
        var fade = size / particles_max_size;
        var color = fade*220|0;

        particles.push({
            font: size + "px georgia",
            style: 'rgb('+color+','+color+',0)',
            x: mouse.x,
            y: mouse.y,
            dir: Math.PI * 2 * i / particles_max_nb,
            speed: particle_speed_min + Math.random() * particle_speed_min * 3,
            gravity: 0
        });
    }
}
