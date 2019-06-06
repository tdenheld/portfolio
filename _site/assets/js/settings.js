function settings() {
    const obj = $('.js-settings');
    const modal = $('.js-settings-modal');
    const closeModal = $('.js-settings-close, .js-settings-submit');
    const closeBtn = $('.js-settings-close');
    const stag = $('.js-settings-stag');

    if (obj[0]) {

        // body scroll lock
        // ------------------------------
        const body = {
            noTouch: $('.no-touch'),
            main: $('.js-main'),
            scrollPos: window.scrollY,
            lock() {
                if (this.noTouch[0]) {
                    this.scrollPos = window.scrollY;
                    $('body').css({
                        'position': 'fixed',
                        'top': -this.scrollPos,
                        'overflow-y': 'hidden',
                        'width': '100%',
                        'backface-visibility': 'hidden'
                    });
                    this.main.css({
                        'opacity': '0'
                    });
                };
            },
            free() {
                if (this.noTouch[0]) {
                    $('body').removeAttr('style');
                    $(window).scrollTop(this.scrollPos);
                    this.main.css({
                        'opacity': '1'
                    });
                };
            }
        };

        // transition
        // ------------------------------
        const tl = new TimelineMax({
            paused: true
        });
        tl.to(modal, 0.5, {
            ease: Power4.easeInOut,
            scaleX: 1,
            display: 'block',
            onComplete() {
                body.lock();
            }
        }).staggerFromTo(stag, 0.5, {
            lazy: true,
            autoCSS: true,
            opacity: 0,
            x: 40
        }, {
            ease: Power3.easeInOut,
            opacity: 1,
            x: 0
        }, 0.05, '-=0.2').to(closeBtn, 0.4, {
            ease: Power3.easeInOut,
            scale: 1,
        }, '-=0.45');

        // execution
        // ------------------------------
        obj.click(() => {
            tl.play().timeScale(1);
        });
        closeModal.click(function () {
            tl.reverse().timeScale(1.75);
            body.free();
        });

        // store settings to local storage and activate
        // ------------------------------
        function toggle() {
            const obj = '.js-settings-toggle';
            const body = $('body');

            $(obj).each(function () {
                const toggleBtn = $('.js-settings-btn', this);

                toggleBtn.click(function () {
                    toggleBtn.removeClass('is-active');
                    $(this).toggleClass('is-active');
                });
            });
        };
        toggle();

        // radio1.click(() => {
        //     if (dark.hasClass('is-active')) {
        //         localStorage.setItem('appearance', 'dark');
        //     } else {
        //         localStorage.setItem('appearance', 'light');
        //     };
        //     $('body').removeClass().addClass(localStorage.getItem('appearance'));
        // });

        // radio2.click(() => {
        //     if (serif.hasClass('is-active')) {
        //         $('body').addClass('serif');
        //     } else {
        //         $('body').removeClass('serif');
        //     };
        // });
    };
};
settings();