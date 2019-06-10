// button hover
// ------------------------------------------------------------
function liquidHover() {
    const liquid = $('.js-liquid-hover');

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
                // an array of all the divs that wrap each character
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

    if (liquid[0]) {
        liquid.each(function () {
            tween(this);
        });
    };
};
liquidHover();

// split text
// ------------------------------------------------------------
function splitText(className, delay) {
    if ($(className)[0]) {
        var tl = new TimelineMax,
            mySplitText = new SplitText(className, {
                type: 'words,chars'
            }),
            // an array of all the divs that wrap each character
            chars = mySplitText.words;

        tl.staggerFrom(chars, 0.7, {
            opacity: 0,
            y: -15,
            ease: Back.easeOut,
            delay: delay,
        }, 0.03, "+=0");
    };
};

splitText('h1', 0.1);