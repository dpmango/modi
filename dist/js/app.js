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

  if ( _mobileDevice ){
    $('body').addClass('is-mobile');
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
    $.scrollify({
      section : ".section",
      sectionName : "section-name",
      interstitialSection : "[data-section-name='cta']",
      // easing: "easeInCubic",
      easing: "easeInQuart",
      scrollSpeed: 700,
      offset : 0,
      scrollbars: true,
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

// set dalay on scroll event
(function($) {
  var uniqueCntr = 0;
  $.fn.scrolled = function (waitTime, fn) {
    if (typeof waitTime === "function") {
        fn = waitTime;
        waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.scroll(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.removeData(tag);
            fn.call(self[0]);
        }, waitTime);
        self.data(tag, timer);
    });
  }
})(jQuery);

// set dalay on resize event
(function($) {
  var uniqueCntr = 0;
  $.fn.resized = function (waitTime, fn) {
    if (typeof waitTime === "function") {
        fn = waitTime;
        waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.resize(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.removeData(tag);
            fn.call(self[0]);
        }, waitTime);
        self.data(tag, timer);
    });
  }
})(jQuery);

// textarea autoExpand
$(document)
  .one('focus.autoExpand', 'textarea.autoExpand', function(){
      var savedValue = this.value;
      this.value = '';
      this.baseScrollHeight = this.scrollHeight;
      this.value = savedValue;
  })
  .on('input.autoExpand', 'textarea.autoExpand', function(){
      var minRows = this.getAttribute('data-min-rows')|0, rows;
      this.rows = minRows;
      rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
      this.rows = minRows + rows;
  });

$(document).ready(function(){

  // jQuery validate plugin
  // https://jqueryvalidation.org

  // GENERIC FUNCTIONS
  ////////////////////

  var validateErrorPlacement = function(error, element) {
    return false;
    // error.addClass('ui-input__validation');
    // error.appendTo(element.parent("div"));
  }
  var validateHighlight = function(element) {
    $(element).addClass("has-error");
  }
  var validateUnhighlight = function(element) {
    $(element).removeClass("has-error");
  }
  var validateSubmitHandler = function(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      type: "json",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          $(form).find('.ui-group, .modal__form__btn-wrap').slideOut();
          $(form).find('[data-sucess]').html(response.sucess)
        } else {
          $(form).find('[data-error]').html(data.message);
        }
      }
    });
  }

  // Not required - but just in case
  // var validatePhone = {
  //   required: true,
  //   normalizer: function(value) {
  //       var PHONE_MASK = '+X (XXX) XXX-XXXX';
  //       if (!value || value === PHONE_MASK) {
  //           return value;
  //       } else {
  //           return value.replace(/[^\d]/g, '');
  //       }
  //   },
  //   minlength: 11,
  //   digits: true
  // }

  /////////////////////
  // FORM
  ////////////////////
  $(".js-validateForm").validate({
    errorPlacement: validateErrorPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      name: "required",
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      name: "Заполните это поле",
      email: {
          required: "Заполните это поле",
          email: "Email содержит неправильный формат"
      },
    }
  });

});
