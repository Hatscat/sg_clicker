canvas = document.getElementById('canvas');
canvas.width = W = window.innerWidth;
canvas.height = H = window.innerHeight;
main_buffer = canvas.cloneNode();
real_ctx = C.getContext('2d');
buff_ctx = main_buffer.getContext('2d');

SC_GAME = 1;
SC_ACHIEVEMENTS = 2;
SC_UPGRADES = 3;

BT_ACHIEVEMENTS = [0.05*W, 0.25*H, 0.15*W, 0.15*W];
BT_UPGRADES = [0.75*W, 0.25*H, 0.15*W, 0.15*W];

current_scene = SC_GAME;
mouse = {
	x: 0,
	y: 0,
	isDown: false
};