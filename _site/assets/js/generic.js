// global vars
// ------------------------------------------------------------
// ------------------------------------------------------------
var vw = Number;
var vh = Number;
var mobile = Boolean;
var scrolled = false;



// update screen height
// ------------------------------------------------------------	
function updateWindowSize() {
    vw = $(window).innerWidth();
    vh = $(window).innerHeight();

    // set breakpoints
    if (vw > 912) {
        mobile = false;
    } else {
        mobile = true;
    };
};
updateWindowSize();

// update when resizing
$(window).resize(function () {
    updateWindowSize();
});



// basic functions
// ------------------------------------------------------------
function toggle() {
    const obj = $('.js-toggle');
    if (obj[0]) {
        obj.click(function () {
            $(this).toggleClass('is-active');
        });
    };
};

function radio() {
    const obj = $('.js-radio');
    if (obj[0]) {
        obj.click(function () {
            obj.removeClass('is-active');
            $(this).toggleClass('is-active');
        });
    };
};

function clearSession() {
    const obj = $('.js-clear-session');
    if (obj[0]) {
        obj.click(function () {
            sessionStorage.clear();
        });
    };
};

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
                };
            });
        });
    };
};

$(function () {
    toggle();
    radio();
    clearSession();
    toggleText();
});


// image hover
// ------------------------------------------------------------	
function imgHover() {
    const obj = $('.js-img-hover');

    if (obj[0]) {
        obj.append('<span>');
        obj.each(function () {
            const link = $('u', this);
            const img = $('span', this);

            function add() {
                link.addClass('is-active');
                img.addClass('is-active');
            };

            function remove() {
                link.removeClass('is-active');
                img.removeClass('is-active');
            };

            if ($('.no-touch')[0]) {
                link.mouseenter(() => {
                    add();
                });
                link.mouseleave(() => {
                    remove();
                });
            } else if ($('.touch')[0]) {
                link.click(function () {
                    add();
                    setTimeout(remove, 1300);
                });
            };
        });
    };
};
imgHover();


// settings
// ------------------------------------------------------------
function settings() {
    const obj = $('.js-settings');
    const modal = '.js-settings-modal';
    const close = $('.js-settings-close');
    const main = $('.js-main');
    let scrollPos;

    if (obj[0]) {

        // body scroll lock
        const body = {
            lock() {
                scrollPos = window.scrollY;
                $('body').css({
                    'position': 'fixed',
                    'top': -scrollPos,
                    'overflow-y': 'hidden',
                    'width': '100%',
                    'backface-visibility': 'hidden'
                });
                main.hide();
            },
            free() {
                $('body').removeAttr('style');
                $(window).scrollTop(scrollPos);
                main.show();
            }
        };

        // transition
        const tl = new TimelineMax({
            paused: true
        });
        tl.to(modal, 0.6, {
            ease: Power3.easeInOut,
            opacity: 1,
            scale: 1,
            display: 'block',
            onComplete() {
                body.lock();
            }
        }).to(close, 0.4, {
            ease: Power3.easeInOut,
            scale: 1,
        }, '-=0.2');

        obj.click(() => {
            tl.play();
        });
        close.click(function () {
            tl.reverse();
            body.free();
        });
    };
};
settings();


// preloader
// ------------------------------------------------------------	
function loader() {
    const loader = '.js-loader';
    const content = '.js-loaded';

    if (loader[0]) {
        // init loader view
        TweenLite.to(loader, 0.1, {
            opacity: 1
        });

        // load website
        window.addEventListener('load', function () {
            TweenLite.to(loader, 0.3, {
                delay: 0.7,
                ease: Power3.easeInOut,
                autoAlpha: 0,
                display: 'none',
                onComplete() {
                    TweenLite.set(content, {
                        display: 'block',
                    });
                }
            });
        });
    };
};
loader();