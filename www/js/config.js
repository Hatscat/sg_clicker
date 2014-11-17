function init_config () {

	canvas = document.getElementById('canvas');
	main_buffer = canvas.cloneNode();
	real_ctx = canvas.getContext('2d');
	buff_ctx = main_buffer.getContext('2d');

	SC_GAME = 1;
	SC_ACHIEVEMENTS = 2;
	SC_UPGRADES = 3;

	fric = 0;
	fric_per_second = 0;
	current_scene = SC_GAME;
	time = 0;
	delta_time = 1;
	old_timestamp = 0;
	mouse = {
		x: 0,
		y: 0,
		isDown: false
	};

	set_size();
}

function set_size () {

	canvas.width = main_buffer.width = W = window.innerWidth;
	canvas.height = main_buffer.height = H = window.innerHeight;
	
	min_length = W < H ?  W : H;
	BT_SIZE = .2 * min_length;
	BT_ACHIEVEMENTS = [0, H-BT_SIZE, BT_SIZE, BT_SIZE];
	BT_BANK = [W-BT_SIZE, H-BT_SIZE, BT_SIZE, BT_SIZE];

	COIN_SIZE = 0.33 * (W < H ?  W : H);
	COIN_BOX = [W*.5-COIN_SIZE*.5, H*.5-COIN_SIZE*.5, COIN_SIZE, COIN_SIZE];
};