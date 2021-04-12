/*------------------------
Menu Hamburguer
------------------------*/
$('.menu__mobile__btn').click(function(){
    $('header').toggleClass('active');
    $('.menu').toggleClass('active');
});


/*------------------------
Home Carousel
------------------------*/
$('.banner__carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
});