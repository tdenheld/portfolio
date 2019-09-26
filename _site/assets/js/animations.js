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



// split text
// ------------------------------------------------------------
function splitWords(className) {
    if ($(className)[0]) {
        $(className).addClass('is-active');

        var tl = new TimelineMax,
            st = new SplitText(className, {
                type: 'words'
            }),
            chars = st.words;

        tl.staggerFrom(chars, 0.9, {
            opacity: 0,
            y: -15,
            autoCSS: true,
            ease: Back.easeOut,
        }, 0.03, '+=0');
    }
}