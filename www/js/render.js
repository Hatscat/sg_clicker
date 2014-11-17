function render () {

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
	buff_ctx.fillStyle = '#000';
	buff_ctx.fillRect(0, 0, W, H);

	// coin
	var radius = isMouseHover_circle(COIN_CIRCLE) && mouse.isDown ? 1 : 0;
	buff_ctx.drawImage(coin_sprites[radius], 0, 0);
	
	// bt achievement
	buff_ctx.fillStyle = '#0f0';
	buff_ctx.fillRect(BT_ACHIEVEMENTS[0], BT_ACHIEVEMENTS[1], BT_ACHIEVEMENTS[2], BT_ACHIEVEMENTS[3]);

	// bt bank
	buff_ctx.fillStyle = '#00f';
	buff_ctx.fillRect(BT_BANK[0], BT_BANK[1], BT_BANK[2], BT_BANK[3]);

	// particles
	buff_ctx.drawImage(particle_sprite, W*.2, H*.3);

	// fric
	draw_fric();

	// combo bar
	buff_ctx.fillStyle = '#fff';
	buff_ctx.fillRect(0, FRIC_FONT_SIZE*2-text_margin_h*5, click_multiplier/(CLICK_COMBO_LEVEL.length-1)*W|0, text_margin_h*5);
}

function draw_achievements_sc () {

	buff_ctx.fillStyle = '#ee0';
	buff_ctx.fillRect(0, 0, W, H);


	draw_fric();
	buff_ctx.drawImage(back_bt_sprite, 0, 0);
}

function draw_upgrades_sc () {

	buff_ctx.fillStyle = '#e55';
	buff_ctx.fillRect(0, 0, W, H);

	draw_fric();
	buff_ctx.drawImage(back_bt_sprite, 0, 0);
}

function draw_fric () {

	var fric_str = fric<1e3 ? (fric*100|0)/100 : fric|0;

	buff_ctx.fillStyle = '#e82d24';
	buff_ctx.fillRect(0, 0, W, FRIC_FONT_SIZE*2);

	buff_ctx.font = fric_font;
	buff_ctx.fillStyle = fric_grad;
	buff_ctx.strokeStyle = '#000';
	buff_ctx.lineWidth = FRIC_FONT_SIZE * .01;

	buff_ctx.fillText(fric_str+' €', W*.5, text_margin_h);
	buff_ctx.strokeText(fric_str+' €', W*.5, text_margin_h);

	buff_ctx.font = (FRIC_FONT_SIZE*.5) + "px impact";
	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillText(fric_per_second+' € / second', W*.5, FRIC_FONT_SIZE+text_margin_h*2);
}

//res = 1280*800