'use strict';

(() => {
    const obj = '.js-settings';
    const modal = '.js-settings-modal';
    const closeModal = '.js-settings-close, .js-settings-submit';
    const closeBtn = '.js-settings-close';
    const stag = '.js-settings-stag';
    const toggle = '.js-settings-toggle';
    const label = '.js-settings-label';
    const body = 'html, body';
    let active;

    if (!exists(obj)) return;

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
    ß(obj).map((el) => el.onclick = () => tl.play().timeScale(1));
    ß(closeModal).map((el) => el.onclick = () => tl.reverse().timeScale(1.75));

    // effect if clicked on an option
    // ------------------------------
    const toggleFX = () => ß(label).map((el) => {
        const tl = new TimelineMax,
            mySplitText = new SplitText(el, {
                type: 'words,chars'
            }),
            chars = mySplitText.chars;

        tl.staggerFromTo(chars, 0.6, {
            opacity: 0,
            x: 4
        }, {
            opacity: 1,
            x: 0,
            ease: Back.easeOut
        }, 0.03);
    });

    // store settings to local storage and activate
    // ------------------------------
    ß(toggle).map((el) => {
        const toggleBtn = ß('.js-settings-btn', el);
        const prop = el.getAttribute('data-toggle');
        ß(body).map((el) => el.classList.add(checkLocalStorage(prop)));

        const check = () => toggleBtn.map((el) => {
            if (el.classList.contains('is-active')) active = el.textContent.toLowerCase().trim();
        });

        toggleBtn.map((el) => {
            if (checkLocalStorage(prop)) el.classList.remove('is-active');
            if (el.textContent.toLowerCase().trim() === checkLocalStorage(prop)) el.classList.add('is-active');

            el.onclick = (e) => {
                check();
                toggleFX();
                toggleBtn.map((el) => el.classList.remove('is-active'));
                e.target.classList.add('is-active');
                localStorage.setItem(prop, e.target.textContent.toLowerCase().trim());
                
                ß(body).map((el) => {
                    el.classList.remove(active);
                    el.classList.add(localStorage.getItem(prop).trim());
                });
            }
        });
    });
})()