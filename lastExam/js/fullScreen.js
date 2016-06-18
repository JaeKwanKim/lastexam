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