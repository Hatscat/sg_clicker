onmousemove = function (e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}
onmousedown = function () {
	mouse.isDown = true;
}
onmouseup = function () {
	mouse.isDown = false;
	// TODO : add button events (instructions) here
}

function isMouseHover (box) { // [x, y, w, h]
	return mouse.x >= box[0] && mouse.x <= box[0] + box[2] && mouse.y >= box[1] && mouse.y <= box[1] + box[3];
}