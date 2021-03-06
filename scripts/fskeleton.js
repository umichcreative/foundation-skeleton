(function($){
    $(document).ready(function(){
        if( $('HTML').hasClass('lte-ie8') ) {
            // get grid columns
            var gridCols = 12;
            if( $('body').attr('class').replace(/^.*?fskelGrid-([0-9]{1,2}).*?$/, '$1') ) {
                gridCols = $('body').attr('class').replace(/^.*?fskelGrid-([0-9]{1,2}).*?$/, '$1');
            }

            // remove smaller sized classes
            // rem small-* if medium-* or large-* class exists
            // rem medium-* if large-* class exists
            for (var c = 1; c <= gridCols; c++) {
                $('.small-' + c + '[class*="medium"]').removeClass('small-' + c);
                $('.small-' + c + '[class*="large"]').removeClass('small-' + c);
                $('.medium-' + c + '[class*="large"]').removeClass('medium-' + c);
                //Perform any other column-specific adjustments your design may require here
            }

            $('.show-for-small').remove();
            $('.hide-for-small').removeClass('hide-for-small');
            $('.top-bar-section UL').css({ width: 'inherit' });
            $('.top-bar-section UL LI').css({ float: 'left' });
            $('.top-bar').css({ height: 'inherit' });

            $('img').removeAttr('height').removeAttr('width');
        }

        if( $.browser.msie && (parseInt( $.browser.version ) == 8) ) {
            // IE font race condition fix
            var head = document.getElementsByTagName('head')[0],
                style = document.createElement('style');
                style.type = 'text/css';
                style.styleSheet.cssText = ':before,:after{content:none !important';
                head.appendChild( style );
                setTimeout(function(){
                head.removeChild( style );
            }, 0);
        }

        // placeholder support for older browsers
        $('input').placeholder();

        // IE HTML5 VIDEO DOWNLOAD CHECK
        // ie can fail some partial downloads of video files
        $('video').on('error', function(){
            // if we get code 4, formats are not supported
            // anything else try and reload it, up to 4 times
            if( ($(this).get(0).error.code != 4) && ($(this).data('attempt') < 4) ) {
                $(this).get(0).load();

                var attempt = 0;
                if( $(this).data('attempt') > 0 ) {
                    attempt = parseInt( $(this).data('attempt') );
                }
                $(this).data('attempt', (attempt + 1) );
            }
        });

        // wait for assets to load before running responsive menu calculations
        $(window).load(function(){
            var mainMenuWrap = $('#zone-header-menu .fskelMenu');
            var mainMenuList = mainMenuWrap.find('.header-menu');

            var totalWidth = 0;
            mainMenuList.find('> li').each(function(){
                totalWidth += $(this).outerWidth( true );
            });

            $(window).resize(function(){
                if( mainMenuWrap.width() <= totalWidth ) {
                    if( !mainMenuWrap.hasClass('responsive') ) {
                        mainMenuList.hide();
                        mainMenuWrap.addClass('responsive');
                    }
                }
                else {
                    if( mainMenuWrap.hasClass('responsive') ) {
                        mainMenuWrap.removeClass('responsive');
                        mainMenuList.show();
                    }
                }
            }).trigger('resize');

            $(document).on('click', '#zone-header-menu .hamburger-header', function(){
                mainMenuList.slideToggle();
            });
        });
    });
}(jQuery));
