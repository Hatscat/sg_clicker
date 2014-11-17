function loop (t) {

	time = t || 0;
	var elapsed_time = time - (old_timestamp || 0);
	old_timestamp = time;
	delta_time = elapsed_time * .06; // 60 fps
    if(time >= last_time_clicked+time_combo){
        click_serie = 0;
        click_multiplier = 0;
    }
    if(time >=last_time_update+fric_refresh_time){
        fric += fric_per_second*(fric_refresh_time/1000);
        last_time_update = time;
    }
	render();
	requestAnimationFrame(loop);
}