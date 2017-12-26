jQuery(function ($) {

    'use strict';
    // --------------------------------------------------------------------
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    // --------------------------------------------------------------------

    (function () {
        $('a.page-scroll').on('click', function (e) {
            console.log("fired");
            e.preventDefault();
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
        });
    }());

    // --------------------------------------------------------------------
    // Closes the Responsive Menu on Menu Item Click
    // --------------------------------------------------------------------

    (function () {
        $('.navbar-collapse ul li a').on('click', function () {
            if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
                $('.navbar-toggle:visible').trigger('click');
            }
        });
    }());

}); // JQuery end


var background = document.getElementById('background');
background.playbackRate = 0.5;

var typed3 = new Typed('#text', {
    strings: ['A new <i>secure</i> internet ', 'A new <strong>better</strong> internet', 'A new decentralized internet'],
    typeSpeed: 80,
    backSpeed: 50,
    smartBackspace: true, // this is a default
    loop: false
});

$(document).ready(function () {
    function welcomeCenter() {
        var height = $(window).height();
        var welcome = $('#welcome').outerHeight();
        $('#background').height(height);

        var free_space = height - welcome //- (welcome + 140);  // menu adjustment
        free_space = free_space  - (free_space * 0.1) // 0.1 of adjust to top
        var off_top = (free_space / 2);
        if (off_top < 1) {
            off_top = 3;
        }

        $('#welcome').css("margin-top", off_top + "px");
        $(".header").height(height);
    }

    $(window).resize(function () {
        welcomeCenter();
    });

    $(window).resize();
});