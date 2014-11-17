function render () {

	switch (current_scene) {
		case SC_GAME:
			draw_game_sc();
		break;
		case SC_ACHIEVEMENTS:
			draw_achievements_sc();
		break;
		case SC_BANK:
			draw_savings_sc();
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
	buff_ctx.fillRect(0, FRIC_FONT_SIZE*2-text_margin_h*2, click_multiplier/(CLICK_COMBO_LEVEL.length-1)*W|0, text_margin_h*2);
}

function draw_achievements_sc () {

	// BG
	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillRect(0, 0, W, H);

	// achievements
	buff_ctx.fillStyle = buff_ctx.strokeStyle = '#000';
	buff_ctx.lineWidth = FRIC_FONT_SIZE * .1;

	for (var i = ACHIEVEMENTS.length; i--;) {
		
		vertical_scroll = vertical_scroll<0 ? vertical_scroll>1-ACHIEVEMENTS.length ? vertical_scroll : 1-ACHIEVEMENTS.length : 0;

		var h = ACHIEVEMENTS[i].box[1] + vertical_scroll*ACHIEVEMENTS[i].box[3] + FRIC_FONT_SIZE*2;
		
		if (h < H && h >= FRIC_FONT_SIZE*2) { // test if on screen
			// stars
			if (ACHIEVEMENTS[i].gotIt) {
				buff_ctx.fillStyle = '#ffc';
				buff_ctx.fillRect(ACHIEVEMENTS[i].box[0], h, W, ACHIEVEMENTS[i].box[3]);
				buff_ctx.drawImage(achievement_star_sprites[1], BT_INFO[0], h);
				buff_ctx.fillStyle = buff_ctx.strokeStyle;
			} else {
				buff_ctx.drawImage(achievement_star_sprites[0], BT_INFO[0], h);
			}
			// text
			buff_ctx.font = (FRIC_FONT_SIZE*.6) + "px impact";
			buff_ctx.fillText(ACHIEVEMENTS[i].name, ACHIEVEMENTS[i].box[2]*.5, h+text_margin_h);
			buff_ctx.font = "italic " + (FRIC_FONT_SIZE*.5) + "px georgia";
			buff_ctx.fillText(ACHIEVEMENTS[i].description, ACHIEVEMENTS[i].box[2]*.5, h+FRIC_FONT_SIZE*.5+text_margin_h*5);
			buff_ctx.strokeRect(ACHIEVEMENTS[i].box[0], h, W, ACHIEVEMENTS[i].box[3]);
		}
	}

	// fric
	draw_fric();
	// sprite partage
	// sprite classement
	// sprite back
	buff_ctx.drawImage(back_bt_sprite, 0, 0);
}

function draw_savings_sc () {

	// BG
	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillRect(0, 0, W, H);

	// savings + info bts
	buff_ctx.fillStyle = buff_ctx.strokeStyle = '#000';
	buff_ctx.lineWidth = FRIC_FONT_SIZE * .1;

	for (var i = SAVINGS.length; i--;) {
		
		vertical_scroll = vertical_scroll<0 ? vertical_scroll>1-SAVINGS.length ? vertical_scroll : 1-SAVINGS.length : 0;

		var h = SAVINGS[i].box[1] + vertical_scroll*SAVINGS[i].box[3] + FRIC_FONT_SIZE*2;
		
		if (h < H && h >= FRIC_FONT_SIZE*2) { // test if on screen
			buff_ctx.font = (FRIC_FONT_SIZE*.6) + "px impact";
			buff_ctx.fillText(SAVINGS[i].name, SAVINGS[i].box[2]*.5, h+text_margin_h);
			buff_ctx.font = "italic " + (FRIC_FONT_SIZE*.5) + "px georgia";
			buff_ctx.fillText(SAVINGS[i].description, SAVINGS[i].box[2]*.5, h+FRIC_FONT_SIZE*.5+text_margin_h*5);
			buff_ctx.strokeRect(SAVINGS[i].box[0], h, W, SAVINGS[i].box[3]);
			// info bts
			buff_ctx.drawImage(info_bt_sprite, BT_INFO[0], h);
		}
	}

	// fric
	draw_fric();

	// sprite back
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

	buff_ctx.font = (FRIC_FONT_SIZE*.4) + "px impact";
	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillText(fric_per_second+' € / second', W*.5, FRIC_FONT_SIZE+text_margin_h*2);
}

//res = 1280*800