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
    SAVINGS = [
        {
            name:'LDD',
            cost:100,
            fric_per_second:10,            
            nb_total:0,
            description:"Une épargne ou on vit dans les arbres et on est copain avec les oiseaux",
            link:"https://particuliers.societegenerale.fr/epargner/par_type_de_placements/livrets_epargne/livret_developpement_durable.html"
        },
        {
            name:'Livret A',
            cost:150,
            fric_per_second:15,            
            total_fric_per_second:0,
            description:"le A c'est le B.A.-BA",
            link:"https://particuliers.societegenerale.fr/epargner/par_type_de_placements/livrets_epargne/livret_a.html"
        },
        {
            name:'LEP',
            cost:300,
            fric_per_second:30,            
            nb_total:0,
            description:"L'épargne pro prolétaire",
            link:"https://particuliers.societegenerale.fr/epargner/par_type_de_placements/livrets_epargne/livret_epargne_populaire.html"
            
        },
        {
            name:'Livret Jeune',
            cost:1000,
            fric_per_second:30,            
            nb_total:0,
            description:"Parcequ'un MacDo ça se prépare",
            link:"https://particuliers.societegenerale.fr/epargner/par_type_de_placements/livrets_epargne/livret_jeune.html",
        },
        {
            name:'PEL',
            cost:10000,
            fric_per_second:500,            
            nb_total:0,
            description:"Parcequ'un chez soi vraiment à soi c'est bien quand même",
            link:"https://particuliers.societegenerale.fr/epargner/par_type_de_placements/epargne_logement/plan_epargne_logement.html"
        },
        {
            name:'CEL',
            cost:50000,
            fric_per_second:2000,            
            nb_total:0,
            description:"Comme un PEL mais avec un C",
            link:"https://particuliers.societegenerale.fr/epargner/par_type_de_placements/epargne_logement/compte_epargne_logement.html"
        }
    ];
    ACHIEVEMENTS = [
        {
            name:'Sou Fétiche',
            description:"Le premier, le meilleur"
        },
        {
            name:'Wake and Bank',
            description:"Aquiert ton première épargne"
        },    
        {
            name:'Clic noob',
            description:"Clique 100 fois"
        },
        {
            name:'Big clic',
            description:"Clique 1000 fois"
        },
        {
            name:'Clic clic',
            description:"Clique 10000 fois"
        },
        {
            name:'Plus de doigt',
            description:"Clique 1 000 000 fois"
        },
        {
            name:'Plus de souris',
            description:"Clique 1 000 000 000 fois"
        },
        {
            name:'Cheat Clic',
            description:"Tu utlise un auto clicker c'est ça ?"
        },
        {
            name:"C'est un début",
            description:"Avoir 1000 euros"
        },
        {
            name:"Un bon paquet",
            description:"Avoir 10 000 euros"
        },
        {
            name:"Une petite fortune",
            description:"Avoir 100 000 euros"
        },        
        {
            name:"Millionaire",
            description:"Avoir 1 000 000 euros"
        },
        {
            name:"Milliardaire",
            description:"Avoir 1 000 000 000 euros"
        },
        {
            name:"Beacoupdaire",
            description:"Avoir 1 000 000 000 000 000 000 euros"
        },
        {
            name:"A demi",
            description:"Remplir son Livret A à 50%"
        },        
        {
            name:"Une belle foret",
            description:"Remplir son LDD à 50%"
        },
        {
            name:"Gaia te remercie",
            description:"Remplir son LDD à 100%"
        },
        {
            name:"Comarade",
            description:"Remplir son LEP à 50%"
        },
        {
            name:"Comarade",
            description:"Remplir son LEP à 50%"
        },
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
	vertical_scroll = 0;
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

	BT_BACK_CIRCLE = [W-BT_SIZE*.5, BT_SIZE*.5, BT_SIZE*.3];
	BT_INFO = [W-BT_SIZE, 0, BT_SIZE, BT_SIZE];
	for (var i = SAVINGS.length; i--;) {
		SAVINGS[i].box = [0, i*BT_SIZE, W-BT_SIZE, BT_SIZE];
	}
	for (var i = ACHIEVEMENTS.length; i--;) {
		ACHIEVEMENTS[i].box = [0, i*BT_SIZE, W-BT_SIZE, BT_SIZE];
	}


	COIN_RADIUS_S = 0.18 * min_length;
	COIN_RADIUS_L = 0.2 * min_length;
	COIN_CIRCLE = [W*.5, H*.5, COIN_RADIUS_L];

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
	particle_sprite = create_coin_particle();
	back_bt_sprite = create_back_bt();
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
		ctx.arc(COIN_CIRCLE[0], COIN_CIRCLE[1], radius1, 0, Math.PI*2);
		ctx.fill();

		ctx.lineWidth = size * .08;
		ctx.strokeStyle = '#c7a972';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(COIN_CIRCLE[0], COIN_CIRCLE[1], radius1-ctx.lineWidth/2, 0, Math.PI*2);
		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#b95';
		ctx.stroke();

		ctx.fillStyle = '#ddd';
		ctx.beginPath();
		ctx.arc(COIN_CIRCLE[0], COIN_CIRCLE[1], radius2, 0, Math.PI*2);
		ctx.fill();

		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#555';
		ctx.stroke();

		ctx.font = radius2*1.6 + "px georgia";
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('€', COIN_CIRCLE[0], COIN_CIRCLE[1]);

		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#555';
		ctx.strokeText('€', COIN_CIRCLE[0], COIN_CIRCLE[1]);
	}
	return [c1, c2];
}

function create_coin_particle () {

	var c = document.createElement('canvas');
	var ctx = c.getContext('2d');
	c.height = c.width = min_length * .1;

	ctx.font = c.width + "px georgia";
	ctx.fillStyle = '#ff9';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('€', c.width*.5, c.width*.5);

	return c;
}

function create_back_bt () {

	var c = document.createElement('canvas');
	var ctx = c.getContext('2d');
	c.width = W;
	c.height = H;

	ctx.fillStyle = '#d11';
	ctx.beginPath();
	ctx.arc(BT_BACK_CIRCLE[0], BT_BACK_CIRCLE[1], BT_BACK_CIRCLE[2], 0, Math.PI*2);
	ctx.fill();

	ctx.lineWidth = BT_BACK_CIRCLE[2] * .1;
	ctx.strokeStyle = '#000';
	ctx.stroke();

	ctx.font = (BT_BACK_CIRCLE[2]*1.5) + "px Arial";
	ctx.fillStyle = '#fff';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('X', BT_BACK_CIRCLE[0], BT_BACK_CIRCLE[1]);

	return c;
}