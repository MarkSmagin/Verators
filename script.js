$(document).ready(function(){
  // Открытие/Закрытие формы
  $('.header__button').click(function(e){
    e.preventDefault();
    $('.call').css('display', 'flex');
})
  $('.form__close').click(function(e){
    e.preventDefault();
    $('.call').css('display', 'none');
    $('#call__form')[0].reset();
  })

  // Отображение/Скрытие дополнительного меню
  $('.navigation__item.child__menu').hover(function () {
    clearTimeout($.data(this,'timer'));
    $('.subnav__wrap',this).stop(true,true).show();
  }, function () {
    $.data(this,'timer', setTimeout($.proxy(function() {
      $('.subnav__wrap',this).stop(true,true).hide();
    }, this), 100));
  });

  // Фильтр каталога
  $('.filter').on('click',
    function(e){
      e.stopPropagation();
      if($(this).hasClass('filter__active')){
        $(this).removeClass('filter__active');
        $(this).removeClass('filter__hover');
        $(this).children('.filter__name').removeClass('filter__hover__name'); 
      } else{
        $(this).addClass('filter__active')
        $(this).addClass('filter__hover');
        $(this).children('.filter__name').addClass('filter__hover__name'); 
      }
    }
  ).on('click','.filter__body', function(e) { 
    e.stopPropagation(); 
 });

  // Скрытие/раскрытие текста
  $('.show__more__text').on('click', function(){
    $(this).prev('.reviews__text__wrap').children('.text__shadow').toggleClass('hidden');
    $(this).prev('.reviews__text__wrap').toggleClass('opened');

    if($(this).prev().hasClass('opened')){
      $(this).text('Свернуть');
    }else{
      $(this).text('Развернуть');
    }
  })

  // Слайдер карточек товара
  $('.sales__body').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000000,
    prevArrow:"<img class='sales__prev slick-prev' src='images/left.svg'>",
    nextArrow:"<img class='sales__next slick-next' src='images/right.svg'>"
  });
  $('.catalog__body').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow:"<img class='sales__prev slick-prev' src='images/left.svg'>",
    nextArrow:"<img class='sales__next slick-next' src='images/right.svg'>"
});

  // Слайдер особенностей
  const data = [
    {
      title: 'Устойчивость',
      h5: 'Ноженьки',
      p: 'Мы используем ткани исключительно хорошего качества, плотностью не менее 400 г на квадратный метр. Такая ткань устойчива к истиранию, обладает антивандальными свойствами.  Мы используем большой спектр тканей, начиная от велюра и микровелюра, заканчивая искусственной замшей, экокожей и прочими. Цветовая палитра также очень обширна.'
    },
    {
      title: 'Сверхклассность',
      h5: 'Основа',
      p: '400 г на квадратный метр. Такая ткань устойчива к истиранию, обладает антивандальными свойствами.  Мы используем большой спектр тканей, начиная от велюра и микровелюра, заканчивая искусственной замшей, экокожей и прочими. Цветовая палитра также очень обширна.'
    },
    {
      title: 'Мягкость',
      h5: 'Паролон',
      p: 'Мы используем большой спектр тканей, начиная от велюра и микровелюра, заканчивая искусственной замшей, экокожей и прочими. Цветовая палитра также очень обширна.'
    },
    {
      title: 'Сверхдолговечность',
      h5: 'Ткань',
      p: 'Мы используем ткани исключительно хорошего качества, плотностью не менее 400 г на квадратный метр. Такая ткань устойчива к истиранию, обладает антивандальными свойствами.  Мы используем большой спектр тканей, начиная от велюра и микровелюра, заканчивая искусственной замшей, экокожей и прочими. Цветовая палитра также очень обширна.'
    }
  ]
  
  $('.img__circle').on('click', function(e){
    e.preventDefault();
    $('.img__circle').removeClass('circle__active');
    $('.slider__item').removeClass('active');

    let clickId = $(this).attr('data-button-id');

    $(this).addClass('circle__active');
    $(`#slider__item_${clickId}`).addClass('active');

    $('.img__chair').attr('src', `images/${clickId}chair.png`);
    $('.body__title').text(data[clickId - 1].title)
    $('.body__text h5').text(data[clickId - 1].h5)
    $('.body__text p').text(data[clickId - 1].p) 
  })

  $('.slider__item').on('click', function(e){
    e.preventDefault();
    $('.img__circle').removeClass('circle__active');
    $('.slider__item').removeClass('active');

    let clickId = $(this).attr('data-slider-id');

    $(this).addClass('active');
    $(`#circle${clickId}`).addClass('circle__active');
    $('.img__chair').attr('src', `images/${clickId}chair.png`);
    $('.body__title').text(data[clickId - 1].title)
    $('.body__text h5').text(data[clickId - 1].h5)
    $('.body__text p').text(data[clickId - 1].p)
  })

  // Слайдер в карточке товара
  if($('.swiper').length){
    let swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    let swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  }
  
  // Аккордион
  $('.catalog__page__filters').accordion({
    heightStyle: 'content',
    active: true,
    header: '> .filter > .filter__name',
    collapsible: true,
    beforeActivate: function(event, ui) {
      if (ui.newHeader[0]) {
        var currHeader  = ui.newHeader;
        var currContent = currHeader.next('.ui-accordion-content');
      } else {
        var currHeader  = ui.oldHeader;
        var currContent = currHeader.next('.ui-accordion-content');
      }
      var isPanelSelected = currHeader.attr('aria-selected') == 'true';
      currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
      currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
      currContent.toggleClass('accordion-content-active',!isPanelSelected)    
      if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
      return false;
    },
    animate: {
      duration: 100
    }
  })

  // $('.product__filters').accordion({
  //   heightStyle: 'content',
  //   active: true,
  //   header: '> .filter > .filter__name',
  //   collapsible: true,
  //   beforeActivate: function(event, ui) {
  //     if (ui.newHeader[0]) {
  //       let currHeader  = ui.newHeader;
  //       let currContent = currHeader.next('.ui-accordion-content');
  //     } else {
  //       let currHeader  = ui.oldHeader;
  //       let currContent = currHeader.next('.ui-accordion-content');
  //     }
  //     let isPanelSelected = currHeader.attr('aria-selected') == 'true';
  //     currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
  //     currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
  //     currContent.toggleClass('accordion-content-active',!isPanelSelected)    
  //     if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
  //     return false;
  //   },
  //   animate: {
  //     duration: 100
  //   }
  // })

  // Форма оформления заказа
  let individual = $('.individual');
  $('.button__entity').on('click', function(){
    $('.ordering__form__main__items').load('entity.html');
    $('.button__individual').removeClass('ordering__form__active');
    $('.button__entity').addClass('ordering__form__active');
  })

  $('.button__individual').on('click', function(){
    $('.ordering__form__main__items').load('individual.html');
    $('.button__entity').removeClass('ordering__form__active');
    $('.button__individual').addClass('ordering__form__active');
  })

  $('.ordering__form__buttons button').on('click', function(e){
    e.preventDefault();
  })

  $('.ordering__delivery').on('click', function(e){
    e.preventDefault();
    if($("#ordering__delivery").is(':checked')){
      $("#ordering__delivery").attr('checked',false);
      $('.ordering__form__more__items').empty();
    } else {
      $("#ordering__delivery").attr('checked',true);
      $('.ordering__form__more__items').load('delivery__options.html');
    }
  })

  $('.ordering__form__pay__methods__item').on('click', function(e){
    e.preventDefault();
    $(this).parents('.ordering__form__pay__methods__body').find('.ordering__form__pay__methods__item label input').attr('checked', false);
    $(this).parents('.ordering__form__pay__methods__body').find('label').removeClass('checked');
    $(this).find('input').attr('checked', true);
    $(this).find('label').addClass('checked');
  })

  $(document).on(('click'), '.ordering__delivery__cities_title', function(){
    $('.ordering__delivery__cities_columns').toggleClass('hidden');
    $('.ordering__delivery__cities_title').toggleClass('cities__show');
  })

  $(document).on(('click'), '.ordering__form__radiobuttons__item', function(){
    $('.ordering__form__radiobuttons__item').on('click', function(e){
      e.preventDefault();
      $(this).parents('.ordering__form__radiobuttons').find('.ordering__form__radiobuttons__item').removeClass('ordering__form__radiobutton__active');
      $(this).parents('.ordering__form__radiobuttons').find('.ordering__form__radiobuttons__item input').attr('checked', false);
      $(this).toggleClass('ordering__form__radiobutton__active');
      $(this).find('input').attr('checked', true);
      return false;
    })
  })

  $(document).on(('submit', '.odering__form', function (e) {
    let form = $(this);
    let field = [];
    form.find('input[data-validate]').each(function () {
      field.push('input[data-validate]');
      let value = $(this).val(),
        line = $(this).closest('.ordering__form__item');
      for(let i = 0; i < field.length; i++) {
        if( !value ) {
          line.addClass('some-form__line-required');
          setTimeout(function() {
            line.removeClass('some-form__line-required')
          }.bind(this),2000);
          e.preventDefault();
        }
      }
    });
  }));

  // Скрытый фильтр
  $('#open__hidden__filter').on('click', function(){
    $('.hidden__filter').addClass('show');
    $('body').css({
      'position': 'fixed'
    })
  })

  $(document).mouseup( function(e){
		let hiddenFilter = $("#hidden__filter__wrap");
		if ( !hiddenFilter.is(e.target) && hiddenFilter.has(e.target).length === 0 ) {
      hiddenFilter.parents('.hidden__filter').removeClass('show');
      $('body').css({
        'position': ''
      })
		}
	});

  $('.hidden__filter__characteristic__checkbox').on('click', function(e){
    e.preventDefault();
    $(this).parents('.hidden__filter__characteristic__wrap').find('.hidden__filter__characteristic__checkbox label input').attr('checked', false);
    $(this).parents('.hidden__filter__characteristic__wrap').find('label').removeClass('hidden__filter__characteristic__checkbox__checked');
    $(this).find('input').attr('checked', true);
    $(this).find('label').addClass('hidden__filter__characteristic__checkbox__checked');
  })

  $('.hidden__filter__toggle').on('click', function(){
    $('.hidden__filter__characteristics').toggleClass('hidden');
    $('.hidden__filter__toggle').toggleClass('hidden__filter__characteristics__show');
  })
  // На уточнении

  // $('#hidden__filter__color').on('change', function(){
  //   $('.hidden__filter__characteristic__wrap').find('.hidden__filter__characteristic__checkbox label input').attr('checked', false);
  //   let valueOption = $('#hidden__filter__color').val();
  //   $('.hidden__filter__characteristic__checkbox input').find().getAttribute('value')
  //   for (let i = 0; i < $('.hidden__filter__characteristic__checkbox input').length; i++){
  //     console.log($('.hidden__filter__characteristic__checkbox input')[i].getAttribute('value'), valueOption);
  //   }
  //   console.log($('.hidden__filter__characteristic__checkbox input').length)
    
  // })
  // Слайдер катринок на карточке товара
  class HvrSlider {
    constructor(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el.querySelectorAll('img').length > 1) {
          const hvr = document.createElement('div');
          hvr.classList.add('hvr');
  
          const hvrImages = document.createElement('div');
          hvrImages.classList.add('hvr__images');
          hvr.appendChild(hvrImages);
  
          const hvrSectors = document.createElement('div');
          hvrSectors.classList.add('hvr__sectors');
          hvrImages.appendChild(hvrSectors);
  
          const hvrDots = document.createElement('div');
          hvrDots.classList.add('hvr__dots');
          hvr.appendChild(hvrDots);
  
          el.parentNode.insertBefore(hvr, el);
          hvrImages.prepend(el);
  
          const hvrImagesArray = hvr.querySelectorAll('img');
          hvrImagesArray.forEach(() => {
            hvrSectors.insertAdjacentHTML('afterbegin', '<div class="hvr__sector"></div>');
            hvrDots.insertAdjacentHTML('afterbegin', '<div class="hvr__dot"></div>');
          });
          hvrDots.firstChild.classList.add('hvr__dot--active');
          const setActiveEl = function (targetEl) {
            const index = [...hvrSectors.children].indexOf(targetEl);
            hvrImagesArray.forEach((img, idx) => {
              if (index == idx) {
                img.style.display = 'block';
              } else {
                img.style.display = 'none';
              }
            });
            hvr.querySelectorAll('.hvr__dot').forEach((dot, idx) => {
              if (index == idx) {
                dot.classList.add('hvr__dot--active');
              } else {
                dot.classList.remove('hvr__dot--active');
              }
            });
          };
          hvrSectors.addEventListener('mouseover', function (e) {
            if (e.target.matches('.hvr__sector')) {
              setActiveEl(e.target);
            }
          });
          hvrSectors.addEventListener('touchmove', function (e) {
            const position = e.changedTouches[0];
            const target = document.elementFromPoint(position.clientX, position.clientY);
            if (target.matches('.hvr__sector')) {
              setActiveEl(target);
            }
          });
        }
      });
    }
  }
  new HvrSlider('.images');

  // Карта
  ymaps.ready(init);
  function init(){
      let myMap = new ymaps.Map("map", {
          center: [56.135399, 47.300046],
          zoom: 15,
          controls: ['zoomControl']
      },
      {
          suppressMapOpenBlock: true
      }
      );
      let myPlacemark = new ymaps.Placemark([56.135399, 47.300046], {}, {
        preset: 'islands#darkOrangeShoppingIcon'
    });
    myMap.geoObjects.add(myPlacemark);
  }
})

