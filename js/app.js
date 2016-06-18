console.log('my-note app.js');

$(function () {
    if(localStorage.getItem('note')) {
        $('#memo').val(localStorage.getItem('note'));
    }
    $(".btn-about").paulund_modal_box();
});

$(".btn-newnote").on("click", function(){
    window.localStorage.clear();
    location.reload();
    console.log("new note click!!");
    // $("#memo").val('');
    return false;
});

$('.btn-savenote').click( function() {
    console.log("save note click!!");
    var note = $('#memo').val();
    localStorage.setItem('note', note);
    return false;
});

$(".btn-fullscreen").click(function () {
    $(document).toggleFullScreen();
});

(function($){

    $.fn.paulund_modal_box = function(prop){

        var options = $.extend({
            height : "250",
            width : "500",
            title:"Note App Information",
            description: "Note Application Ver 0.1",
            top: "20%",
            left: "30%",
        },prop);

        return this.click(function(e){
            add_block_page();
            add_popup_box();
            add_styles();

            $('.paulund_modal_box').fadeIn();
        });

        function add_styles(){
            $('.paulund_modal_box').css({
                'position':'absolute',
                'left':options.left,
                'top':options.top,
                'display':'none',
                'height': options.height + 'px',
                'width': options.width + 'px',
                'border':'1px solid #fff',
                'box-shadow': '0px 2px 7px #292929',
                '-moz-box-shadow': '0px 2px 7px #292929',
                '-webkit-box-shadow': '0px 2px 7px #292929',
                'border-radius':'10px',
                '-moz-border-radius':'10px',
                '-webkit-border-radius':'10px',
                'background': '#f2f2f2',
                'z-index':'50'
            });
            $('.paulund_modal_close').css({
                'position':'relative',
                'top':'-25px',
                'left':'20px',
                'float':'right',
                'display':'block',
                'height':'50px',
                'width':'50px',
                'background': "url(js/images/close.png) no-repeat"
            });
            /*Block page overlay*/
            var pageHeight = $(document).height();
            var pageWidth = $(window).width();

            $('.paulund_block_page').css({
                'position':'absolute',
                'top':'0',
                'left':'0',
                'background-color':'rgba(0,0,0,0.6)',
                'height':pageHeight,
                'width':pageWidth,
                'z-index':'10'
            });
            $('.paulund_inner_modal_box').css({
                'background-color':'#fff',
                'height':(options.height - 50) + 'px',
                'width':(options.width - 50) + 'px',
                'padding':'10px',
                'margin':'15px',
                'border-radius':'10px',
                '-moz-border-radius':'10px',
                '-webkit-border-radius':'10px'
            });
        }

        function add_block_page(){
            var block_page = $('<div class="paulund_block_page"></div>');

            $(block_page).appendTo('body');
        }

        function add_popup_box(){
            var pop_up = $('<div class="paulund_modal_box"><a href="#" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><h2>' + options.title + '</h2><p>' + options.description + '</p></div></div>');
            $(pop_up).appendTo('.paulund_block_page');

            $('.paulund_modal_close').click(function(){
                $(this).parent().fadeOut().remove();
                $('.paulund_block_page').fadeOut().remove();
            });
        }

        return this;
    };

})(jQuery);
(function(jQuery) {

    function fullScreen(state)
    {
        var e, func, doc;

        if (!this.length) return this;
        
        e = (this[0]);
        
        if (e.ownerDocument)
        {
            doc = e.ownerDocument;
        }
        else
        {
            doc = e;
            e = doc.documentElement;
        }

        if (state == null)
        {
            if (!((/** @type {?Function} */ doc["exitFullscreen"])
                || (/** @type {?Function} */ doc["webkitExitFullscreen"])
                || (/** @type {?Function} */ doc["webkitCancelFullScreen"])
                || (/** @type {?Function} */ doc["msExitFullscreen"])
                || (/** @type {?Function} */ doc["mozCancelFullScreen"])))
            {
                return null;
            }

            state = !!doc["fullscreenElement"]
                || !!doc["msFullscreenElement"]
                || !!doc["webkitIsFullScreen"]
                || !!doc["mozFullScreen"];
            if (!state) return state;

            return (/** @type {?Element} */ doc["fullscreenElement"])
                || (/** @type {?Element} */ doc["webkitFullscreenElement"])
                || (/** @type {?Element} */ doc["webkitCurrentFullScreenElement"])
                || (/** @type {?Element} */ doc["msFullscreenElement"])
                || (/** @type {?Element} */ doc["mozFullScreenElement"])
                || state;
        }

        if (state)
        {
            func = (/** @type {?Function} */ e["requestFullscreen"])
                || (/** @type {?Function} */ e["webkitRequestFullscreen"])
                || (/** @type {?Function} */ e["webkitRequestFullScreen"])
                || (/** @type {?Function} */ e["msRequestFullscreen"])
                || (/** @type {?Function} */ e["mozRequestFullScreen"]);
            if (func)
            {
                func.call(e);
            }
            return this;
        }
        else
        {
            func = (/** @type {?Function} */ doc["exitFullscreen"])
                || (/** @type {?Function} */ doc["webkitExitFullscreen"])
                || (/** @type {?Function} */ doc["webkitCancelFullScreen"])
                || (/** @type {?Function} */ doc["msExitFullscreen"])
                || (/** @type {?Function} */ doc["mozCancelFullScreen"]);
            if (func) func.call(doc);
            return this;
        }
    }

    function toggleFullScreen()
    {
        return (/** @type {!jQuery} */ fullScreen.call(this,
            !fullScreen.call(this)));
    }

    function fullScreenChangeHandler(event)
    {
        jQuery(document).trigger(new jQuery.Event("fullscreenchange"));
    }

    function fullScreenErrorHandler(event)
    {
        jQuery(document).trigger(new jQuery.Event("fullscreenerror"));
    }

    function installFullScreenHandlers()
    {
        var e, change, error;

        // Determine event name
        e = document;
        if (e["webkitCancelFullScreen"])
        {
            change = "webkitfullscreenchange";
            error = "webkitfullscreenerror";
        }
        else if (e["msExitFullscreen"])
        {
            change = "MSFullscreenChange";
            error = "MSFullscreenError";
        }
        else if (e["mozCancelFullScreen"])
        {
            change = "mozfullscreenchange";
            error = "mozfullscreenerror";
        }
        else
        {
            change = "fullscreenchange";
            error = "fullscreenerror";
        }

        // Install the event handlers
        jQuery(document).bind(change, fullScreenChangeHandler);
        jQuery(document).bind(error, fullScreenErrorHandler);
    }

    jQuery.fn["fullScreen"] = fullScreen;
    jQuery.fn["toggleFullScreen"] = toggleFullScreen;
    installFullScreenHandlers();

})(jQuery);