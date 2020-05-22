'use strict';

(() => {
    const obj = '.js-img-hover';
    if (!exists(obj)) return;

    ß(obj).map(el => {
        el.appendChild(document.createElement('span'));
        const link = el.querySelector('u');
        const img = el.querySelector('span');

        const add = () => {
            link.classList.add('is-active');
            img.classList.add('is-active');
        }

        const remove = () => {
            link.classList.remove('is-active');
            img.classList.remove('is-active');
        }

        if (Modernizr.touchevents) {
            link.addEventListener('click', () => {
                add();
                setTimeout(remove, 1300);
            });
        } else {
            link.addEventListener('mouseenter', () => add());
            link.addEventListener('mouseleave', () => remove());
        }
    });
})()