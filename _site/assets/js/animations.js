// button hover
// ------------------------------------------------------------
function liquidHover() {
    const liquid = $('.js-liquid-hover');

    if (liquid[0] && $('.no-touch')[0]) {
        liquid.each(function () {
            tween(this);
        });
    };

    function tween(className) {
        const obj = $('span', className);
        const newY = $(className).attr('y');
        let y = 6;

        if (newY != null) {
            y = newY;
        };

        function handlerIn() {
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

        function handlerOut() {
            return false;
        };

        $(className).hoverIntent(handlerIn, handlerOut);
    };
};
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
        }, 0.05, "+=0");
    };
};

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
        }, 0.01, "+=0");
    };
};