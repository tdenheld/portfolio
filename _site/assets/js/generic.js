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
    const modal = $('.js-settings-modal');
    const submit = $('.js-settings-submit');
    const closeModal = $('.js-settings-close, .js-settings-submit');
    const closeBtn = $('.js-settings-close');
    const stag = $('.js-settings-stag');
    const main = $('.js-main');
    let scrollPos;

    if (obj[0]) {

        // body scroll lock
        const body = {
            noTouch: $('.no-touch'),
            lock() {
                if (this.noTouch[0]) {
                    scrollPos = window.scrollY;
                    $('body').css({
                        'position': 'fixed',
                        'top': -scrollPos,
                        'overflow-y': 'hidden',
                        'width': '100%',
                        'backface-visibility': 'hidden'
                    });
                    main.css({
                        'opacity': '0'
                    });
                };
            },
            free() {
                if (this.noTouch[0]) {
                    $('body').removeAttr('style');
                    $(window).scrollTop(scrollPos);
                    main.css({
                        'opacity': '1'
                    })
                };
            }
        };

        // transition
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
        obj.click(() => {
            tl.play().timeScale(1);
        });
        closeModal.click(function () {
            tl.reverse().timeScale(1.75);
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