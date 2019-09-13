function cursor() {
    function follow(obj, x, y, t) {
        TweenMax.to(obj, t, {
            x: x,
            y: y,
            ease: Power4.easeOut
        });
    }

    function fade(obj, a, b, t) {
        TweenMax.fromTo(obj, t, {
            autoAlpha: a
        }, {
            autoAlpha: b,
            ease: Power4.easeOut
        });
    }

    function tracking(obj, t) {
        if ($(obj)[0]) {
            $(window).mouseenter((e) => {
                fade(obj, 0, 1, 0.1);
                follow(obj, e.clientX, e.clientY, 0);
            });
            $(window).mouseleave(() => {
                fade(obj, 1, 0, 0.7);
            })
            $(window).mousemove((e) => {
                requestAnimationFrame(() => {
                    follow(obj, e.clientX, e.clientY, t);
                });
            });
        }
    }

    // hover states
    // ------------------------------------------------
    function sizing(obj, size) {
        TweenMax.to(obj, 0.5, {
            width: size,
            height: size,
            top: -size / 2,
            left: -size / 2,
            ease: Power4.easeOut
        });
    }

    function hover(obj, size) {
        const initSize = $(obj).width();
        $('a, button, .js-settings-close').mouseover(() => {
            sizing(obj, size);
        });
        $('a, button, .js-settings-close').mouseout(() => {
            sizing(obj, initSize);
        });
    }

    // image hover
    // ------------------------------------------------
    function followingImgHover(obj) {
        $('.js-tile').mouseover(function () {
            $(obj).css({
                'background-image': 'url(' + $(this).attr('data-img') + ')'
            });
        });
        $('.js-tile').mouseout(function () {
            $(obj).css({
                'background-image': 'none'
            });
        });
    }

    // execute functions
    tracking('#js-cursor', 0.7);
    hover('#js-cursor', 380);
    // followingImgHover('#js-cursor');
}
cursor();