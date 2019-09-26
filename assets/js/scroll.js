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

    function scrollingListener(obj) {
        const customHook = $(obj).attr('data-hook');
        let hook = 0.84;

        if (customHook != null) {
            hook = customHook;
        }

        $(window).scroll(() => {
            requestAnimationFrame(() => {
                scroll(obj, hook);
            });
        });

        $(window).resize(() => {
            requestAnimationFrame(() => {
                scroll(obj, hook);
            });
        });
        scroll(obj, hook);
    }

    function scroll(obj, hook) {
        const trigger = Math.round($(window).scrollTop() + screen.height * hook);
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
