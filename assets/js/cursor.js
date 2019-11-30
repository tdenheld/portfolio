'use strict';

const cursor = () => {
    if (Modernizr.touchevents) return;

    const follow = (obj, x, y, t) => {
        gsap.to(obj, {
            duration: t,
            ease: 'power4.out',
            x: x,
            y: y,
        });
    }

    const fade = (obj) => {
        const tween = gsap.fromTo(obj, {
            autoAlpha: 0
        }, {
            duration: 1,
            ease: 'power4.out',
            autoAlpha: 1,
        }).pause();

        return {
            tween: tween
        }
    }

    const tracking = (obj, duration, fading) => {
        if (!exists(obj)) return;
        const fadeObj = fade(obj);

        document.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                follow(obj, e.clientX, e.clientY, duration);
            });
        }, {
            passive: true
        });

        document.body.addEventListener('mouseenter', e => {
            if (fading) fadeObj.tween.duration(0.1).play();
            follow(obj, e.clientX, e.clientY, 0);
        }, {
            passive: true
        });

        document.body.addEventListener('mouseleave', () => {
            if (fading) fadeObj.tween.duration(0.7).reverse();
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

        const fadeObj = fade(obj);
        const tileGroup = document.querySelector('.js-tile-group');

        tileGroup.onmouseenter = () => fadeObj.tween.play().timeScale(1);
        tileGroup.onmouseleave = () => fadeObj.tween.timeScale(-3);

        ß(trig).map((el) => {
            el.onmouseenter = () => {
                ß(img).map((el) => el.classList.remove('is-active'));
                const currentImg = el.getAttribute('data-get-img');
                document.querySelector(`[data-set-img="${currentImg}"]`).classList.add('is-active');
            }
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