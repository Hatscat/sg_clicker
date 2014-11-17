function render () {

	// buff_ctx.textAlign = 'center';
	// buff_ctx.textBaseline = 'top';

	switch (current_scene) {
		case SC_GAME:
			draw_game_sc();
		break;
		case SC_ACHIEVEMENTS:
			draw_achievements_sc();
		break;
		case SC_BANK:
			draw_upgrades_sc();
		break;
	}

	real_ctx.drawImage(main_buffer, 0, 0);
}

function draw_game_sc () {

	// BG
	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillRect(0, 0, W, H);

	// coin
	buff_ctx.fillStyle = '#f00';
	
	var radius = COIN_RADIUS_M;
	
	if (isMouseHover_circle(coin_circle)) {

		if (mouse.isDown) {
			radius = COIN_RADIUS_S;
		} else {
			radius = COIN_RADIUS_M;
		}
	} else {
		radius = COIN_RADIUS_L;
	}

	buff_ctx.beginPath();
	buff_ctx.arc(coin_circle[0], coin_circle[1], radius, 0, 2*Math.PI);
	buff_ctx.fill();
	
	// bt achievement
	buff_ctx.fillStyle = '#0f0';
	buff_ctx.fillRect(BT_ACHIEVEMENTS[0], BT_ACHIEVEMENTS[1], BT_ACHIEVEMENTS[2], BT_ACHIEVEMENTS[3]);

	// bt bank
	buff_ctx.fillStyle = '#00f';
	buff_ctx.fillRect(BT_BANK[0], BT_BANK[1], BT_BANK[2], BT_BANK[3]);

	// fric
	draw_fric();

	// combo bar
	buff_ctx.fillStyle = '#c00';
	buff_ctx.fillRect(0, FRIC_FONT_SIZE*2-text_margin_h*5, W, text_margin_h*5);
}

function draw_achievements_sc () {

	buff_ctx.fillStyle = '#ee0';
	buff_ctx.fillRect(0, 0, W, H);

	draw_fric();
}

function draw_upgrades_sc () {

	buff_ctx.fillStyle = '#e55';
	buff_ctx.fillRect(0, 0, W, H);

	draw_fric();
}

function draw_fric () {

	buff_ctx.fillStyle = '#ccc';
	buff_ctx.fillRect(0, 0, W, FRIC_FONT_SIZE*2);

	buff_ctx.font = fric_font;
	buff_ctx.fillStyle = fric_grad;
	buff_ctx.strokeStyle = '#000';

	buff_ctx.fillText(fric+' €', W*.5, text_margin_h);
	buff_ctx.strokeText(fric+' €', W*.5, text_margin_h);

	buff_ctx.font = (FRIC_FONT_SIZE*.5) + "px impact";
	buff_ctx.fillStyle = '#000';
	buff_ctx.fillText(fric_per_second+' € / second', W*.5, FRIC_FONT_SIZE+text_margin_h*2);
}

//res = 1280*800