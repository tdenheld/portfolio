function scroll() {
    const section = $('.js-scroll');
    const richTxt = $('.js-scroll-rt p');

    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            duration: 99999,
        },
    });

    function scrollTrig(obj) {
        var hook = 0.94;
        var customHook = $(obj).attr('data-hook');
        if (customHook != null) {
            hook = customHook;
        }
        var scrll = new ScrollMagic.Scene({
                triggerElement: obj,
            })
            .triggerHook(hook)
            .offset(0)
            .on('start', function () {
                $('.js-tr', obj).toggleClass('is-active');
                if ($(obj).hasClass('js-tr')) {
                    $(obj).toggleClass('is-active');
                }
            })
            .addTo(controller);
    }

    if (richTxt[0]) {
        richTxt.each(function () {
            $(this).addClass('js-tr tr-fi-up tr-1500');
            scrollTrig(this);
        });
    }

    if (section[0]) {
        section.each(function () {
            scrollTrig(this);
        });
    }
}
