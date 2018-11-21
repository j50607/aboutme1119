$(document).ready(function(){
	
	$('.menu, .header').click(function(e){
		$('#menu-list').stop().slideToggle('slow/400/fast', function() {			
		});
	});

	$('#menu-list>a').click(function(e) {
		$('#menu-list').slideUp();
	});

	$('#menu-list').blur(function(e) {
		$(this).slideDown();
	
	});



});