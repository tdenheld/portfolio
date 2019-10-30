'use strict';

const ß = (node, element) => {
    const obj = element || document;
    const qs = obj.querySelectorAll(node);
    return Array.from(qs);
}

const exists = node => {
    return document.body.contains(document.querySelector(node));
}

const isHidden = node => {
    return window.getComputedStyle(node).display === 'none';
}

const valueInArray = (value, array) => {
    if (array.includes(value)) return true;
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const toggle = () => {
    const obj = '.js-toggle';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.onclick = () => el.classList.toggle('is-active'));
}

function scrollToObject() {
    const obj = $('.js-scroll-to');
    const offset = $('.header').height() + 24;

    if (obj[0]) {
        obj.click(function () {
            const element = $(this).attr('href');
            if ($(element)[0]) {
                TweenMax.to(window, .8, {
                    ease: Power3.easeInOut,
                    scrollTo: {
                        y: element,
                        offsetY: offset,
                        autoKill: false,
                    }
                });
                return false;
            };
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    scrollToObject();
});


// body scroll lock object
// ------------------------------------------------------------
const body = {
    main: $('.js-main'),
    scrollPos: window.scrollY,
    lock() {
        this.scrollPos = window.scrollY;
        $('body').css({
            'position': 'fixed',
            'top': -this.scrollPos,
            'overflow-y': 'hidden',
            'width': '100%',
            'backface-visibility': 'hidden'
        });
        this.main.css({
            'opacity': '0'
        });
    },
    unlock() {
        $('body').removeAttr('style');
        $(window).scrollTop(this.scrollPos);
        this.main.css({
            'opacity': '1'
        });
    }
};