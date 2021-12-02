function load_notices(data) {
	let c = 0;
	let c2 = 0;
	for( i of data){
		c++;
		c2++;
		let fecha = i.fecha;
		let d = new Date(fecha)
		let anio = d.getFullYear();
		let mes = d.getMonth();
		let dia = d.getDate();

		let srcImage = i.src;
		let altImage = i.alt;
		let notice_title = i.noticia;
		let dateFinal =  ((mes+1)+"/"+dia+"/"+anio);
		let num_coment = i.coments;

		let plantilla=`
		<div class="col-md-4 col-sm-6 col-xs-12 notice">
			<div class="probootstrap-hentry mb30">
				<p>
					<a href="#"><img src="${srcImage}" alt="${altImage}" class="img-responsive">
					</a>
				</p>
				<h3 class="mt0">
					<a href="#" class="hover-reverse">${notice_title}</a>
				</h3>
				<p class="text-mute">${dateFinal} • <i class="icon-bubble"></i>${num_coment}</p>
			</div>
		</div>
		`

		if(c == 3){
			c = 1;
			plantilla = `<div class="clearfix visible-sm-block"></div>` + plantilla;
		}else if (c2 == 4){
			c ++;
			plantilla = `<div class="clearfix visible-lg-block visible-md-block"></div>` + plantilla;
		}

		//Agregar noticia al feed.
		document.getElementById('cambio').innerHTML+= plantilla;
	}
}

const peticion = () => {
	fetch("data/noticias.json")
		.then(response => response.json())
		.then(data => {
			load_notices(data);
		})
		.catch(console.error);
}

const search_notices = () => {
	let search_bar = document.querySelector('input[type="search"]');
	let search_key = search_bar.value.toLowerCase();
	let cards = document.getElementsByClassName("notice");

	Array.from(cards).forEach(card => {
		if (search_key === "")
			card.classList.remove("d-none");
		else {
			let notice_title = card.querySelector("a.hover-reverse");
			let match_title = notice_title.innerText.toLowerCase().includes(search_key);
			if (!match_title)
				card.classList.add("d-none");
		}
	})
}

peticion();
let search_button = document.querySelector('button');
search_button.addEventListener("click", search_notices);

