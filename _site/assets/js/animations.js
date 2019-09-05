// button & link liquid hover effect
// ------------------------------------------------------------
function liquidFX(obj, y) {
    const tl = new TimelineMax,
        mySplitText = new SplitText(obj, {
            type: 'words,chars'
        }),
        chars = mySplitText.chars;

    tl.staggerFromTo(chars, 0.3, {
        opacity: 1,
        y: 0,
    }, {
        opacity: 0,
        y: -y,
        ease: Power2.easeInOut
    }, 0.01).staggerFromTo(chars, 0.4, {
        opacity: 0,
        y: y
    }, {
        opacity: 1,
        y: 0,
        ease: Back.easeOut
    }, 0.02);
}

function liquidHover() {
    const liquid = $('.js-liquid-hover');

    if (liquid[0] && $('.no-touch')[0]) {
        liquid.each(function () {
            tween(this);
        });
    }

    function tween(className) {
        const obj = $('span', className);
        const newY = $(className).attr('data-y');
        let y = 6;

        if (newY != null) {
            y = newY;
        }

        function handlerIn() {
            liquidFX(obj, y);
        }

        function handlerOut() {
            return false;
        }

        $(className).hoverIntent(handlerIn, handlerOut);
    }
}
liquidHover();



// split text
// ------------------------------------------------------------
function splitWords(className) {
    if ($(className)[0]) {
        var tl = new TimelineMax,
            st = new SplitText(className, {
                type: 'words'
            }),
            chars = st.words;

        tl.staggerFrom(chars, 0.9, {
            opacity: 0,
            y: -15,
            ease: Back.easeOut,
        }, 0.05, '+=0');
    }
}

$(function () {
    splitWords('.js-split-words');
});

function splitChars(className) {
    if ($(className)[0]) {
        var tl = new TimelineMax,
            st = new SplitText(className, {
                type: 'words, chars'
            }),
            chars = st.chars;

        tl.staggerFrom(chars, 2, {
            opacity: 0,
            ease: Back.easeOut,
        }, 0.01, '+=0');
    }
}



// scroll magic
// ------------------------------------------------------------------
function scrollMagic() {
    const section = $('.js-scroll-magic');
    const richTxt = $('.js-scroll-magic-rt p');

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
            //.addIndicators()
            .addTo(controller);
    }

    if (richTxt[0]) {
        richTxt.each(function (i) {
            $(this).addClass('js-tr tr-fi-up tr-1500');
            scrollTrig(this);
        });
    }

    if (section[0]) {
        section.each(function (i) {
            scrollTrig(this);
        });
    }
}

$(function () {
    scrollMagic();
});