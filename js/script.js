jQuery(function ($) {

    'use strict';
    // --------------------------------------------------------------------
    // jQuery One Page Scrolling & Link Handling
    // --------------------------------------------------------------------

    (function () {
		// Select all links with hashes
		$('a[href*=#]:not([href=#])').on('click', function(){
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
		        || location.hostname == this.hostname) {
		        var target = $(this.hash);
		        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		           if (target.length) {
		             $('html,body').animate({
		                 scrollTop: target.offset().top - 20 //scroll position fix
		            }, 737);
		            return false;
		        }
		    }
		});
		// Open all external links in new window 
		$('a').filter(function () {return this.hostname != window.location.hostname;}).attr('target', '_blank');
		// No event for empty links
		$('a[href=#]').on('click', function(){return false;});			
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

// var background = document.getElementById('background');
// background.playbackRate = 0.8;

/*
var typed3 = new Typed('#text', {
    strings: ['A new <i>secure</i> internet ', 'A new <strong>better</strong> internet', 'A new decentralized internet'],
    typeSpeed: 80,
    backSpeed: 50,
    smartBackspace: true, // this is a default
    loop: false
});
*/