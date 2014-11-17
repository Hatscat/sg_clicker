function init_config () {

	canvas = document.getElementById('canvas');
	main_buffer = canvas.cloneNode();
	real_ctx = canvas.getContext('2d');
	buff_ctx = main_buffer.getContext('2d');
    
	SC_GAME = 1;
	SC_ACHIEVEMENTS = 2;
	SC_UPGRADES = 3;
    click_combo_level = [
        {clicks:0,multiplier:1},
        {clicks:2,multiplier:1.5},
        {clicks:10,multiplier:2},        
        {clicks:50,multiplier:4},        
        {clicks:100,multiplier:6}
    ];
	fric = 0;
	fric_per_second = 0;
    fric_per_click = 1;
    click_multiplier = 0;
    click_serie = 0;
    last_time_clicked = 0;
    time_combo = 500;
	current_scene = SC_GAME;
	time = 0; //in ms
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