function init_events(){
    onresize = set_size;
}
// params : [x, y, w, h]
// return true is mouse is on the box
function isMouseHover (box) { 
	return mouse.x >= box[0] && mouse.x <= box[0]+box[2] && mouse.y >= box[1] && mouse.y <= box[1]+box[3];
}
// params : [x, y, radius]
// return true is mouse is on the circle
function isMouseHover_circle (circle) {
   return (mouse.x-circle[0])*(mouse.x-circle[0])+(mouse.y-circle[1])*(mouse.y-circle[1]) < circle[2]*circle[2];
}

function set_new_particles () {

    for (var i = particles_max_nb; i--;) {

        var size = particles_min_size + Math.random() * particles_max_size | 0;
        var fade = size / particles_max_size;
        var color = fade*220|0;

        particles.push({
            font: size + "px georgia",
            style: 'rgb('+color+','+color+','+(color*.33|0)+')',
            x: mouse.x,
            y: mouse.y,
            dir: Math.PI * 2 * i / particles_max_nb,
            speed: particle_speed_min + Math.random() * particle_speed_min * 3,
            gravity: 0
        });
    }
}
