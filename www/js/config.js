function init_config () {

	canvas = document.getElementById('canvas');
	main_buffer = canvas.cloneNode();
	real_ctx = canvas.getContext('2d');
	buff_ctx = main_buffer.getContext('2d');
    
	SC_GAME = 1;
	SC_ACHIEVEMENTS = 2;
	SC_BANK = 3;
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

	COIN_RADIUS_S = 0.1 * min_length;
	COIN_RADIUS_M = 0.15 * min_length;
	COIN_RADIUS_L = 0.2 * min_length;

	coin_circle = [W*.5, H*.5, COIN_RADIUS_L];

	set_render_settings();
};

function set_render_settings () {

	FRIC_FONT_SIZE = min_length * .1;
	buff_ctx.textAlign = 'center';
	buff_ctx.textBaseline = 'top';
	fric_font = FRIC_FONT_SIZE + "px impact";
	fric_grad = buff_ctx.createLinearGradient(0, 0, 0, FRIC_FONT_SIZE);
	fric_grad.addColorStop(0, '#333');
	fric_grad.addColorStop(.5, '#fff');
	fric_grad.addColorStop(1, '#333');

	text_margin_h = FRIC_FONT_SIZE * .05;

	coin_sprite = create_coin_sprite();
}

function create_coin_sprite () {
	
	var c = canvas.cloneNode();
	var ctx = c.getContext('2d');



	return c;
}