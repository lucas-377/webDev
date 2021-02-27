var carrosselDinamico = $('.banner--dinamico');
var autoPlayTimer = 3000;

$(carrosselDinamico).slick({
    slidesToShow: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: autoPlayTimer
}); // $('.slick-carousel')

// Efeito Rewind
carrosselDinamico.on('afterChange', function(event, slick, currentSlide, nextSlide) {
    if (currentSlide === slick.slideCount - 1) {
      jumpBack(autoPlayTimer);
    }
});

// Funcao para retornar ao primeiro slide
function jumpBack(autoPlayTimer) {
    setTimeout(function() {
      carrosselDinamico.slick("slickGoTo", 0);
    },autoPlayTimer);
}