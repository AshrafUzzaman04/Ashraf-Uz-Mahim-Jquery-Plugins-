$(function () {
    $.fn.cpLightimg = function () {

        var _img = this[0];

        var clear = function () {
            $("div.cp-lightoverlay").removeClass("cp-lightoverlay-in");
            $("img.cp-lightimg").css("transform", "")

            setTimeout(function () {
                $("div.cp-lightoverlay").remove();
                $("img.cp-lightimg").removeClass("cp-lightimg");
            }, 300);

            $(window).unbind("scroll", clear);
        };

        $(window).scroll(clear);

        if (!$(_img).hasClass("cp-lightimg")) {
            var _param = {
                imgMaxWidth: (_img.naturalWidth > ($("body").width() - 40) ? ($("body").width() - 40) : _img.naturalWidth),
                imgMaxHeight: (_img.naturalHeight > (window.innerHeight - 40) ? (window.innerHeight - 40) : _img.naturalHeight),
                screenleftStart: (($("body").width() / 2) - (_img.width / 2)) - ($(_img).offset().left),
                screentopStart: (((window.innerHeight / 2) - (_img.height / 2)) - $(_img).offset().top) + $("html").scrollTop()
            };

            var _imgTransformScaleWidth = _param.imgMaxWidth / _img.width;
            var _imgTransformScaleHeight = _param.imgMaxHeight / _img.height;


            if (_img.naturalWidth > _img.naturalHeight) {
                var heightPx = (_param.imgMaxWidth / _img.naturalWidth) * _img.naturalHeight;
                _imgTransformScaleHeight = heightPx / _img.height;
            } else {
                var widthPx = (_param.imgMaxHeight / _img.naturalHeight) * _img.naturalWidth;
                _imgTransformScaleWidth = widthPx / _img.width;

                if (widthPx > _param.imgMaxWidth) {
                    var heightPx = (_param.imgMaxWidth / _img.naturalWidth) * _img.naturalHeight;
                    _imgTransformScaleHeight = heightPx / _img.height;

                    var widthPx = (heightPx / _img.naturalHeight) * _img.naturalWidth;
                    _imgTransformScaleWidth = widthPx / _img.width;
                }
            }

            $(_img)
                .addClass("cp-lightimg")
                .css("transform", `translate(${_param.screenleftStart}px, ${_param.screentopStart}px) scale(${_imgTransformScaleWidth}, ${_imgTransformScaleHeight})`);

            var $overlay = $(`<div class="cp-lightoverlay"><div>`);

            $("body").append($overlay);

            setTimeout(function () {
                $overlay.addClass("cp-lightoverlay-in");
                $overlay.click(clear);
            }, 10);
        } else {
            clear();
        }

        return this;
    };
    $("<style>img.cp-lightimg {position: relative;transition: all 300ms;z-index: 1001;box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px;}div.cp-lightoverlay {position: fixed;background: rgba(0, 0, 0, 0.7);top: 0;left: 0;right: 0;bottom: 0;z-index: 1000;opacity: 0;transition: all 300ms;}div.cp-lightoverlay.cp-lightoverlay-in {opacity: 1;}</style>").appendTo("head");
});