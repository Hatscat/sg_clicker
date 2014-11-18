/* "mouse" simple object by Hatscat

The MIT License (MIT)

Copyright (c) 2014 Lucien Boudy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function ()
{
    onmousemove = function (e) {
		m.oldX = m.x;
		m.oldY = m.y;
		m.x = e.x;
		m.y = e.y;
		m.moveX = m.x == m.oldX ? 0 : m.x < m.oldX ? -1 : 1;
		m.moveY = m.y == m.oldY ? 0 : m.y < m.oldY ? -1 : 1;
        if(mouse.isDown){
            var distanceParcourue = m.y-m.target.y;
            if(Math.abs(distanceParcourue) >= SAVINGS[0].box[3]){
                vertical_scroll -= Math.abs(distanceParcourue)/distanceParcourue;
                m.isScrolling = true;
                m.target.y = m.y;
            }
        }
    }
    document.addEventListener("touchmove", function(e){
		m.oldX = m.x;
		m.oldY = m.y;
		m.x = e.x;
		m.y = e.y;
		m.moveX = m.x == m.oldX ? 0 : m.x < m.oldX ? -1 : 1;
		m.moveY = m.y == m.oldY ? 0 : m.y < m.oldY ? -1 : 1;
        if(mouse.isDown){
            var distanceParcourue = m.y-m.target.y;
            if(Math.abs(distanceParcourue) >= SAVINGS[0].box[3]){
                vertical_scroll -= Math.abs(distanceParcourue)/distanceParcourue;
                m.isScrolling = true;
                m.target.y = m.y;
            }
        }
    }, false);
    onmousedown = function (e) {
        if(!mouse.isDown){
            m.target.x = e.x;
            m.target.y = e.y;      
        }
        mouse.isDown = true;
    }
    onmouseup = function () {
        mouse.isDown = false;
        if(!mouse.isScrolling){
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
                    var box = [SAVINGS[i].box[0],SAVINGS[i].box[1]+vertical_scroll*SAVINGS[i].box[3]+HEADER_H, SAVINGS[i].box[2], SAVINGS[i].box[3]];
                    var boxInfo = [BT_INFO[0], SAVINGS[i].box[1]+vertical_scroll*SAVINGS[i].box[3]+HEADER_H, BT_INFO[2], BT_INFO[3]];

                    if(isMouseHover(boxInfo)){
                        window.open(SAVINGS[i].link,'_blank');
                    }
                    else if(isMouseHover(box) && fric >= SAVINGS[i].cost) {
                        fric -= SAVINGS[i].cost;
                        fric_per_second += SAVINGS[i].fric_per_second;
                        SAVINGS[i].nb_total++;
                        SAVINGS[i].cost += SAVINGS[i].cost*10/100;
                        break;
                    }
                }
            }
        }
        mouse.isScrolling = false;
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
	var m = {
		e: null,
		x: 0,
		y: 0,
		oldX: 0,
		oldY: 0,
		moveX: 0,
		moveY: 0,
		isDown: false,
		doubleClicks: false,
		target: { x:0, y:0 }
	}
	window.mouse = m;
})()