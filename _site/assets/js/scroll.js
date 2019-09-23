function scroll() {
    const section = $('.js-scroll');
    const richTxt = $('.js-scroll-rt p');

    function add(obj) {
        $('.js-tr', obj).addClass('is-active');
        if ($(obj).hasClass('js-tr')) {
            $(obj).addClass('is-active');
        }
    }

    function scrollingListener(obj) {
        $(window).scroll(() => {
            requestAnimationFrame(() => {
                scroll(obj);
            });
        });

        $(window).resize(() => {
            requestAnimationFrame(() => {
                scroll(obj);
            });
        });
        scroll(obj);
    }

    function scroll(obj, hook) {
        const trigger = Math.round($(window).scrollTop() + $(window).innerHeight() * 1.02);
        const pos = $(obj).offset().top;

        if (pos <= trigger) {
            add(obj);
        }
    }

    if (richTxt[0]) {
        richTxt.each(function () {
            $(this).addClass('js-tr tr-fi-up tr-1500');
            scrollingListener(this);
        });
    }

    if (section[0]) {
        section.each(function () {
            scrollingListener(this);
        });
    }
}

$(function () {
    scroll();
});