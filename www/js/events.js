onmousemove = function (e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
}
onmousedown = function () {
	mouse.isDown = true;
}
onmouseup = function () {
	mouse.isDown = false;
	if(isMouseHover(COIN_BOX))
}

// params : [x, y, w, h]
// return true is mouse is on the box
function isMouseHover (box) { 
	return mouse.x >= box[0] && mouse.x <= box[0] + box[2] && mouse.y >= box[1] && mouse.y <= box[1] + box[3];
}