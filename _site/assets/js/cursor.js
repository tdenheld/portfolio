function cursor() {
    if (!Modernizr.touchevents) {
        function follow(obj, x, y, t) {
            if ($(obj)[0]) {
                TweenMax.to(obj, t, {
                    x: x,
                    y: y,
                    ease: Power4.easeOut
                });
            }
        }

        function fade(obj, a, b, t) {
            if ($(obj)[0]) {
                TweenMax.fromTo(obj, t, {
                    autoAlpha: a
                }, {
                    autoAlpha: b,
                    ease: Power4.easeOut
                });
            }
        }

        function filter(obj, a, b, t) {
            if ($(obj)[0]) {
                TweenMax.fromTo(obj, t, {
                    filter: a
                }, {
                    filter: b,
                    ease: Power4.easeOut
                });
            }
        }

        function tracking(obj, t, fading) {
            if ($(obj)[0]) {
                let init = false;
                
                $(document).mousemove((e) => {
                    requestAnimationFrame(() => {
                        follow(obj, e.clientX, e.clientY, t);
                    });
                });

                $(window).mouseenter((e) => {
                    if (!init) {
                        if (fading) {
                            fade(obj, 0, 1, 0.1);
                        }
                        follow(obj, e.clientX, e.clientY, 0);
                        init = true;
                    }
                });
                
                $(document).mouseleave(() => {
                    if (fading) {
                        fade(obj, 1, 0, 0.7);
                    }
                    init = false;
                });
            }
        }

        // hover states
        // ------------------------------------------------
        function sizing(obj, size) {
            if ($(obj)[0]) {
                TweenMax.to(obj, 0.5, {
                    width: size,
                    height: size,
                    top: -size / 2,
                    left: -size / 2,
                    ease: Power4.easeOut
                });
            }
        }

        function hover(obj, size) {
            if ($(obj)[0]) {
                const initSize = $(obj).width();
                const hover = 'a, button, .js-settings-close, .js-img-hover u';

                $(hover).mouseenter(() => {
                    sizing(obj, size);
                });
                $(hover).mouseleave(() => {
                    sizing(obj, initSize);
                });
            }
        }

        // image hover
        // ------------------------------------------------
        function followingImgHover(trig, obj, img, flash) {
            if ($(obj)[0]) {
                $(trig).mouseenter(function () {
                    fade(obj, 0, 1, 1);
                    fade(flash, 1, 0, 3);
                    
                    const currentImg = $(this).attr('data-img');
                    $(img).removeClass('is-active');
                    $(img).each(function(){
                        if (currentImg === $(this).attr('src')) {
                            $(this).addClass('is-active');
                        };
                    });
                });
                $(trig).mouseleave(function () {
                    fade(obj, 1, 0, 0.5);
                });
            }
        }

        // execute functions
        tracking('#js-cursor', 0.7, true);
        hover('#js-cursor', 80);

        tracking('#js-cursor-tile', 1.7, false);
        followingImgHover('.js-tile', '#js-cursor-tile', '.js-cursor-img', '#js-cursor-flash');
    }
}
cursor();