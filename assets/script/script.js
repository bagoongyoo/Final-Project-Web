
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

let counterTriggered = false
$('#detail').waypoint(function() {
    if (!counterTriggered) {
      $('.counter').each(function () {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
        }, {
          duration: 3000,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now))
          }
        })
      })
      counterTriggered = true // hanya jalan sekali
    }
  }, {
    offset: '80%' // mulai animasi saat 80% dari atas viewport
  })

  // Slide In Left
  $('.animation__slideInLeft').each(function() {
    const element = $(this)
    const slideInLeft = 'animate__slideInLeft'
    
    element.waypoint(function (direction) {
      if (direction === 'down') {
        element
          .addClass('animate__animated ' + slideInLeft)
          .css('opacity', 1)
      } else {
        element
          .removeClass('animate_animated ' + slideInLeft)
          .css('opacity', 0)
      }
    }, {
      // Kapan animasi mulai berjalan
      offset: '75%'
    })
  })

  // Slide In Right
  $('.animation__slideInRight').each(function() {
    const element = $(this)
    const slideInRight = 'animate__slideInRight'
    
    element.waypoint(function (direction) {
      if (direction === 'down') {
        element
          .addClass('animate__animated ' + slideInRight)
          .css('opacity', 1)
      } else {
        element
          .removeClass('animate_animated ' + slideInRight)
          .css('opacity', 0)
      }
    }, {
      // Kapan animasi mulai berjalan
      offset: '75%'
    })
  })

   $('.animation__slideInUp').each(function() {
    const element = $(this)
    const slideInUp = 'animate__slideInUp'
    
    element.waypoint(function (direction) {
      if (direction === 'down') {
        element
          .addClass('animate__animated ' + slideInUp)
          .css('opacity', 1)
      } else {
        element
          .removeClass('animate_animated ' + slideInUp)
          .css('opacity', 0)
      }
    }, {
      // Kapan animasi mulai berjalan
      offset: '75%'
    })
  })