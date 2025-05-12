
$('a.nav-link[href^="#"]').on('click', function(e) {
  e.preventDefault()
  var target = $($(this).attr('href'))
  if (target.length) {
    $('html, body').animate({
      scrollTop: target.offset().top - 100
    }, 500, function() {
      $(window).trigger('scroll') // ← ini penting, paksa cek scroll setelah animasi selesai
    })
  }
})

$(window).on('scroll', function() {
  var scrollTop = $(window).scrollTop()
  var windowHeight = $(window).height()

  if (scrollTop >= (windowHeight / 2)) {
    $('.navbar').css({
      'background': '#257ca3',
      'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.2)'
    })
    $('.navbar-brand img').css({
      'width': '40px',
      'height': '40px'
    })
  } else {
    $('.navbar').css({
      'background': 'linear-gradient(180deg, #257ca3 0%, rgba(0, 0, 0, 0))',
      'box-shadow': 'none'
    })
    $('.navbar-brand img').css({
      'width': '65px',
      'height': '65px'
    })
  }
})

$(window).on('scroll', function() {
  var scrollPos = $(document).scrollTop()

  $('.navbar-nav .nav-link').each(function() {
    var sectionId = $(this).attr('href')
    if (sectionId.startsWith('#') && $(sectionId).length) {
      var sectionTop = $(sectionId).offset().top - 150 // offset buat antisipasi tinggi navbar
      var sectionBottom = sectionTop + $(sectionId).outerHeight()

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        $('.navbar-nav .nav-link').removeClass('active')
        $(this).addClass('active')
      }
    }
  })
})