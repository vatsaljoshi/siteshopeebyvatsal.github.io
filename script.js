
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;

  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 100 - Math.random() * 0; 

  if (this.isDeleting) {
    delta /= 4; 
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};



$('.btn-menu').click(function () {
  $('.menu').show();
});

$('.btn-close').click(function () {
  $('.menu').hide();
});

$('nav ul li').click(function () {
  $('.menu').hide();
});

//Scroll menu
$('nav a[href^="#"]').on('click', function (e) {
  e.preventDefault();
  var id = $(this).attr('href'),
    targetOffset = $(id).offset().top;

  $('html, body').animate(
    {
      scrollTop: targetOffset,
    },
    1000
  );
});

//Scroll top
$(document).ready(function () {
  var scrollTop = $('.scrollTop');

  $(window).scroll(function () {
    var topPos = $(this).scrollTop();

    
    if (topPos > 500) {
      $(scrollTop).css('opacity', '1');
    } else {
      $(scrollTop).css('opacity', '0');
    }
  });
  
  $(scrollTop).click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1000
    );
    return false;
  });
});


function validacaoEmail(field) {
  usuario = field.value.substring(0, field.value.indexOf('@'));
  dominio = field.value.substring(
    field.value.indexOf('@') + 1,
    field.value.length
  );

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search('@') == -1 &&
    dominio.search('@') == -1 &&
    usuario.search(' ') == -1 &&
    dominio.search(' ') == -1 &&
    dominio.search('.') != -1 &&
    dominio.indexOf('.') >= 1 &&
    dominio.lastIndexOf('.') < dominio.length - 1
  ) {
    document.getElementById('msgemail').innerHTML =
      "<font color='green'>Email válido</font>";
  } else {
    document.getElementById('msgemail').innerHTML =
      "<font color='red'>Email inválido</font>";
  }
}
