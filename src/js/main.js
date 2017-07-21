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

  // SCROLLIFY
  $.scrollify({
    section : ".section",
    sectionName : "section-name",
    interstitialSection : ".header",
    // easing: "easeInCubic",
    easing: "easeInQuart",
    scrollSpeed: 700,
    offset : 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function(i, el) {
      $('.section').removeClass('active');
      $('.section:nth-child(' + i + ')').addClass('active');
      if (i > 1){
        $('.header').addClass('visible')
      } else {
        $('.header').removeClass('visible')
      }
      if (i == 3){
        $('.header__text').addClass('showing')
      } else {
        $('.header__text').removeClass('showing')
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
  $('.js-prevScrollifySection').on('click', function(){
    $.scrollify.previous();
  });


  //////////
  // SLIDERS
  //////////

  $('.js-slick').on('init', function(event, slick){
    slick.$slides.each(function(i,val){
      if ( $(val).data('hex') ){
        var textColor = $(val).data('hex')
      }
      var element = "<span>" + $(val).data('logo-text') + "</span>"
      $('.header__text').append( $(element).css('color', textColor) );

    })
    $('.header__text span:nth-child(' + 1 + ')').addClass('showing');
  });

  $('.js-slick').slick({
    autoplay: true,
    autoplaySpeed: 6000,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    cssEase: 'ease-in',
    pauseOnFocus: false,
    pauseOnHover: false,
    slidesToShow: 1
  });

  // set header text
  $('.js-slick').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var slideNumber = currentSlide + 1
    $('.header__text span:nth-child(' + slideNumber + ')').addClass('removing');
  });
  $('.js-slick').on('afterChange', function(event, slick, currentSlide, nextSlide){
    $('.header__text span').removeClass('removing');
    $('.header__text span').removeClass('showing');
    var slideNumber = currentSlide + 1
    $('.header__text span:nth-child(' + slideNumber + ')').addClass('showing');
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
