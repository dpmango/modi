$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

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

  function isBadMobile(){
    if( /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true
    } else {
      return false
    }
  }

  if ( _mobileDevice ){
    $('body').addClass('is-mobile');
  }

  if (isBadMobile()){
    $('.section').addClass('active');
  }
  //////////
  // COMMON
  //////////

 	// Prevent # behavior
	$('[href="#"]').click(function(e) {
		e.preventDefault();
	});

  setTimeout(function(){
    startScrollify();
    $('.section:first-child').addClass('active');
  },300);

  // SCROLLIFY
  var currentSectionId = 1
  function startScrollify(){
    if ( !isBadMobile() ){
      $.scrollify({
        section : ".section",
        sectionName : "section-name",
        interstitialSection : "[data-section-name='cta']",
        // easing: "easeInCubic",
        easing: "easeInQuart",
        scrollSpeed: 700,
        offset : 0,
        scrollbars: false,
        standardScrollElements: "[data-section-name='cta']",
        setHeights: true,
        overflowScroll: true,
        updateHash: true,
        touchScroll:true,
        before:function(i, el) {
          var sectionChild = i + 1
          // set active class for section
          $('.section').removeClass('active');
          $('.section:nth-child(' + sectionChild + ')').addClass('active');

          // animate preloader
          if (sectionChild == 2 && currentSectionId == 1){
            $('.preloader').addClass('stage2')
            setTimeout(function(){
              $('.preloader').removeClass('stage2');
            },800);
          } else {
            $('.preloader').removeClass('stage2');
          }

          // header texts for slider
          if (sectionChild == 3){
            $('.header__text').addClass('showing')
          } else {
            $('.header__text').removeClass('showing')
          }
        },
        after:function(i, el) {
          var sectionChild = i + 1

          // controll header
          if (sectionChild > 1){
            $('.header').addClass('visible')
          } else {
            $('.header').removeClass('visible')
          }

          currentSectionId = sectionChild

        },
        afterResize:function() {},
        afterRender:function() {}
      });
    }
  }

  // emulate behavior for scrollify standartScroll section
  var lastScrollTop = 0;
  var scrollLock = false;
  _window.scrolled(50, function(e){
    var wScroll = _window.scrollTop();
    // lastScrollTop > wScroll &&
    var bindPrevMove = currentSectionId == 4 && lastScrollTop - wScroll > 50
    // var bindPrevMove = currentSectionId == 4 && e.originalEvent.wheelDelta >= 0
    if ( !scrollLock && bindPrevMove ){
      $.scrollify.move('#slider')
      scrollLock == true;
      setTimeout(function(){
        scrollLock = false;
      },800)
    }
    lastScrollTop = wScroll;
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
    autoplaySpeed: 3000,
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
    // scroll to bottom
    $('html, body').animate({
     scrollTop: $(document).height() - _window.height()},
     50,
     "easeOutQuint"
    );

    // create circle animation and show X to close
    $(this).addClass('active');

    // remove all active first (if any)
    if ( $('.modal.opened').length > 0 ){
      $('.modal').removeClass('opened');
    }

    // disable scrollify and prevent scroll
    stopScroll(true);

    // find by id
    var target = $(this).data('modal');
    $('#'+target).addClass('opened');

    // save state
    // window.location.hash = target;

    calcModalPosition()
  });

  $('.js-modal__close').on('click', function(e){
    e.stopPropagation();
    $('.cta__call-modal').removeClass('active');
    $('.modal').removeClass('opened');
    // window.location.hash = "";
    stopScroll(false);
  });

  // CHECK SAVED STATE
  // if(window.location.hash) {
  //   var hash = window.location.hash.substring(1);
  //   if (hash == "modalCta"){
  //     $('.cta__call-modal').addClass('active');
  //     $.scrollify.move("#cta");
  //     stopScroll()
  //   }
  //   $('#'+hash).addClass('opened');
  // }

  function stopScroll(state){
    if( state == true ){
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
    } else if ( state == false ){
      $.scrollify.enable();
      $('body').unbind("mousewheel");
      $('body').off("touchmove");
    }
  }




  // adjust modal position for mobile
  var bottomPos
  if ( _window.width() < 768 ){
    _window.scrolled(50, function(){
      bottomPos = (_window.scrollTop() - $('.page').height() + _window.height() ) * -1;
    })
  }

  function calcModalPosition(){
    if ( _window.width() < 768 ){
      $('.modal').css('bottom', 0) // bottomPos?
    } else {
      $('.modal').css('bottom', 0)
    }
  }

  _window.resized(50, function(){
    calcModalPosition();
  })

});
