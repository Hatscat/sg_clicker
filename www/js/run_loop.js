function loop (t) {

	time = t || 0;
	var elapsed_time = time - (old_timestamp || 0);
	old_timestamp = time;
	delta_time = elapsed_time * .06; // 60 fps
    if(time >= last_time_clicked+time_combo){
        click_serie = 0;
        click_multiplier = 0;
    }
    if(time >=last_time_fric_update+fric_refresh_time){
        fric += fric_per_second*(fric_refresh_time/1000);
        last_time_fric_update = time;
        can_refresh_header = true;
    }
    if(time >=last_time_achievemnts_update+achievements_refresh_time){
        last_time_achievemnts_update = time;
        for(var i=0;i<ACHIEVEMENTS.length;i++){
            var toCheck = ACHIEVEMENTS[i].varUsed === "SAVINGS" ? SAVINGS[ACHIEVEMENTS[i].saving].nb_total : window[ACHIEVEMENTS[i].varUsed];
            if(toCheck >= ACHIEVEMENTS[i].valueToPass && !ACHIEVEMENTS[i].gotIt) {
                ACHIEVEMENTS[i].gotIt = true;
                fric_per_second += ACHIEVEMENTS[i].reward*fric_per_second/100;
                is_new_achievement = true;
            }
        }
        for(var i=0;i<SAVINGS.length;i++){
            if(fric >= SAVINGS[i].cost){
                is_new_saving = true;
                break;
            }
        }
    }
	render();
	requestAnimationFrame(loop);
}