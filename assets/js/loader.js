// page transition
// ------------------------------------------------------------
function pageTransition() {
    const obj = $('a[href*="/"]');
    const loader = '.js-loader';
    const loaderContent = '.js-loader-content';
    const main = '.js-main';
    const tl = new TimelineMax;

    if (obj[0]) {
        obj.click(function(e){
            const link = $(this).attr('href');
            if ($(this).attr('target') !== '_blank') {
                e.preventDefault();
                tl.fromTo(loader, 0.7, {
                    y: '-100%',
                },{
                    ease: Power3.easeInOut,
                    y: '0%',
                    display: 'flex',
                    onComplete() {
                        window.location = link;
                    }
                }).to(loaderContent, 0.2, {
                    ease: Power3.easeInOut,
                    opacity: 1
                }, '-=0.2').to(main, 1, {
                    ease: Power4.easeInOut,
                    y: 200
                }, '-=0.8');
            }
        });
    }
}
$(function () {
    pageTransition();
});

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