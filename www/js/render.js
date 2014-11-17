function render () {

	switch (current_scene) {
		case SC_GAME:
			draw_game_sc();
		break;
		case SC_ACHIEVEMENTS:
			draw_achievements_sc();
		break;
		case SC_UPGRADES:
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
}

function draw_achievements_sc () {

}

function draw_upgrades_sc () {

}