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
    return array.includes(value);
}

const checkLocalStorage = value => {
    if (localStorage.getItem(value)) return localStorage.getItem(value).trim();
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const splitWords = node => {
    if (!exists(node)) return;
    ß(node).map((el) => el.style.visibility = 'visible');

    const st = new SplitText(node, {
        type: 'words'
    });
    const chars = st.words;

    gsap.from(chars, {
        duration: 0.9,
        ease: 'back.out',
        opacity: 0,
        y: -15,
        stagger: 0.03
    });
}

const toggle = () => {
    const obj = '.js-toggle';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.addEventListener('click', () => {
        el.classList.toggle('is-active');
    }));
}

const scrollToObject = () => {
    const obj = '.js-scroll-to';
    if (!exists(obj)) return;
    const workHash = window.location.href.search('#work') > 0;
    const offset = workHash ? 0 : 120;

    ß(obj).map((el) => el.onclick = () => {
        const target = el.getAttribute('href');
        if (!exists(target)) return;
        gsap.to(window, {
            duration: 0.8,
            ease: 'power3.inOut',
            scrollTo: {
                y: target,
                offsetY: offset
            }
        });
        return false;
    });
}

const playVideo = () => {
    const obj = '.js-video';
    if (!exists(obj)) return;

    const observer = new IntersectionObserver((entries, self) => {
        entries.map(entry => {
            const target = entry.target.querySelector('video');
            entry.isIntersecting ? target.play() : target.pause();
        });
    }, {
        threshold: 0.1
    });

    ß(obj).map(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    scrollToObject();
    playVideo();
});


// body scroll lock object
// ------------------------------------------------------------
const bodyScroll = {
    body: document.querySelector('body'),
    main: document.querySelector('main'),
    scrollPos: 0,

    lock() {
        this.scrollPos = window.scrollY;
        this.body.style.position = 'fixed';
        this.body.style.top = -this.scrollPos + 'px';
        this.body.style.overflowY = 'hidden';
        this.body.style.width = '100%';
        this.body.style.backfaceVisibility = 'hidden';
    },
    unlock() {
        this.body.removeAttribute('style');
        this.main.removeAttribute('style');
        window.scrollTo({
            top: this.scrollPos,
        });
    }
}
Object.seal(bodyScroll);