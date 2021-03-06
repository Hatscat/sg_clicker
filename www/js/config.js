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
        {clicks:20,multiplier:2},
        {clicks:50,multiplier:3},
        {clicks:90,multiplier:4},
        {clicks:140,multiplier:5},
        {clicks:200,multiplier:6},
        {clicks:400,multiplier:10}
    ];
    savings_value_max = 100;
    SAVINGS = [
        {
            name:'LDD',
            cost:100,
            fric_per_second:10,            
            nb_total:0,
            description:"Une épargne d'écolo",
            link:"https://particuliers.societegenerale.fr/epargner/par_type_de_placements/livrets_epargne/livret_developpement_durable.html"
        },
        {
            name:'Livret A',
            cost:150,
            fric_per_second:15,            
            total_fric_per_second:0,
            nb_total:0,
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
            description:"Le logement c'est important",
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
            description:"Le premier, le meilleur",
            gotIt:false,
            varUsed: "fric",
            valueToPass: 1,
            reward: 10 //in percent of fric per second
        },
        {
            name:'Wake and Bank',
            description:"Aquiert ta première épargne",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:0,
            valueToPass:1,
            reward: 10
        },    
        {
            name:'Clic noob',
            description:"Clique 100 fois",
            gotIt:false,
            varUsed: "total_click",
            valueToPass:100,
            reward: 10
        },
        {
            name:'Big clic',
            description:"Clique 1000 fois",
            gotIt:false,
            varUsed: "total_click",
            valueToPass:1000,
            reward: 10
        },
        {
            name:'Clic clic',
            description:"Clique 10000 fois",
            gotIt:false,
            varUsed: "total_click",
            valueToPass:10000,
            reward: 10
        },
        {
            name:'Plus de doigt',
            description:"Clique 1 000 000 fois",
            gotIt:false,
            varUsed: "total_click",
            valueToPass:1000000,
            reward: 20,
        },
        {
            name:'Plus de souris',
            description:"Clique 1 000 000 000 fois",
            gotIt:false,
            varUsed: "total_click",
            valueToPass:1000000000,
            reward: 25
        },
        {
            name:'Cheat Clic',
            description:"Tu utlise un auto clicker c'est ça ?",
            gotIt:false,
            varUsed: "total_click",
            valueToPass:1000000000000,
            reward: 30
        },
        {
            name:"C'est un début",
            description:"Avoir 1000 euros",
            gotIt:false,
            varUsed: "fric",
            valueToPass:1000,
            reward: 10
        },
        {
            name:"Un bon paquet",
            description:"Avoir 10 000 euros",
            gotIt:false,
            varUsed: "fric",
            valueToPass:10000,
            reward: 10
        },
        {
            name:"Une petite fortune",
            description:"Avoir 100 000 euros",
            gotIt:false,
            varUsed: "fric",
            valueToPass:100000,
            reward: 15
        },        
        {
            name:"Millionaire",
            description:"Avoir 1 000 000 euros",
            gotIt:false,
            varUsed: "fric",
            valueToPass:1000000,
            reward: 15,
        },
        {
            name:"Milliardaire",
            description:"Avoir 1 000 000 000 euros",
            gotIt:false,
            varUsed: "fric",
            valueToPass:1000000000,
            reward: 25,
        },
        {
            name:"Trilionaire",
            description:"Avoir un trilliard euros",
            gotIt:false,
            varUsed: "fric",
            valueToPass:10000000000000000000,
            reward: 30
        },
        {
            name:"A demi",
            description:"Remplir son Livret A à 50%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:1,
            valueToPass:30,
            reward: 5,
        },  
        {
            name:"A plein temps",
            description:"Remplir son Livret A à 100%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:1,
            valueToPass:100,
            reward: 20,
        },   
        {
            name:"Une belle foret",
            description:"Remplir son LDD à 50%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:0,
            valueToPass:30,
            reward: 5,
        },
        {
            name:"Gaia power",
            description:"Remplir son LDD à 100%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:0,
            valueToPass:100,
            reward: 20,
        },
        {
            name:"LEP-reuve epargne",
            description:"Remplir son LEP à 50%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:2,
            valueToPass:50,
            reward: 30
        },
        {
            name:"Full LEP",
            description:"Remplir son LEP à 100%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:2,
            valueToPass:100,
            reward: 20
        },
        {
            name:"Jeune et prudent",
            description:"Remplir son Livret Jeune à 50%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:3,
            valueToPass:50,
            reward: 30
        },
        {
            name:"Jeune et malin",
            description:"Remplir son Livret Jeune à 100%",
            varUsed: "SAVINGS",
            saving:3,
            valueToPass:100,
            reward: 30
        },
        {
            name:"Epargne à la PEL",
            description:"Remplir son PEL à 50%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:4,
            valueToPass:50,
            reward: 20
        },
        {
            name:"PEL de chantier",
            description:"Remplir son PEL à 100%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:4,
            valueToPass:100,
            reward: 30
        },
        {
            name:"CEL et poivre",
            description:"Remplir son Livret Jeune à 50%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:5,
            valueToPass:50,
            reward: 20
        },
        {
            name:"Passe moi le CEL",
            description:"Remplir son Livret Jeune à 100%",
            gotIt:false,
            varUsed: "SAVINGS",
            saving:5,
            valueToPass:100,
            reward: 50
        },
    ];

    img_src_size = 256; //!\\
    bank_img = new Image();
    bank_img.src = 'img/bank-icon.png';
    trophy_img = new Image();
    trophy_img.src = 'img/trophy-icon.png';
    podium_img = new Image();
    podium_img.src = 'img/podium-icon.png';
    fb_img = new Image();
    fb_img.src = 'img/fb-icon.png';

    frame = 0;
	fric = 0;
	fric_per_second = 0;
    fric_per_click = 1;
    fric_refresh_time = 100;
    achievements_refresh_time = 2000;
    click_multiplier = 0;
    click_serie = 0;
    total_click = 0;
    last_time_clicked = 0;
    last_time_fric_update = 0;
    last_time_achievemnts_update = 0;
    time_combo = 500;
    is_new_saving = false;
    is_new_achievement = false;
    can_refresh_header = true;
	current_scene = SC_GAME;
	time = 0; //in ms
	delta_time = 1;
	old_timestamp = 0;
	vertical_scroll = 0;
    particles_max_nb = 16;
    particles = [];
    fric_fx = [];
    shadows_max_nb = 32;
	set_size();
}

