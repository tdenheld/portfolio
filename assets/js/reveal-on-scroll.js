'use strict'

const revealOnScroll = () => {
    const section = '.js-scroll';
    const richTxt = '.js-scroll-rt > *';
    if (!exists(section) && !exists(richTxt)) return;

    const init = (node) => {
        const reveal = () => ß(node).map((el) => {
            const defaultHook = 0.92;
            const hook = el.getAttribute('data-hook') || defaultHook;

            const nodePosition = el.getBoundingClientRect();
            const inViewport = !(nodePosition.top > innerHeight * hook);

            if (inViewport) {
                ß('.js-tr', el).map((ae) => ae.classList.add('is-active'));
                if (el.classList.contains('js-tr')) el.classList.add('is-active');
            }
        });
        reveal();

        window.addEventListener('scroll', () => requestAnimationFrame(reveal));
        window.addEventListener('resize', () => requestAnimationFrame(reveal));
    }

    ß(richTxt).map((el) => el.classList.add('js-tr', 'tr-fi-up', 'tr-1500'));
    init(richTxt);
    init(section);
}