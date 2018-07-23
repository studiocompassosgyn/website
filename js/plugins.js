"use strict";
jQuery(document).ready(function() {

    // 2/3/4th level menu  offscreen fix
    var MainWindowWidth = jQuery(window).width();
    jQuery(window).resize(function(){
        MainWindowWidth = jQuery(window).width();
    });
    jQuery('#mainmenu ul li').mouseover(function(){
        if(MainWindowWidth > 767) {
            // checks if third level menu exist         
            var subMenuExist = jQuery(this).find('ul').length;            
            if( subMenuExist > 0){
                var subMenuWidth = jQuery(this).find('ul').width();
                var subMenuOffset = jQuery(this).find('ul').parent().offset().left + subMenuWidth;
                // if sub menu is off screen, give new position
                if((subMenuOffset + subMenuWidth) > MainWindowWidth){                  
                    var newSubMenuPosition = subMenuWidth + 0;
                    $(this).find('ul').first().css({
                        left: -newSubMenuPosition,
                        //top: '10px',
                    });
                } else {
                    $(this).find('ul').first().css({
                        left: '100%',
                        //top: '10px',
                    });

                }
            }
        }
    });

    //timetable
        var all_selectors = [];
        var hasduplicate = false;
        // filter items when filter link is clicked
        jQuery('#timetable_filter a').on('click', function(e){
            e.preventDefault();
            var $timetable = jQuery('.timetable');
            var selector = jQuery(this).attr('data-filter');

            for(var index_of_selectors = 0; index_of_selectors < all_selectors.length; index_of_selectors++){
              if(all_selectors[ index_of_selectors ] === selector){
                hasduplicate = true;

              }
            }

            if (hasduplicate === true) {
              var index = all_selectors.indexOf(selector);
              if (index > -1) {
              all_selectors.splice(index, 1);
              }
              hasduplicate = false
            } else {
              all_selectors.push(selector);
            }



            if ( jQuery(this).hasClass('selected') ) {

                jQuery(this).removeClass('selected');

            } else if( selector === 'all'){

                jQuery(this).parent().parent().find('a').removeClass('selected');
                jQuery('#all_filters').addClass('selected');

            } else {

                jQuery(this).addClass('selected');
                jQuery('#all_filters').removeClass('selected');

            }

            if (selector === 'all') {

                $timetable.find('a').stop().animate({opacity: 1}, {queue: false}, 400);
                all_selectors = [];

            } else if (all_selectors.length == 0) {
                $timetable.find('a').stop().animate({opacity: 1}, {queue: false}, 400);
                jQuery('#all_filters').addClass('selected');
            } else {
                $timetable.find('a').stop().animate({opacity: 0}, {queue: false}, 500);
                for(var haveselector = 0; haveselector < all_selectors.length; haveselector++){
                  $timetable.find(all_selectors[ haveselector ]).stop().animate({opacity: 1}, {queue: false}, 400);
              }
            }
        });
});



$( function() {
    // init Isotope
    var $container = $('#isotope_container');
        if ($container.length) {
            $container.imagesLoaded( function() {
                var layoutMode = ($container.hasClass('masonry-layout')) ? 'masonry' : 'fitRows';
                $container.isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: layoutMode
                });
                $(window).resize(function(){
                    $container.isotope({
                        itemSelector: '.isotope-item',
                        layoutMode: layoutMode
                    });

                });
            });
        };

    // bind filter click
    $('#isotope_filters').on( 'click', 'a', function( e ) {
        e.preventDefault();
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        // filterValue = filterFns[ filterValue ] || filterValue;
        $container.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    $('#isotope_filters').each( function( i, filters ) {
        var $filters = $( filters );
        $filters.on( 'click', 'a', function() {
            $filters.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });

});

