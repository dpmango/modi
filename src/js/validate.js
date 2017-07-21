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
