function imgHover() {
    const obj = $('.js-img-hover');

    if (obj[0]) {
        obj.append('<span>');
        obj.each(function () {
            const link = $('u', this);
            const img = $('span', this);

            function add() {
                link.addClass('is-active');
                img.addClass('is-active');
            };

            function remove() {
                link.removeClass('is-active');
                img.removeClass('is-active');
            };

            if ($('.no-touch')[0]) {
                link.mouseenter(() => {
                    add();
                });
                link.mouseleave(() => {
                    remove();
                });
            } else if ($('.touch')[0]) {
                link.click(function () {
                    add();
                    setTimeout(remove, 1300);
                });
            };
        });
    };
};
imgHover();