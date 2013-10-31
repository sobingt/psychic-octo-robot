/*
Carousel autostart on hovering
*/ 
$(document).ready(function() {

	console.log($('.meal-carousels').html());
  $('.meal-carousels').on('mouseenter',function() {
                 $(this).carousel({ interval: 1000, cycle: true, pause: 'none' });console.log("Start");
  }).on('mouseleave', function() {
                $(this).carousel('pause'); console.log("sss");
  });
  
});
 
/*
Rating is in the view
*/