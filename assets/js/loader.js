'use strict';

const loader = {
    element: '.js-loader',
    content: '.js-loader-content',
    main: '.js-loader-fade',

    load() {
        const sessionLoaded = sessionStorage.getItem('loaded');
        const delay = sessionLoaded ? 0.1 : 0.7;

        if (!exists(this.element)) return;

        window.onload = () => {
            sessionStorage.setItem('loaded', true);
            gsap.timeline({
                defaults: {
                    duration: 0.7,
                    ease: 'power3.inOut'
                }
            }).to(this.content, {
                delay: delay,
                opacity: 0,
                onComplete() {
                    splitWords('.js-split-words');
                    revealOnScroll();
                }
            }).to(this.element, {
                y: '100%',
                display: 'none',
            }, '-=0.3').fromTo(this.main, {
                y: -100
            }, {
                duration: 1.4,
                ease: Power4.easeInOut,
                y: 0
            }, '-=1');
        }
    },
    
    pageTransition() {
        const obj = 'a[href*="/"]';    
        if (!exists(obj)) return;
    
        ß(obj).map((el) => el.onclick = (e) => {
            const target = el.getAttribute('href');
            if (el.getAttribute('target') === '_blank') return;
            e.preventDefault();
            
            gsap.timeline({
                defaults: {
                    ease: 'power3.inOut'
                }
            }).fromTo(this.element, {
                y: '-100%',
                display: 'flex'
            }, {
                duration: 0.7,
                y: '0%',
                onComplete() {
                    window.location = target;
                }
            }).to(this.content, 0.2, {
                duration: 0.2,
                opacity: 1
            }, '-=0.2').to(this.main, {
                duration: 1,
                ease: 'power4.inOut',
                y: 200
            }, '-=0.8');
        });
    }
}
Object.freeze(loader);
loader.load();
loader.pageTransition();