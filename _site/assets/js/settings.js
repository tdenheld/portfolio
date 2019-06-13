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
            main: $('.js-main'),
            scrollPos: window.scrollY,
            lock() {
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
            },
            unlock() {
                $('body').removeAttr('style');
                $(window).scrollTop(this.scrollPos);
                this.main.css({
                    'opacity': '1'
                });
            }
        };

        // transition of modal
        // ------------------------------
        const tl = new TimelineMax({
            paused: true
        });
        tl.to(modal, 0.5, {
            ease: Power4.easeInOut,
            scaleX: 1,
            display: 'block',
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

        // open close modal
        // ------------------------------
        obj.click(() => {
            tl.play().timeScale(1);
        });
        closeModal.click(function () {
            tl.reverse().timeScale(1.75);
        });

        // store settings to local storage and activate
        // ------------------------------
        function toggle() {
            const obj = '.js-settings-toggle';
            const body = $('html, body');
            let active;

            $(obj).each(function () {
                const toggleBtn = $('.js-settings-btn', this);
                const prop = $(this).attr('toggle');
                body.addClass(localStorage.getItem(prop));

                toggleBtn.each(function () {
                    const thisVal = $(this).text().toLowerCase();
                    const localVal = localStorage.getItem(prop);

                    if (thisVal == localVal) {
                        toggleBtn.removeClass('is-active');
                        $(this).addClass('is-active');
                    };
                });

                function check() {
                    toggleBtn.each(function () {
                        if ($(this).hasClass('is-active')) {
                            active = $(this).text().toLowerCase();
                        };
                    });
                };

                toggleBtn.click(function () {
                    check();
                    splitChars('.js-settings-label');
                    toggleBtn.removeClass('is-active');
                    $(this).toggleClass('is-active');

                    const val = $(this).text().toLowerCase();
                    localStorage.setItem(prop, val);
                    body.removeClass(active).addClass(localStorage.getItem(prop));
                });
            });
        };
        toggle();
    };
};
settings();