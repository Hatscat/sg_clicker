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

	buff_ctx.fillStyle = '#eee';
	buff_ctx.fillRect(0, 0, W, H);

	buff_ctx.fillStyle = '#f00';
	buff_ctx.fillRect(COIN_BOX[0], COIN_BOX[1], COIN_BOX[2], COIN_BOX[3]);
	buff_ctx.fillStyle = '#0f0';
	buff_ctx.fillRect(BT_ACHIEVEMENTS[0], BT_ACHIEVEMENTS[1], BT_ACHIEVEMENTS[2], BT_ACHIEVEMENTS[3]);
	buff_ctx.fillStyle = '#00f';
	buff_ctx.fillRect(BT_BANK[0], BT_BANK[1], BT_BANK[2], BT_BANK[3]);

	draw_fric();

	buff_ctx.font = (FRIC_FONT_SIZE*.5) + "px impact";
	buff_ctx.fillStyle = '#000';
	buff_ctx.fillText(fric_per_second+' € / second', W*.5, FRIC_FONT_SIZE+text_margin_h*2);
}

function draw_achievements_sc () {

	draw_fric();
}

function draw_upgrades_sc () {

	draw_fric();
}

function draw_fric () {

	buff_ctx.font = fric_font;
	buff_ctx.fillStyle = fric_grad;
	buff_ctx.strokeStyle = '#000';

	buff_ctx.fillText(fric+' €', W*.5, text_margin_h);
	buff_ctx.strokeText(fric+' €', W*.5, text_margin_h);
}

//res = 1280*800