// Слайдер картинок со слайдбаром
let step = Math.ceil(100 / $('.legs__img__wrap img').length);
let minRange = 0;
let maxRange = step;
const rangeLimits = [
  [minRange, maxRange]
];
let currentStep = 0;
let legsCurrentValue = 0;
let backsCurrentValue = 0;

for(let i = 1; i < 100; i++){
  if(i % step === 0){
    minRange = minRange + step;
    maxRange = maxRange + step;
    rangeLimits.push([minRange + 1, maxRange]);
  }
}

// Скрипты для блока с ножками
const setValueLegs = function (value) {
  if (document.querySelector(".round__slider__legs").value === undefined) return;
  document.querySelector(".round__slider__legs").value = value;
};

document.querySelector(".round__slider__legs").addEventListener("value-changed", function (ev) {
  if (ev.detail.value !== undefined) setValueLegs(ev.detail.value, false);
});

document.querySelector(".round__slider__legs").addEventListener("value-changing", function (ev) {
  if (ev.detail.value !== undefined) setValueLegs(ev.detail.value, true);
  if (ev.detail.value % step === 0) {
    legsCurrentValue = ev.detail.value;
  }
  if (ev.detail.value > legsCurrentValue){
    $('.legs__img__wrap img').removeClass('why__we__img__active');
    $(`[data-legs-num="${Math.ceil(legsCurrentValue/10)}"]`).addClass('why__we__img__active');
  } else {
    if(ev.detail.value > 0){
      $('.legs__img__wrap img').removeClass('why__we__img__active');
      $(`[data-legs-num="${Math.ceil(legsCurrentValue/10)-1}"]`).addClass('why__we__img__active');
    }
  }
});

// Скрипты для блока с сиденьями
const setValueSeats = function (value) {
  if (document.querySelector(".round__slider__seats").value === undefined) return;
  document.querySelector(".round__slider__seats").value = value;
};

document.querySelector(".round__slider__seats").addEventListener("value-changed", function (ev) {
  if (ev.detail.value !== undefined) setValueSeats(ev.detail.value, false);
});

document.querySelector(".round__slider__seats").addEventListener("value-changing", function (ev) {
  if (ev.detail.value !== undefined) setValueSeats(ev.detail.value, true);
  if (ev.detail.value % step === 0) {
    backsCurrentValue = ev.detail.value;
  }
  if (ev.detail.value > backsCurrentValue){
    $('.backs__img__wrap img').removeClass('why__we__img__active');
    $(`[data-backs-num="${Math.ceil(backsCurrentValue/10)}"]`).addClass('why__we__img__active');
  } else {
    if(ev.detail.value > 0){
      $('.backs__img__wrap img').removeClass('why__we__img__active');
      $(`[data-backs-num="${Math.ceil(backsCurrentValue/10)-1}"]`).addClass('why__we__img__active');
    }
  }
});