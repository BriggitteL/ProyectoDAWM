

let plantilla=`
<div class="col-md-4 col-sm-6 col-xs-12">
    <div class="probootstrap-hentry mb30">
        <p><a href="#"><img src="IMAGEN" alt="ALT" class="img-responsive"></a></p>
        <h3 class="mt0"><a href="#" class="hover-reverse">NOTICIA</a></h3>
        <p class="text-mute">FECHA • <i class="icon-bubble"></i>COMENTARIO</p>
    </div>
`

const peticion = () => {
    fetch("data/noticias.json")
    .then(response => response.json())
    .then(data => {
        let c = 0;   
        let c2 = 0; 
        for( i of data){
            c++;
            c2++;
            let section = document.getElementsByName("rownoticias");
            
            let fecha = i.fecha;
            let d = new Date(fecha)
            let anio = d.getFullYear();
            let mes = d.getMonth();
            let dia = d.getDate();

            let fechaf =  ((mes+1)+"/"+dia+"/"+anio);
            let noticia = i.noticia;
            let src = i.src;
            let alt = i.alt;
            let come = i.coments;
            // console.log(c2)
            if(c == 3){
                c = 1;
                // console.log(c2)
                 plantilla = `
                <div class="clearfix visible-sm-block"></div>

                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="probootstrap-hentry mb30">
                        <p><a href="#"><img src="IMAGEN" alt="ALT" class="img-responsive"></a></p>
                        <h3 class="mt0"><a href="#" class="hover-reverse">NOTICIA</a></h3>
                        <p class="text-mute">FECHA • <i class="icon-bubble"></i>COMENTARIO</p>
                    </div>
                 </div>
                `

            }else if (c2 == 4){
                c ++;
                
                plantilla = `
                <div class="clearfix visible-lg-block visible-md-block"></div>
                
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="probootstrap-hentry mb30">
                        <p><a href="#"><img src="IMAGEN" alt="ALT" class="img-responsive"></a></p>
                        <h3 class="mt0"><a href="#" class="hover-reverse">NOTICIA</a></h3>
                        <p class="text-mute">FECHA • <i class="icon-bubble"></i>COMENTARIO</p>
                    </div>
                </div>
            `

            }else{
                plantilla=`
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="probootstrap-hentry mb30">
                        <p><a href="#"><img src="IMAGEN" alt="ALT" class="img-responsive"></a></p>
                        <h3 class="mt0"><a href="#" class="hover-reverse">NOTICIA</a></h3>
                        <p class="text-mute">FECHA • <i class="icon-bubble"></i>COMENTARIO</p>
                    </div>
                `
            }  
            plantilla = plantilla.replace("FECHA", fechaf);
            plantilla = plantilla.replace("NOTICIA", noticia);
            plantilla = plantilla.replace("IMAGEN", src);
            plantilla = plantilla.replace("ALT", alt);
            plantilla = plantilla.replace("COMENTARIO", come);
            console.log(plantilla);
            document.getElementById('cambio').innerHTML+= plantilla;
            
        }

    })
    .catch(console.error);


}
peticion()