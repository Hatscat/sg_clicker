canvas = document.getElementById('canvas');
canvas.width = W = window.innerWidth;
canvas.height = H = window.innerHeight;
main_buffer = canvas.cloneNode();
real_ctx = C.getContext('2d');
buff_ctx = main_buffer.getContext('2d');

SC_GAME = 1;
SC_ACHIEVEMENTS = 2;
SC_UPGRADES = 3;

BT_SIZE = .15 * (W < H ?  W : H);
BT_ACHIEVEMENTS = [.05*W, H*.9-BT_SIZE, BT_SIZE, BT_SIZE];
BT_UPGRADES = [.75*W, H*.9-BT_SIZE, BT_SIZE, BT_SIZE];

COIN_SIZE = 0.33 * (W < H ?  W : H);
COIN_BOX = [W*.5-COIN_SIZE*.5, H*.4-COIN_SIZE*.5, COIN_SIZE, COIN_SIZE];

current_scene = SC_GAME;
time = 0;
delta_time = 1;
old_timestamp = 0;
mouse = {
	x: 0,
	y: 0,
	isDown: false
};