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
  $('.cta__call-modal').on('click', function(){
    // create circle animation and show X to close
    $(this).addClass('active');

    // remove all active first (if any)
    if ( $('.modal.opened').length > 0 ){
      $('.modal').removeClass('opened');
    }

    // disable scrollify and prevent scroll
    stopScroll()

    // find by id
    var target = $(this).data('modal');
    $('#'+target).addClass('opened');

    // save state
    window.location.hash = target;
  });

  $('.js-modal__close').on('click', function(e){
    e.stopPropagation();
    $('.cta__call-modal').removeClass('active');
    $('.modal').removeClass('opened');
    window.location.hash = "";
    stopScroll()
  });

  // CHECK SAVED STATE
  if(window.location.hash) {
    var hash = window.location.hash.substring(1);
    if (hash == "modalCta"){
      $('.cta__call-modal').addClass('active');
      $.scrollify.move("#cta");
      stopScroll()
    }
    $('#'+hash).addClass('opened');
  }

  function stopScroll(){
    if( $('.modal').is('.opened') ){
      $.scrollify.disable();
      $('body').on('touchmove', function (e) {
        e.preventDefault();
      });
      $('body').on({'mousewheel': function(e) {
        if (e.target.id == 'el') return;
          e.preventDefault();
          e.stopPropagation();
        }
      })
    } else {
      $.scrollify.enable();
      $('body').unbind("mousewheel");
      $('body').off("touchmove");
    }
  }

});
