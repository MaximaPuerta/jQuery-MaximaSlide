(function($){
	"use strict";
	$.fn.MaximaSlide = function(opciones){
		$("body").addClass('body');
		var conf = $.extend({
			tiempoPaso: 3000, /* Tiempo entre cambio de imágenes */
			accesibleTeclado: true, /* Indicar si quieres tener la posibilidad de pasar la imagen desde las flechas del teclado */
			mensajes: true, /* Habilitar o inhabilitar los mensajes o captions en inglés */
			parallax: false, /* Activar efecto Parallax en las imágenes */
			mostrarControles: true, /* Mostrar los controles, debe estar especificado el HTML correspondiente, en caso contrario se desactivará automáticamente. */
		},opciones),
		esto = $(this),
		ven = $(window),
		pos = 0,
		timer = conf.tiempoPaso,
		clock = setInterval(mover,timer),
		master = $(".body"),
		controles = $(esto).find('.controles'),
		btnAnterior = $(controles).find('button.boton-anterior'),
		btnSiguiente = $(controles).find("button.boton-siguiente"),
		imgContainer = $(esto).find(".slide-w .img-container"),
		imgItems = $(imgContainer).find(".img-item"),
		imgCaption = $(imgItems).find(".mensaje"),
		check = function(el){
			return (el.length == 0)?false:true;
		};

		esto.addClass('MaximaSlide'); /* Comenta ésta linea si deseas */

		//imgItems.not(".mensaje").css('opacity', '0');

		$.each(imgItems,function(i,e){
			$(e).css({
				"left": pos+"px",
				"width":ven.width(),
				"height":ven.height()
			});
			pos += ven.width();
		});

		imgContainer.css({
			"width": (imgItems.width() * imgItems.lenght),
			"height": ven.height()
		});

		ven.resize(function(e) {
			pos = 0;
			$.each(imgItems,function(i,e){
				$(e).css({
					"left": pos,
					"width":"100%",
					"height":"100%"
				});
				pos += ven.width();
			});

			if (conf.mostrarResolucionPantalla){
				$(esto).find(".resolucion").text("> "+ven.width()+"x"+ven.height()+" <");
			}

			imgContainer.css({
				"width": ven.width(),
				"height": ven.height()
			});;
		});

		btnAnterior.on('click', function(e) {
			clearInterval(clock);
			moverReversa();
			clock = setInterval(mover,timer);
		});
		btnSiguiente.on('click', function(e) {
			clearInterval(clock);
			mover();
			clock = setInterval(mover,timer);
		});

		var posE = 0;
		var countMov = 1;
		function mover(){
			if (countMov < imgItems.length) {
				countMov++;
				posE -= ven.width();
				imgContainer.animate({
					left: posE
				}, 1000,"swing");
			}else{
				countMov = 1;
				posE = 0;
				imgContainer.animate({
					opacity: 0
				}, 400,"swing").animate({
					left: 0
				},1).animate({
					opacity:1
				},400,"swing");
			}
		}
		function moverReversa(){
			if (countMov > 1) {
				countMov--;
				posE += ven.width();
				imgContainer.animate({
					left: posE
				}, 1000,"swing");
			}else{
				countMov = imgItems.length;
				var posF = imgItems.width() * imgItems.length;
				posE = (posF*(-1))+ven.width();
				imgContainer.animate({
					opacity: 0
				}, 400,"swing").animate({
					left: posE
				},1).animate({
					opacity:1
				},400,"swing");
			}
		}

		return this.each(function(){
			if (!conf.mensajes){
				imgCaption.remove();
			}
			if (conf.mostrarControles){
				if (check(controles) && check(btnAnterior) && check(btnSiguiente)){
					controles.css({
						"display":"block"
					});
					//console.log("Controles activos");
				}else{
					conf.mostrarControles = false;
					console.warn("No se han escrito los controles en HTML\nmostrarControles es ahora",conf.mostrarControles);
				}
			}
			if (!conf.sinParar){

			}
			if (conf.accesibleTeclado){
				master.on('keydown', function(e) {
					console.log(e.which,e.keyCode);
					if (e.which == 37 || e.keyCode == 37 || e.which == 38 || e.keyCode == 38) {
						if ($(esto).esVisible(true)) {
							btnAnterior.trigger("click");
							return false;
						}
					} else if(e.which == 39 || e.keyCode == 39 || e.which == 40 || e.keyCode == 40){
						if ($(esto).esVisible(true)) {
							btnSiguiente.trigger("click");
							return false;
						}
					}
				});
			}
			if (conf.parallax){
				imgItems.css('background-attachment', 'fixed');
			}
			if (conf.mostrarResolucionPantalla){
				$(esto).append('<div class="resolucion"></div>');
				$(esto).find(".resolucion").text("> "+ven.width()+"x"+ven.height()+" <");
			}
			if (conf.tiempoPaso > 12000) {
				console.info("Mas de 12 segundos para cambiar a la siguiente imagen >","\ntiempoPaso:",(conf.tiempoPaso / 1000)+"seg");
			}
			if (conf.modoPruebas) {
				console.warn("MODO DE PRUEBA");
				console.log("Ahora tienes la posibilidad de ver cada una de las acciones del Slider de forma más detallada");
			}
		});
	}
}(jQuery));
