function loop (t) {

	time = t;
	var elapsed_time = time - (old_timestamp || 0);
	old_timestamp = time;
	delta_time = elapsed_time * 0.06; // 60 fps

	
	render();
	requestAnimationFrame(loop);
}