jQuery(function ($) {
    'use strict';
    // --------------------------------------------------------------------
    // jQuery One Page Scrolling & Link Handling
    // --------------------------------------------------------------------
		$("a").on('click', function(e) {
		  if (this.hash !== "") {
		     e.preventDefault();
		     var h = this.hash;
		     $('html, body').animate({
		       scrollTop: $(h).offset().top
		     }, 737, function(){
		       window.location.hash = h;
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