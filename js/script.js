let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 



init();

function init(){
    var audio = document.getElementById('audio');
    var playlist = document.getElementById('playlist');
    var tracks = playlist.getElementsByTagName('a');
    audio.volume = 0.10;
    audio.play();
    
    for(var track in tracks) {
      var link = tracks[track];
      if(typeof link === "function" || typeof link === "number") continue;
      
			link.addEventListener('click', function(e) {
      	e.preventDefault();
        var song = this.getAttribute('href');
       	run(song, audio, this);
      });
    }
    
    audio.addEventListener('ended',function(e) {
        for(var track in tracks) {
					var link = tracks[track];
          var nextTrack = parseInt(track) + 1;
        	if(typeof link === "function" || typeof link === "number") continue;
          if(!this.src) this.src = tracks[0];
          if(track == (tracks.length - 1)) nextTrack = 0;
                                	console.log(nextTrack);
        	if(link.getAttribute('href') === this.src) {
          	var nextLink = tracks[nextTrack];
          	run(nextLink.getAttribute('href'), audio, nextLink);
            break;
          }
        }
    });
}

function run(song, audio, link){
				var parent = link.parentElement;

				//quitar el active de todos los elementos de la lista
				var items = parent.parentElement.getElementsByTagName('li');
        for(var item in items) {
					if(items[item].classList)
        		items[item].classList.remove("active");
        }
        
        //agregar active a este elemento
        parent.classList.add("active");
        
        //tocar la cancion
        audio.src = song;
        audio.load();
        audio.play();
}

//efecto lluvia
function rain(el=document.body, params) {
	if (!el){
		console.error('Must have element to populate the rain!');
		return;
	}
	const defaultProperties = {
		colors: 'default',
		drop: window.innerHeight,
		fadeout: true,
		raindrops: 400,
		speed: 2000,
		splashes: true,
		spread: window.innerWidth
	};

	// properties passed in from user onto the defaults
	const c = Object.assign(defaultProperties, params);
	
	const randInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	let hh = window.innerHeight;
	let ww = window.innerWidth;
	let raindrops = '';
	let rainsplashes = '';
	if (!c.flakes || Number.isNaN(c.flakes * 1)){
		c.flakes = 250;
	}
	for (let i = 0; i < c.flakes; i++) {
		let dur = c.speed;
		raindrops += `<g transform="translate(${randInt(0,ww)} -26) scale(1.${randInt(0, 3)})">
		<rect id="snowflake${i}" fill="rgba(240, 240, 255, ${randInt(1,10)/10})" x="0" y="0" rx="1" height="${randInt(4,10)}" width="${randInt(3,5)/10}" filter="url(#blur${randInt(1, 2)})">
		</rect>
	</g>
	<animateMotion xlink:href="#snowflake${i}" dur="${dur}ms" begin="-${randInt(0,100)/10}s" repeatCount="indefinite">
		<mpath xlink:href="#motionPath${randInt(1, 2)}" />
	</animateMotion>`;
		// animated circle splashes
		if (c.splashes) {
			if (randInt(0,1) == 1) {
			let randTiming = -randInt(0, 10) / 10;
			rainsplashes += `<ellipse stroke="rgba(240, 240, 255, ${randInt(1,4)/10})" stroke-width="1" fill="none" cx="${randInt(0, ww)}" cy="${randInt(hh, hh/1.2)}" rx="5" ry="3">
			<animate
				 attributeType="XML" attributeName="stroke-width"
				 dur="1s" values="0; 0.7; 0"
				 repeatCount="indefinite" begin="${randTiming}" />
			<animate
				 attributeType="XML" attributeName="rx"
				 dur="${c.speed / 2}ms" values="0; ${randInt(5,9)}"
				 repeatCount="indefinite" additive="sum" begin="${randTiming}" />
			<animate
				 attributeType="XML" attributeName="ry"
				 dur="${c.speed / 2}ms" values="0; ${randInt(1,2)}"
				 repeatCount="indefinite" additive="sum" begin="${randTiming}" />
				 <!--
			<animate
				 attributeType="XML" attributeName="cx"
				 dur="${c.speed / 2}ms" values="${randInt(0,ww)}; ${randInt(0,ww)}"
				 repeatCount="indefinite" additive="sum" begin="${randTiming}" />
				 -->
			</ellipse>`;
			}
		}
	}
	
	let svg = `<svg id="snowverlay" viewbox="0 0 ${ww} ${hh}" height="${hh}" width="${ww}" preserveAspectRatio="none" style="z-index:99999; user-select:none; pointer-events:none; top:50%;
	left:50%; position:fixed; transform:translate(-50%,-50%)">
	<filter id="blur1" x="-100%" y="-100%" width="300%" height="300%">
		<feGaussianBlur in="SourceGraphic" stdDeviation="1" />
	</filter>
	<filter id="blur2" x="-100%" y="-100%" width="300%" height="300%">
		<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
	</filter>
	<path id="motionPath1" fill="none" stroke="none" d="M 0 -${hh * 0.1} V ${hh * 1.1}" />
	<path id="motionPath2" fill="none" stroke="none" d="M 0 -${hh * 0.1} V ${hh * 1.1}" />
	${raindrops}
	${rainsplashes}
</svg>`;
	//Make it a node to avoid the dangerous "document.body.innerHTML = svg"
	let wrapper = document.createElement("div");
	wrapper.innerHTML = svg;
	let doc = wrapper.firstChild;
	const element = document.getElementById("snowverlay");
	element?.remove();
	document.body.appendChild(doc);
}

window.onload = rain(document.body);
window.onresize = rain;