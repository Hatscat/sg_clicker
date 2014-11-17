function loop (t) {

	time = t;
	var elapsed_time = time - (old_timestamp || 0);
	old_timestamp = time;
	delta_time = elapsed_time * 0.06; // 60 fps
    if(time >= last_time_clicked+time_combo){
        click_serie = 0;
        click_multiplier = 0;
    }
	
	render();
	requestAnimationFrame(loop);
}