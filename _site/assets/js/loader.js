function loader() {
    const loader = '.js-loader';
    const loaderContent = '.js-loader-content';
    const main = '.js-main';
    const tl = new TimelineMax;
    const sessionLoaded = sessionStorage.getItem('loaded');
    let delay = 0.7;

    if (loader[0]) {
        if (sessionLoaded) {
            delay = 0.1;
        }
        window.addEventListener('load', function () {
            sessionStorage.setItem('loaded', true);
            tl.to(loaderContent, 0.7, {
                ease: Power3.easeInOut,
                delay: delay,
                opacity: 0,
                onComplete() {
                    splitWords('.js-split-words');
                    scroll();
                }
            }).to(loader, 0.7, {
                ease: Power3.easeInOut,
                y: '100%',
                display: 'none',
            }, '-=0.3').fromTo(main, 1.4, {
                y: -100
            }, {
                ease: Power4.easeInOut,
                y: 0,
                onComplete() {
                    $(main).removeAttr('style');
                }
            }, '-=1');
        });
    }
}
loader();