'use strict';

const revealOnScroll = () => {
    const section = '.js-scroll';
    const richTxt = '.js-scroll-rt > *';
    if (!exists(section) && !exists(richTxt)) return;

    const observer = new IntersectionObserver((entries, self) => {
        entries.map(entry => {
            const target = entry.target;
            
            if (entry.isIntersecting) {
                ß('.js-tr', target).map(el => el.classList.add('is-active'));
                if (target.classList.contains('js-tr')) target.classList.add('is-active');
                self.unobserve(target);
            }
        });
    }, {
        rootMargin: '-5% 0px',
        threshold: 0.05
    });

    ß(richTxt).map(el => {
        el.classList.add('js-tr', 'tr-fi-up', 'tr-1500');
        observer.observe(el);
    });
    ß(section).map(el => observer.observe(el));
}