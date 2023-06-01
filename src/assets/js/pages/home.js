const CHAPTER_START_POINT_DATE = 18
const CHAPTER_START_POINT_MONTH = 3 // Month index by monthNames below
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

$(document).ready(function () {
  /**
   * Collection slider initialization
   * @date 4/18/2023 - 6:04:27 AM
   */
  function collectionSlider() {
    try {
      let section = $('section.collection')
      let container = section.find('.container')
      let swiperWrapper = section.find('.collection-swiper')
      let swiperContent = section.find('.collection-content')

      if (!swiperWrapper.length) return

      swiperContent.children().clone().appendTo(swiperContent)

      /**
       * Duplicate container spacing into scroll wrapper 
       * @date 4/17/2023 - 9:51:33 PM
       */
      function initializeInlineSpace() {
        let isMobile = $(window).width() < 992
        let isLarge = $(window).width() > 1440
        let containerSideWidth = ((isLarge ? 1440 : $(window).width()) - container.width()) / 2

        swiperWrapper.css({
          'width': 'unset',
          'margin-left': `${containerSideWidth * -1}px`,
          'margin-right': `${containerSideWidth * -1}px`,
          'padding-left': `${isMobile ? containerSideWidth : 0}px`,
          'padding-right': `${isMobile ? containerSideWidth : 0}px`,
        })
      }

      $(window).on('resize', initializeInlineSpace)

      let swiper = new Swiper('.collection-swiper', {
        effect: 'coverflow',
        preventClicks: true,
        preventClicksPropagation: true,
        grabCursor: true,
        centeredSlides: false,
        initialSlide: 0,
        loop: false,
        autoPlay: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        },
        speed: 500,
        autoplay: {
          delay: 1200,
        },
        breakpoints: {
          576: {
            grabCursor: true,
            centeredSlides: false,
            initialSlide: 0,
            loop: false,
            autoPlay: false,
            slidesPerView: 'auto',
            spaceBetween: 32,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 0,
              modifier: 0,
              slideShadows: false,
            },
          },
          992: {
            grabCursor: true,
            centeredSlides: true,
            initialSlide: 2,
            loop: true,
            autoPlay: {
              delay: 2000
            },
            slidesPerView: 3,
            spaceBetween: 0,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            },
          }
        },
      });

      $(document).on('click', '.nft-details-value .nft-details-value__increase', function () {
        let span = $(this).closest('.nft-details-value').find('span[data-value]')

        if (!span.length) return

        let value = parseInt(span.data('value')) || 0
        value++

        span.data('value', value)
        span.text(value)
      })
      $(document).on('click', '.nft-details-value .nft-details-value__decrease', function () {
        let span = $(this).closest('.nft-details-value').find('span[data-value]')

        if (!span.length) return

        let value = parseInt(span.data('value')) || 0
        if (value > 0) value--

        span.data('value', value)
        span.text(value)
      })
    } catch (error) {
      console.error('collection slider error', error);
    }
  }


  /**
   * Story slider initialization
   * @date 4/17/2023 - 9:44:46 PM
   */
  function storySlider() {
    try {
      let maxLengthDescription = 320
      let section = $('section.story')
      let container = section.find('.container')
      let slider = section.find('.story-slider')
      let storyCard = section.find('.story-card--desktop')
      let storyCardCaption = storyCard.find('.story-card__caption')
      let storyCardTitle = storyCard.find('.story-card__title')
      let storyCardDescription = storyCard.find('.story-card__description')
      let currentSlide = -1

      if (!slider.length) return

      let currentDate = new Date()
      let unlockedChapter = ((currentDate.getFullYear() - 2023) * 12) + (currentDate.getMonth() - CHAPTER_START_POINT_MONTH) + (currentDate.getDate() >= CHAPTER_START_POINT_DATE ? 1 : 0)
      slider.css('opacity', 0)

      slider.find('.story-slide').each((index, el) => {
        if (!(index < unlockedChapter)) {
          $(el).addClass('story-slide--locked')
        }

        // Add counting days and date
        // let chapterDate = new Date(currentDate);
        // chapterDate.setMonth(CHAPTER_START_POINT_MONTH + index)
        // chapterDate.setDate(CHAPTER_START_POINT_DATE)
        // let timeDifference = chapterDate.getTime() - currentDate.getTime()

        // let remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        // let formattedChapterDate = `${monthNames[chapterDate.getMonth()]} ${chapterDate.getDate()}, ${chapterDate.getFullYear()}`

        // $(el).find('.story-slide-locked__remaining').text(`Unlocked in ${remainingDays} ${remainingDays > 1 ? 'days' : 'day'}`)
        // $(el).find('.story-slide-locked__date').text(formattedChapterDate)
      })


      // Add read more on mobile
      // slider.find('.story-slide').each(function (_, el) {
      //   let descriptionEl = $(el).find('.story-card__description')
      //   let description = descriptionEl.data('description').trim() || ''

      //   if (description.length > maxLengthDescription) {
      //     let newDescription = description.substring(0, maxLengthDescription) + '...'
      //     descriptionEl.data('description', description)
      //     descriptionEl.data('newdescription', newDescription)
      //     descriptionEl.html(newDescription).append('<br><br><a type="button" class="story-card__read-more">Read More</a>')
      //   } else {
      //     descriptionEl.html(description)
      //     descriptionEl.data('description', '')
      //     descriptionEl.data('newdescription', '')
      //   }
      // })


      /**
       * Function to update story card when the active slide changed
       * @date 4/17/2023 - 9:50:46 PM
       *
       * @param {number} [slide=0]
       */
      function updateCardAfterSlideChanged(slide = 0) {
        if (currentSlide == slide) return

        currentSlide = slide

        let slides = slider.find('.story-slide')
        let currentSlideEL = slides.eq(currentSlide)
        let caption = slides.eq(currentSlide).find('.story-card__caption').text() || ''
        let title = slides.eq(currentSlide).find('.story-card__title').text() || ''
        let description = slides.eq(currentSlide).find('.story-card__description').data('description').trim() || ''

        let isSlideLocked = currentSlideEL.hasClass('story-slide--locked')

        if (isSlideLocked) {
          storyCard.addClass('story-card--hidden')
        }

        storyCardCaption.fadeOut(150).removeClass('active')
        storyCardTitle.fadeOut(150).removeClass('active')
        storyCardDescription.fadeOut(150).removeClass('active')

        setTimeout(() => {
          storyCardCaption.text(caption)
          storyCardTitle.text(title)

          if (description.length > maxLengthDescription) {
            let newDescription = description.substring(0, maxLengthDescription) + '...'
            storyCardDescription.data('description', description)
            storyCardDescription.data('newdescription', newDescription)
            storyCardDescription.html(newDescription).append('<br><br><a type="button" class="story-card__read-more">Read More</a>')
          } else {
            storyCardDescription.html(description)
            storyCardDescription.data('description', '')
            storyCardDescription.data('newdescription', '')
          }

          storyCardCaption.fadeIn().addClass('active')
          storyCardTitle.fadeIn().addClass('active')
          storyCardDescription.fadeIn().addClass('active')

          if (!isSlideLocked) {
            storyCard.removeClass('story-card--hidden')
          }
        }, 100);
      }

      slider.on('init', function (slick) {
        let slickSlider = $(slick.currentTarget)
        let slickList = slickSlider.find('.slick-list')
        let slickDots = slickSlider.find('.slick-dots')

        $(window).on('resize', function () {
          let containerSideWidth = ($(window).width() - container.width()) / 2
          let isMobile = $(window).width() < 992

          slider.css({
            'width': 'unset',
            'margin-left': isMobile ? '0px' : `${containerSideWidth * -1}px`,
            'margin-right': isMobile ? '0px' : `${containerSideWidth * -1}px`
          })

          slider.find('.story-slide').each((_, slide) => {
            $(slide).css({ 'width': `${(container.innerWidth() - (parseFloat(container.css('padding-left')) + parseFloat(container.css('padding-right')))) * (isMobile ? 1 : 0.875)}px` })
          })

            ; ([slickSlider.find('.slick-list'), slickSlider.find('.slick-dots')]).map((el) => {
              el.css({
                'padding-left': isMobile ? '0px' : `${containerSideWidth}px`,
                'padding-right': isMobile ? '0px' : `${containerSideWidth}px`,
              })
            })

          updateCardAfterSlideChanged(slick.currentTarget.slick.currentSlide || 0)

          slider.css('opacity', 1)
        })

        $(document).on('click', '.story-card__read-more', function () {
          let data = storyCardDescription.data('description')
          if (!data) return

          $(this).closest('.story-card__description').html(data)
          // $(this).closest('.story-card__description').html(data).append('<br><br><a type="button" class="story-card__read-less">Read Less</a>')
        });

        // $(document).on('click', '.story-card__read-less', function () {
        //   let data = $(this).closest('.story-card__description').data('newdescription')
        //   if (!data) return

        //   $(this).closest('.story-card__description').html(data).append('<br><br><a type="button" class="story-card__read-more">Read More</a>')
        // });

        updateCardAfterSlideChanged(0)

        /** Slider cursor configs */
        if ($(window).width() >= 992) {
          $('body').append('<div class="follow-cursor"></div>')
        }

        const followCursor = $(document).find('.follow-cursor')
        if (followCursor.length) {
          let xMousePos = 0;
          let yMousePos = 0;
          let lastScrolledLeft = 0;
          let lastScrolledTop = 0;

          $(document).mousemove(function (event) {
            captureMousePosition(event)
            moveFollowCursor()
          })

          $(window).scroll(function (event) {
            if (lastScrolledLeft != $(document).scrollLeft()) {
              xMousePos -= lastScrolledLeft;
              lastScrolledLeft = $(document).scrollLeft();
              xMousePos += lastScrolledLeft;
            }
            if (lastScrolledTop != $(document).scrollTop()) {
              yMousePos -= lastScrolledTop;
              lastScrolledTop = $(document).scrollTop();
              yMousePos += lastScrolledTop;
            }
            window.status = "x = " + xMousePos + " y = " + yMousePos;
            moveFollowCursor()
          });

          $(window).on('resize', function () {
            moveFollowCursor()
          })

          function captureMousePosition(event) {
            xMousePos = event.pageX;
            yMousePos = event.pageY;
            window.status = "x = " + xMousePos + " y = " + yMousePos;
          }

          function moveFollowCursor() {
            followCursor.css('opacity', slickList.is(':hover') ? 1 : 0)
            followCursor.css({
              left: xMousePos,
              top: yMousePos
            })
          }
        }
      })

      slider.on('breakpoint', function () {
        let containerSideWidth = ($(window).width() - container.width()) / 2
        let isMobile = $(window).width() < 992

        slider.find('.story-slide').each((_, slide) => {
          $(slide).css({ 'width': isMobile ? '100%' : `${(container.innerWidth() - (parseFloat(container.css('padding-left')) + parseFloat(container.css('padding-right')))) * 0.875}px` })
        })

          ; ([slider.find('.slick-list'), slider.find('.slick-dots')]).map((el) => {
            el.css({
              'padding-left': isMobile ? '0px' : `${containerSideWidth}px`,
              'padding-right': isMobile ? '0px' : `${containerSideWidth}px`,
            })
          })
      })

      slider.on('afterChange', function (slick, { currentSlide }) {
        updateCardAfterSlideChanged(currentSlide)
      })

      slider.slick({
        arrows: false,
        dots: true,
        infinite: false,
        variableWidth: true,
        slidesToShow: 1,
        adaptiveHeight: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              variableWidth: false,
              slidesToShow: 1,
              adaptiveHeight: true
            }
          },
        ]
      })

    } catch (error) {
      console.error('story slider error', error);
    }
  }


  /**
   * Weapon scrolling content initialization
   * @date 4/17/2023 - 9:45:25 PM
   */
  function weaponsScroller() {
    try {
      let section = $('section.weapons')
      let container = section.find('.container')
      let scrollWrapper = section.find('.weapons-content')

      if (!scrollWrapper.length) return

      /**
       * Duplicate container spacing into scroll wrapper 
       * @date 4/17/2023 - 9:51:33 PM
       */
      function initializeInlineSpace() {
        let containerSideWidth = ($(window).width() - container.width()) / 2

        scrollWrapper.css({
          'width': 'unset',
          'margin-left': `${containerSideWidth * -1}px`,
          'margin-right': `${containerSideWidth * -1}px`,
          'padding-left': `${containerSideWidth}px`,
          'padding-right': `${containerSideWidth}px`,
        })
      }

      $(window).on('resize', initializeInlineSpace)
    } catch (error) {
      console.error('weapon scroller error', error);
    }
  }


  /**
   * Call and initialize all functions
   * 
   * @date 4/17/2023 - 9:45:53 PM
   */
  function init() {
    collectionSlider()
    storySlider()
    weaponsScroller()

    $(window).trigger('resize')
  }


  init()
})