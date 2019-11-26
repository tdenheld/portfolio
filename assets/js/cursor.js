'use strict';

const cursor = () => {
    if (Modernizr.touchevents) return;

    const follow = (obj, x, y, t) => {
        if (!exists(obj)) return;
        gsap.to(obj, {
            duration: t,
            ease: 'power4.out',
            x: x,
            y: y,
        });
    }

    const fade = (obj, a, b, t) => {
        if (!exists(obj)) return;
        gsap.fromTo(obj, {
            autoAlpha: a
        }, {
            duration: t,
            ease: 'power4.out',
            autoAlpha: b,
        });
    }

    const tracking = (obj, t, fading) => {
        if (!exists(obj)) return;

        document.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                follow(obj, e.clientX, e.clientY, t);
            });
        }, {
            passive: true
        });

        document.body.addEventListener('mouseenter', e => {
            if (fading) fade(obj, 0, 1, 0.1);
            follow(obj, e.clientX, e.clientY, 0);
        }, {
            passive: true
        });

        document.body.addEventListener('mouseleave', () => {
            if (fading) fade(obj, 1, 0, 0.7);
        }, {
            passive: true
        });
    }

    // hover states
    // ------------------------------------------------
    const sizing = (obj, size) => {
        if (!exists(obj)) return;
        gsap.to(obj, {
            duration: 0.5,
            ease: 'power4.out',
            width: size,
            height: size,
            top: -size / 2,
            left: -size / 2,
        });
    }

    const hover = (obj, size) => {
        if (!exists(obj)) return;
        const initSize = ß(obj).map((el) => el.offsetWidth);
        const hover = 'a, button, .js-settings-close, .js-img-hover u';

        ß(hover).map((el) => {
            el.addEventListener('mouseenter', () => sizing(obj, size), {
                passive: true
            });
            el.addEventListener('mouseleave', () => sizing(obj, initSize), {
                passive: true
            });
        });
    }

    // image hover
    // ------------------------------------------------
    const followingImgHover = (trig, obj, img) => {
        if (!exists(obj)) return;
        ß(trig).map((el) => {
            el.onmouseenter = () => {
                fade(obj, 0, 1, 1);
                fade(img, 1, 0, 0);
                const currentImg = el.getAttribute('data-img');
                fade(`.js-cursor-img[data-img="${currentImg}"]`, 0, 1, 4);
            }
            el.onmouseleave = () => {
                fade(obj, 1, 0, 0.5);
            };
        });
    }

    // execution
    // ------------------------------------------------
    tracking('#js-cursor', 0.7, 'fading');
    hover('#js-cursor', 80);
    tracking('#js-cursor-tile', 1.7);
    followingImgHover('.js-tile', '#js-cursor-tile', '.js-cursor-img');
}

document.addEventListener('DOMContentLoaded', () => cursor());