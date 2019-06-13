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
            TweenLite.to(loader, 0.1, {
                delay: 0,
                ease: Power3.easeInOut,
                autoAlpha: 0,
                display: 'none',
                onComplete() {
                    TweenLite.set(content, {
                        display: 'block',
                    });
                    splitWords('h1');
                }
            });
        });
    };
};
loader();