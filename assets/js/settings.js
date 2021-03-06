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

    // check for native appearance
    // ---------------------------------
    if (localStorage.getItem('appearance') == null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            localStorage.setItem('appearance', 'dark');
            localStorage.setItem('nativeDarkmode', 'set');
        }
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        if (localStorage.getItem('nativeDarkmode') === 'set') {
            localStorage.removeItem('appearance');
        }
    }

    // transition of modal
    // ------------------------------
    const tl = gsap.timeline({
        paused: true,
        defaults: {
            duration: 0.5,
            ease: 'power3.inOut'
        }
    }).fromTo(modal, {
        display: 'block',
    }, {
        ease: 'power4.inOut',
        scaleX: 1,
    }).fromTo(stag, {
        opacity: 0,
        x: 40
    }, {
        stagger: 0.05,
        opacity: 1,
        x: 0
    }, '-=0.2').to(closeBtn, {
        duration: 0.4,
        scale: 1,
    }, '-=0.45');

    // open close modal
    // ------------------------------
    ß(obj).map(el => el.addEventListener('click', () => tl.play().timeScale(1)));
    ß(closeModal).map(el => el.addEventListener('click', () => tl.timeScale(-1.75)));

    // effect if clicked on an option
    // ------------------------------
    const toggleFX = () => ß(label).map(el => {
        const mySplitText = new SplitText(el, {
            type: 'chars,words'
        });
        const chars = mySplitText.chars;

        gsap.fromTo(chars, 0.6, {
            opacity: 0,
            x: 4
        }, {
            ease: Back.easeOut,
            opacity: 1,
            x: 0,
            stagger: 0.03
        });
    });

    // store settings to local storage and activate
    // ------------------------------
    ß(toggle).map(el => {
        const toggleBtn = ß('.js-settings-btn', el);
        const prop = el.getAttribute('data-toggle');
        if (localStorage.getItem(prop)) ß(body).map(el => el.classList.add(checkLocalStorage(prop)));

        const check = () => toggleBtn.map(el => {
            if (el.classList.contains('is-active')) active = el.textContent.toLowerCase().trim();
        });

        toggleBtn.map(el => {
            if (checkLocalStorage(prop)) el.classList.remove('is-active');
            if (el.textContent.toLowerCase().trim() === checkLocalStorage(prop)) el.classList.add('is-active');

            el.addEventListener('click', () => {
                check();
                toggleFX();
                toggleBtn.map(el => el.classList.remove('is-active'));
                el.classList.add('is-active');
                localStorage.setItem(prop, el.textContent.toLowerCase().trim());
                localStorage.removeItem('nativeDarkmode');

                ß(body).map(el => {
                    el.classList.remove(active);
                    el.classList.add(localStorage.getItem(prop).trim());
                });
            });
        });
    });
})()