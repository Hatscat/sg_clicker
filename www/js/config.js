function init_config () {

	canvas = document.getElementById('canvas');
	main_buffer = canvas.cloneNode();
	real_ctx = canvas.getContext('2d');
	buff_ctx = main_buffer.getContext('2d');
    
	SC_GAME = 1;
	SC_ACHIEVEMENTS = 2;
	SC_BANK = 3;
    CLICK_COMBO_LEVEL = [
        {clicks:0,multiplier:1},
        {clicks:5,multiplier:1.5},
        {clicks:10,multiplier:2},
        {clicks:20,multiplier:3},
        {clicks:50,multiplier:4},
        {clicks:90,multiplier:5},
        {clicks:140,multiplier:6},
        {clicks:200,multiplier:10}
    ];
    
	fric = 0;
	fric_per_second = 1;
    fric_per_click = 1;
    fric_refresh_time = 100;
    click_multiplier = 0;
    click_serie = 0;
    last_time_clicked = 0;
    last_time_update = 0;
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
	BT_INFO = [W*.5-BT_SIZE*.5, H-BT_SIZE, BT_SIZE, BT_SIZE];
	BT_BANK = [W-BT_SIZE, H-BT_SIZE, BT_SIZE, BT_SIZE];

	COIN_RADIUS_S = 0.18 * min_length;
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

	coin_sprites = create_coin_sprites();
}

function create_coin_sprites () {
	
	var c1 = document.createElement('canvas');
	c1.width = W;
	c1.height = H;
	var c2 = c1.cloneNode();
	var ctx1 = c1.getContext('2d');
	var ctx2 = c2.getContext('2d');

	draw_coin(ctx1, COIN_RADIUS_L);
	draw_coin(ctx2, COIN_RADIUS_S);
	
	function draw_coin (ctx, size) {

		var radius1 = size;
		var radius2 = size * .75;

		ctx.fillStyle = '#e4d095';
		ctx.beginPath();
		ctx.arc(coin_circle[0], coin_circle[1], radius1, 0, Math.PI*2);
		ctx.fill();

		ctx.lineWidth = size * .08;
		ctx.strokeStyle = '#c7a972';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(coin_circle[0], coin_circle[1], radius1-ctx.lineWidth/2, 0, Math.PI*2);
		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#b95';
		ctx.stroke();

		ctx.fillStyle = '#ddd';
		ctx.beginPath();
		ctx.arc(coin_circle[0], coin_circle[1], radius2, 0, Math.PI*2);
		ctx.fill();

		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#555';
		ctx.stroke();

		ctx.font = radius2*1.6 + "px georgia";
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('€', coin_circle[0], coin_circle[1]);

		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#555';
		ctx.strokeText('€', coin_circle[0], coin_circle[1]);
	}
	return [c1, c2];
}