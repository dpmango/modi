$(document).ready(function(){

  //////////
  // Global variables
  //////////

  const _window = $(window);
  const _document = $(document);

  function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
  }

  var _mobileDevice = isMobile();
  // detect mobile devices
  function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

  // ANIMATIONS
  $('.hero').addClass('ready')

  // SCROLLIFY
  $.scrollify({
    section : ".section",
    sectionName : "section-name",
    interstitialSection : ".header",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: false,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function(i, el) {
      if (i > 1){
        $('.header').addClass('visible')
      } else {
        $('.header').removeClass('visible')
      }
      storeScrollifySection = i;
    },
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
  });

  $('.js-nextScrollifySection').on('click', function(){
    $.scrollify.next();
  });

  //////////
  // SLIDERS
  //////////

  $('.js-slick').slick({
    autoplay: true,
    autoplaySpeed: 6000,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1
  });


  //////////
  // MODALS
  //////////
  // Custom modals
  // $('*[data-modal]').on('click', function(){
  //   // remove all active first
  //   $('.modal').removeClass('opened');
  //
  //   // find by id
  //   var target = $(this).data('modal');
  //   $('#'+target).addClass('opened');
  //
  //   window.location.hash = target;
  // });
  //
  // $('.modal__close').on('click', function(){
  //   $(this).closest('.modal').removeClass('opened');
  //   window.location.hash = "";
  // });
  //
  // // CHECK SAVED STATE
  // if(window.location.hash) {
  //   var hash = window.location.hash.substring(1);
  //   $('#'+hash).addClass('opened');
  // }
  //


  // Masked input
  $(".js-dateMask").mask("99.99.9999",{placeholder:"__ __ ____"});
  $(".js-dateMask2").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
  $(".js-indexMask").mask("999 999",{placeholder:"000 000"});
  $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});


});
