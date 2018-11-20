$(document).ready(function(e) {

  $(window).scroll(function(){
    //var $(window).scrollTop(); 為 scroll
    var scroll = $(window).scrollTop();
    //當卷軸超過70px，自動加上 .navbar-fixed-top ，如果小於就移除
    if( scroll >= 90){
      
      $('.navbar-scroll').addClass('navbar-fixed-top');
      
    }else{
      
      $('.navbar-scroll').removeClass('navbar-fixed-top')
      
    }
    
  });

  $('#go-top').click(function(e){

    e.preventDefault();
    var target = $('#go-top a').attr('href');
    var target = $(target).offset();

    $('html, body').animate({scrollTop: target.top});
  });

  $('#skills .col-sm-6').mouseenter(function(e){
    $('#skills i').removeClass('java');
    $(e.currentTarget).find('i').toggleClass('java');
  });

  $('#skills .col-sm-6').mouseleave(function(e) {
    $(e.currentTarget).find('i').removeClass('java');
  });


  $('body').scrollspy({target: "#myNavbar"});
  $('#myNavbar').on('activate.bs.scrollspy', function(){
    var currentItem = $('.nav li.active > a').text();
    $('.mobile.info').empty().html(currentItem);
  });


});

  

  