function set_size () {

	canvas.width = main_buffer.width = W = window.innerWidth;
	canvas.height = main_buffer.height = H = window.innerHeight;

	min_length = W < H ?  W : H;
    gravity = -min_length *.0015;
    fric_fx_speed_min = min_length *.001;
    particle_speed_min = min_length *.01;
    particles_min_size = min_length *.03;
    particles_max_size = min_length *.07;
	BT_SIZE = .2 * min_length;
    BT_SHIFT = .2 * BT_SIZE;
	BT_ACHIEVEMENTS = [BT_SHIFT, H-BT_SIZE-BT_SHIFT, BT_SIZE, BT_SIZE];
    BT_BANK = [W-BT_SIZE-BT_SHIFT, H-BT_SIZE-BT_SHIFT, BT_SIZE, BT_SIZE];
    BT_FB = [BT_SHIFT*.5, BT_SHIFT, BT_SIZE*.6, BT_SIZE*.6];
	BT_PODIUM = [BT_SIZE*.6+BT_SHIFT*1.5, BT_SHIFT, BT_SIZE*.6, BT_SIZE*.6];

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
    HEADER_H = FRIC_FONT_SIZE*2;
	buff_ctx.textAlign = 'center';
	buff_ctx.textBaseline = 'top';
    buff_ctx.shadowColor = "#f33";
	fric_font = FRIC_FONT_SIZE + "px impact";
	fric_grad = buff_ctx.createLinearGradient(0, 0, 0, FRIC_FONT_SIZE);
	fric_grad.addColorStop(0, '#333');
	fric_grad.addColorStop(.5, '#fff');
	fric_grad.addColorStop(1, '#333');

	text_margin_h = FRIC_FONT_SIZE * .1;

	coin_sprites = create_coin_sprites();
	back_bt_sprite = create_back_bt();
    info_bt_sprite = create_info_bt();
    achievement_star_sprites = create_achievements();
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
		ctx.strokeStyle = '#ca7'//'#c7a972';
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(COIN_CIRCLE[0], COIN_CIRCLE[1], radius1-ctx.lineWidth/2, 0, Math.PI*2);
		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#a84'//'#a84';
		ctx.stroke();

		ctx.fillStyle = '#ddd';
		ctx.beginPath();
		ctx.arc(COIN_CIRCLE[0], COIN_CIRCLE[1], radius2, 0, Math.PI*2);
		ctx.fill();

		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#333';
		ctx.stroke();

		ctx.font = radius2*1.6 + "px georgia";
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('€', COIN_CIRCLE[0], COIN_CIRCLE[1]);

		ctx.lineWidth = size * .01;
		ctx.strokeStyle = '#333';
		ctx.strokeText('€', COIN_CIRCLE[0], COIN_CIRCLE[1]);
	}
	return [c1, c2];
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

function create_info_bt () {

	var c = document.createElement('canvas');
	var ctx = c.getContext('2d');
	c.width = BT_INFO[2];
	c.height = BT_INFO[3];

	ctx.fillStyle = '#24d';
	ctx.fillRect(0, 0, BT_INFO[2], BT_INFO[3]);
	ctx.strokeStyle = '#000';
	ctx.lineWidth = BT_INFO[2] * .1;
	ctx.strokeRect(0, 0, BT_INFO[2], BT_INFO[3]);
	ctx.font = (BT_INFO[2]*.5) + "px georgia";
	ctx.fillStyle = '#fff';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText('i', BT_INFO[2]*.5, BT_INFO[3]*.5);

	return c;
}

function create_achievements () {

    var c1 = document.createElement('canvas');
    var c2 = document.createElement('canvas');
    var ctx1 = c1.getContext('2d');
    var ctx2 = c2.getContext('2d');
    c1.width = c2.width = BT_INFO[2];
    c1.height = c2.height = BT_INFO[2];
    var size = BT_INFO[2] * .5;

    draw_star(ctx1, '#666');
    draw_star(ctx2, '#cb0');

    function draw_star (ctx, color) {

        var d = 0; // Math.PI*.2;
        var x = size * 1.5;
        var y = size * 1.25;

        ctx.strokeStyle = color;
        ctx.lineWidth = BT_INFO[2] * .1;
        ctx.beginPath();
        ctx.moveTo(x, y);

        for (var i = 4; i--;) {
            ctx.lineTo(x+=Math.cos(d+=Math.PI*.8)*size, y-=Math.sin(d)*size);
        }
        
        ctx.closePath();
        ctx.stroke();
    }

    return [c1, c2];
}

