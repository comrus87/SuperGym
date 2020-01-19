'use strict';
document.addEventListener('DOMContentLoaded', function () {
  var ERROR_NAME_MESSAGE = 'Имя должно начинаться с большой буквы, состоять как минимум из 2 и максимум из 17 букв';
  var ERROR_PHONE_MESSAGE = 'Введите корректный телефон';

  var tabs = document.querySelectorAll('.subscriptions__item-month');
  var tabControls = document.querySelector('.subscriptions__controls-list');
  var tabContent = document.querySelectorAll('.subscriptions__tabs-list');
  var subscriptionsPage = document.querySelector('.subscriptions');

  var coachesSlides = document.querySelectorAll('.coaches__item');
  var coachesPrev = document.querySelector('.coaches__arrow-left');
  var coachesNext = document.querySelector('.coaches__arrow-right');
  var coachesPage = document.querySelector('.coaches');
  var coachesList = document.querySelector('.coaches__list');

  var reviewsSlides = document.querySelectorAll('.reviews__item');
  var reviewsPrev = document.querySelector('.reviews__arrow-left');
  var reviewsNext = document.querySelector('.reviews__arrow-right');
  var reviewsPage = document.querySelector('.reviews');

  var btnBuy = document.querySelector('.intro__button');
  var form = document.querySelector('.page-footer__form');
  var name = document.getElementById('form-name');
  var phone = document.getElementById('form-phone');

  // Переключение абонементов

  function switchTabs() {
    function hideTabContent(a) {
      for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.add('hide');
        tabContent[i].classList.remove('show');
        tabs[i].classList.remove('subscriptions__item-month--active');
      }
    }

    hideTabContent(1);

    function showTabContent(b, target) {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
        target.classList.add('subscriptions__item-month--active');
      }
    }

    tabControls.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target && target.classList.contains('subscriptions__item-month')) {
        for (var i = 0; i < tabs.length; i++) {
          if (target === tabs[i]) {
            hideTabContent(0);
            showTabContent(i, target);
            break;
          }
        }
      }
    });
  }

  if (subscriptionsPage) {
    switchTabs();
  }

  // Слайдеры

  function switchSlider(step, slides, prev, next) {
    var startIndex = 0;
    var endIndex = step;

    function showSlide(n, k) {

      slides.forEach(function (item) {
        item.style.display = 'none';
      });

      for (var i = n; i < k; i++) {
        if (slides[i]) {
          slides[i].style.display = 'block';
        }
      }
    }

    showSlide(startIndex, endIndex);

    function plusSlide(n) {
      showSlide(startIndex += n, endIndex += n);
    }


    next.addEventListener('click', function () {
      if (endIndex < slides.length) {
        plusSlide(step);
      }
    });


    prev.addEventListener('click', function () {
      if (startIndex >= step) {
        plusSlide(-step);
      }
    });
  }

  function changeCoachesSlider() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      switchSlider(1, coachesSlides, coachesPrev, coachesNext);
    } else if (window.matchMedia('(max-width: 1199px)').matches) {
      switchSlider(2, coachesSlides, coachesPrev, coachesNext);
    } else {
      switchSlider(4, coachesSlides, coachesPrev, coachesNext);
    }
  }

  if (coachesPage) {
    coachesPrev.classList.remove('no-js');
    coachesNext.classList.remove('no-js');
    changeCoachesSlider();
    window.addEventListener('resize', changeCoachesSlider);
  }

  if (reviewsPage) {
    reviewsPrev.classList.remove('no-js');
    reviewsNext.classList.remove('no-js');
    coachesList.classList.remove('coaches__list--no-js');
    switchSlider(1, reviewsSlides, reviewsPrev, reviewsNext);
  }

  // Плавная прокрутка

  function onBtnBuyClick(evt) {
    evt.preventDefault();
    subscriptionsPage.scrollIntoView({behavior: 'smooth'});
  }

  if (btnBuy) {
    btnBuy.addEventListener('click', onBtnBuyClick);
  }

  // Валидация формы

  function onNameValidate() {
    var value = name.value.trim();
    var reg = /^([А-Я]{1}[а-яё]{1,16}|[A-Z]{1}[a-z]{1,16})$/;

    if (value.length > 0 && reg.test(value) === false) {
      name.setCustomValidity(ERROR_NAME_MESSAGE);
    } else {
      name.setCustomValidity('');
    }
  }

  function onPhoneValidate() {
    var value = phone.value.trim();

    if (value.length < 16) {
      phone.setCustomValidity(ERROR_PHONE_MESSAGE);
    } else {
      phone.setCustomValidity('');
    }
  }

  if (phone) {
    IMask(phone, {mask: '+{7}(000)000-00-00'});
  }

  if (form) {
    name.addEventListener('input', onNameValidate);
    phone.addEventListener('input', onPhoneValidate);

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      form.reset();
    });
  }
});
