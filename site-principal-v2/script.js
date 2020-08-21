jQuery(function () {
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 80){
            $("nav#menu").css('background-color', 'black');
            if (jQuery(this).scrollTop() > 120){
                $("nav#menu ul li, nav#menu-black ul li, label.logotipo a, .botaocheck").css('line-height', '60px');

                $("nav#menu ul li a, nav#menu-black ul li a").css('font-size', '11px');

                $("nav#menu, nav#menu-black").css('height', '60px');

                $("#logo").css('width', '40px');
                $("#logo").css('height', '40px');
                $("#logo").css('margin-top', '9px');
                $("label.logotipo a").css('font-size', '15px');

                $("nav#menu ul, nav#menu-black ul").css('top', '60px');
            }
        }

        else {
            $("nav#menu").css('background-color', 'rgba(0,0,0, 0.0)');

            $("nav#menu, nav#menu-black").css('height', '80px');

            $("nav#menu ul li, label.logotipo a, .botaocheck, nav#menu-black ul li").css('line-height', '80px');

            $("nav#menu ul li a, nav#menu-black ul li a").css('font-size', '13px');

            $("#logo").css('width', '50px');
            $("#logo").css('height', '50px');
            $("#logo").css('margin-top', '15px');
            
            $("label.logotipo a").css('font-size', '20px');
            $("nav#menu ul, nav#menu-black ul").css('top', '80px');
        }
    });

    // Slick Carrossel
    $(".banner-slick").slick({
        dots: false,
        arrows: false
    });
});