function scroll() {
    const section = $('.js-scroll');
    const richTxt = $('.js-scroll-rt p');

    const controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            duration: 99999,
        },
    });

    function scrollTrig(obj) {
        let hook = 0.92;
        const customHook = $(obj).attr('data-hook');
        if (customHook != null) {
            hook = customHook;
        }
        const scrll = new ScrollMagic.Scene({
                triggerElement: obj,
            })
            .triggerHook(hook)
            .offset(0)
            .on('start', function () {
                $('.js-tr', obj).addClass('is-active');
                if ($(obj).hasClass('js-tr')) {
                    $(obj).addClass('is-active');
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

// const revealOnScroll = () => {
//     const hook = 0.94;
//     const node = '.js-scroll';
//     if (!exists(node)) return;

//     const reveal = () => ß(node).map((el) => {
//         const nodePosition = el.getBoundingClientRect();
//         const inViewport = !(nodePosition.top > innerHeight * hook);
        
//         if (inViewport) {
//             ß('.js-tr', el).map((ae) => ae.classList.add('is-active'));
//             if (el.classList.contains('js-tr')) el.classList.add('is-active');
//         }
//     });
//     reveal();

//     window.addEventListener('scroll', () => requestAnimationFrame(reveal));
//     window.addEventListener('resize', () => requestAnimationFrame(reveal));
// }
