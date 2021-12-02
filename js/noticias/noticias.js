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
		<div class="col-md-4 col-sm-6 col-xs-12">
			<div class="probootstrap-hentry mb30">
				<p><a href="#"><img src="${srcImage}" alt="${altImage}" class="img-responsive"></a></p>
				<h3 class="mt0"><a href="#" class="hover-reverse">${notice_title}</a></h3>
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
peticion()

//Corregir.
const search_notices = (search_bar) => {
	let search_key = search_bar.value.toLowerCase();
	let cards = document.getElementsByClassName("col");

	Array.from(cards).forEach(card => {
		if (search_key === "") {
			card.classList.remove("d-none");
		} else {
			let title = card.querySelector(".card-body > h5.card-title");
			let description = card.querySelector(".card-body > p.card-text");

			let match_title = title.innerText.toLowerCase().includes(search_key);
			let match_description = description.innerText.toLowerCase().includes(search_key);

			if (!match_title && !match_description) {
				card.classList.add("d-none");
			}
		}
	})
}

let search_bar = document.querySelector('input[type="search"]');
search_bar.addEventListener("keydown", search_notices(search_bar));



//Liz guia
const buscador = () => {
	let texto = document.querySelector('input[type="search"]')


	texto.addEventListener('keyup', () => {
		let texto = document.querySelector('input').value

		let elementos = document.getElementsByClassName('col-md-4 col-sm-6 col-xs-12')
		// console.log(elementos);
		if(texto.length > 0){

			for (let e of elementos){
				//  console.log(e.innerText);
				//  console.log(texto);
				if(e.innerText.includes(texto)){
					console.log("hola")
					e.classList.add('d-inline')
				} else {
					e.classList.add('d-none')
				}
			}
		} else {
			for(let elemento of elementos){
				elemento.classList.remove('d-none')
				elemento.classList.remove('d-inline')
			}
		}
	})
}

