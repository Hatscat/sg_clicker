SC_GAME = 1;
SC_ACHIEVEMENTS = 2;
SC_UPGRADES = 3;

BT_ACHIEVEMENTS = [.1, .9, .2, .2];
BT_UPGRADES = [.7, .9, .2, .2];

current_scene = SC_GAME;
canvas = document.getElementById('canvas');
canvas.width = W = window.innerWidth;
canvas.height = H = window.innerHeight;
main_buffer = canvas.cloneNode();
real_ctx = C.getContext('2d');
buff_ctx = main_buffer.getContext('2d');
mouse = {
	x: 0,
	y: 0,
	isDown: false
};