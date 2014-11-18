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
	buff_ctx.globalAlpha = .7;
	buff_ctx.fillStyle = '#000';
	buff_ctx.fillRect(0, HEADER_H, W, H);
	buff_ctx.globalAlpha = 1;

	//combo fx
	if (click_multiplier) {
		//buff_ctx.shadowColor = "#f33";
		buff_ctx.shadowBlur = COIN_RADIUS_S * 50 * (Math.cos(time)+1)/2//*.004) / Math.sin(time*.002);
		//console.log(buff_ctx.shadowBlur)
		
		buff_ctx.beginPath();
		//buff_ctx.fillStyle = '#fff';
		buff_ctx.arc(COIN_CIRCLE[0], COIN_CIRCLE[1], COIN_RADIUS_S, 0, Math.PI*2);
		buff_ctx.fill();

		buff_ctx.shadowBlur = 0;
	}

	// coin
	var radius_id = isMouseHover_circle(COIN_CIRCLE) && mouse.isDown ? 1 : 0;
	buff_ctx.drawImage(coin_sprites[radius_id], 0, 0);
	
	// bt achievement
	buff_ctx.drawImage(trophy_img, 0, 0, img_src_size, img_src_size, BT_ACHIEVEMENTS[0], BT_ACHIEVEMENTS[1], BT_ACHIEVEMENTS[2], BT_ACHIEVEMENTS[3]);

	// bt bank
	buff_ctx.drawImage(bank_img, 0, 0, img_src_size, img_src_size, BT_BANK[0], BT_BANK[1], BT_BANK[2], BT_BANK[3]);

	// combo
	if (click_multiplier && radius_id) {
		buff_ctx.font = "bold " + BT_SIZE + "px impact";
		buff_ctx.fillStyle = '#e22';
		buff_ctx.fillText('x'+CLICK_COMBO_LEVEL[click_multiplier].multiplier, W*.5, H*.5-BT_SIZE*.6);
	}

	// particles
	for (var i = particles.length; i--;) {

		if (particles[i].x<0 || particles[i].x>W || particles[i].y<HEADER_H || particles[i]>H) {
			particles.splice(i, 1);
		} else {
			buff_ctx.font = particles[i].font;
			buff_ctx.fillStyle = particles[i].style;
			buff_ctx.fillText('€', particles[i].x+=Math.cos(particles[i].dir)*particles[i].speed, particles[i].y-=Math.sin(particles[i].dir)*particles[i].speed+particles[i].gravity);
			particles[i].gravity += gravity;
		}
	}

	// new achievement?
	if (is_new_achievement && (time/250|0)%2) {
		buff_ctx.fillStyle = buff_ctx.strokeStyle = '#ee2';
		buff_ctx.font = "bold " + BT_SIZE + "px impact";
		buff_ctx.fillText('!', BT_ACHIEVEMENTS[0]+BT_ACHIEVEMENTS[2]*.5, BT_ACHIEVEMENTS[1]*.9);
	}

	// new saving?
	if (is_new_saving && (time/250|0)%2) {
		buff_ctx.fillStyle = buff_ctx.strokeStyle = '#ee2';
		buff_ctx.font = "bold " + BT_SIZE + "px impact";
		buff_ctx.fillText('!', BT_BANK[0]+BT_BANK[2]*.5, BT_BANK[1]*.9);
	}

	if (can_refresh_header) {
		can_refresh_header = false;
		// fric
		draw_fric();
		// combo bar
		buff_ctx.fillStyle = '#fff';
		buff_ctx.fillRect(0, HEADER_H-text_margin_h*2, click_multiplier/(CLICK_COMBO_LEVEL.length-1)*W|0, text_margin_h*2);
	}
}

function draw_achievements_sc () {

	// BG
	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillRect(0, HEADER_H, W, H);

	// achievements
	buff_ctx.fillStyle = buff_ctx.strokeStyle = '#000';
	buff_ctx.lineWidth = FRIC_FONT_SIZE * .1;

	for (var i = ACHIEVEMENTS.length; i--;) {
		
		vertical_scroll = vertical_scroll<0 ? vertical_scroll>1-ACHIEVEMENTS.length ? vertical_scroll : 1-ACHIEVEMENTS.length : 0;

		var h = ACHIEVEMENTS[i].box[1] + vertical_scroll*ACHIEVEMENTS[i].box[3] + HEADER_H*1.025;
		
		if (h < H && h >= HEADER_H) { // test if on screen
			// stars
			if (ACHIEVEMENTS[i].gotIt) {
				buff_ctx.fillStyle = '#ff9';
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

	if (can_refresh_header) {
		can_refresh_header = false;
		// fric
		draw_fric();
		// sprite partage
		buff_ctx.drawImage(fb_img, 0, 0, img_src_size, img_src_size, BT_FB[0], BT_FB[1], BT_FB[2], BT_FB[3]);
		// sprite classement
		buff_ctx.drawImage(podium_img, 0, 0, img_src_size, img_src_size, BT_PODIUM[0], BT_PODIUM[1], BT_PODIUM[2], BT_PODIUM[3]);
		// sprite back
		buff_ctx.drawImage(back_bt_sprite, 0, 0);
	}
}

function draw_savings_sc () {

	// BG
	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillRect(0, HEADER_H, W, H);

	// savings + info bts
	buff_ctx.lineWidth = FRIC_FONT_SIZE * .1;

	for (var i = SAVINGS.length; i--;) {
		
		vertical_scroll = vertical_scroll<0 ? vertical_scroll>1-SAVINGS.length ? vertical_scroll : 1-SAVINGS.length : 0;

		var h = SAVINGS[i].box[1] + vertical_scroll*SAVINGS[i].box[3] + HEADER_H*1.025;
		
		if (h < H && h >= HEADER_H) { // test if on screen

			buff_ctx.fillStyle = buff_ctx.strokeStyle = '#ff9';
			buff_ctx.fillRect(SAVINGS[i].box[0], h, SAVINGS[i].box[2]*SAVINGS[i].nb_total/savings_value_max, SAVINGS[i].box[3]);
			buff_ctx.fillStyle = buff_ctx.strokeStyle = '#000';
			buff_ctx.font = (FRIC_FONT_SIZE*.6) + "px impact";
			buff_ctx.fillText(SAVINGS[i].name, SAVINGS[i].box[2]*.5, h); // + ' ' + (SAVINGS[i].nb_total|0) + '%'
			buff_ctx.font = (FRIC_FONT_SIZE*.45) + "px georgia";
			buff_ctx.fillText((SAVINGS[i].cost|0)+' €', SAVINGS[i].box[2]*.5, h+FRIC_FONT_SIZE*.25+text_margin_h*4.5);
			buff_ctx.font = "italic " + (FRIC_FONT_SIZE*.5) + "px georgia";
			buff_ctx.fillText(SAVINGS[i].description, SAVINGS[i].box[2]*.5, h+FRIC_FONT_SIZE*.5+text_margin_h*8);
			buff_ctx.strokeRect(SAVINGS[i].box[0], h, W, SAVINGS[i].box[3]);
			// info bts
			buff_ctx.drawImage(info_bt_sprite, BT_INFO[0], h);
		}
	}

	if (can_refresh_header) {
		can_refresh_header = false;
		// fric
		draw_fric();
		// sprite back
		buff_ctx.drawImage(back_bt_sprite, 0, 0);
	}
}

function draw_fric () {

	var fric_str = fric<1e3 ? (fric*100|0)/100 : fric|0;

	buff_ctx.fillStyle = '#e82d24';
	buff_ctx.fillRect(0, 0, W, HEADER_H);

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
