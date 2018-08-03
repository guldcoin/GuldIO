jQuery(function ($) {
    'use strict';
    // --------------------------------------------------------------------
    // jQuery One Page Scrolling & Link Handling
    // --------------------------------------------------------------------
		// Select all links with hashes
		  $("a").on('click', function(event) {
		  	if (this.hash !== "") {
		      event.preventDefault();
		      var hash = this.hash;
		      $('html, body').animate({
		        scrollTop: $(hash).offset().top
		      }, 737, function(){
		        window.location.hash = hash;
		      });
		    }
		  });
						
		// Open all external links in new window 
		$('a').filter(function () {return this.hostname != window.location.hostname;}).attr('target', '_blank');
		
		// No event for empty links
		$('a[href=\\#]').on('click', function(){return false;});
			
    // --------------------------------------------------------------------
    // Closes the Responsive Menu on Menu Item Click
    // --------------------------------------------------------------------
		$('.navbar-nav>li>a,nav a').on('click', function(){
			$('.navbar-collapse').collapse('hide');
		});

}); // JQuery end
