// basic functions
// ------------------------------------------------------------
function toggle() {
    const obj = $('.js-toggle');
    if (obj[0]) {
        obj.click(function () {
            $(this).toggleClass('is-active');
        });
    }
}

function radio() {
    const obj = $('.js-radio');
    if (obj[0]) {
        obj.click(function () {
            obj.removeClass('is-active');
            $(this).toggleClass('is-active');
        });
    }
}

function clearSession() {
    const obj = $('.js-clear-session');
    if (obj[0]) {
        obj.click(function () {
            sessionStorage.clear();
        });
    }
}

function toggleText() {
    const obj = $('.js-toggle-text');
    if (obj[0]) {
        obj.each(function () {
            const initTxt = $(this).text();
            let txt = $(this).attr('toggleTxt');
            $(this).click(() => {
                if ($(this).text() === initTxt) {
                    $(this).text(txt);
                } else {
                    $(this).text(initTxt);
                }
            });
        });
    }
}

$(function () {
    toggle();
    radio();
    clearSession();
    toggleText();
});



// body scroll lock
// ------------------------------------------------------------
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



// scroll to
// ------------------------------------------------------------
function scrollToObject() {
    const obj = $('.js-scroll-to');
    const offset = $('.header').height() + 24;

    if (obj[0]) {
        obj.click(function () {
            const element = $(this).attr('href');
            if ($(element)[0]) {
                TweenMax.to(window, .8, {
                    ease: Power3.easeInOut,
                    scrollTo: {
                        y: element,
                        offsetY: offset,
                        autoKill: false,
                    }
                });
                return false;
            };
        });
    }
}
$(function () {
    scrollToObject();
});