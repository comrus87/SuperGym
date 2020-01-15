'use strict';
var tabs = document.querySelectorAll('.subscriptions__item-month');
var tabControls = document.querySelector('.subscriptions__controls-list');
var tabContent = document.querySelectorAll('.subscriptions__tabs-list');
var subscriptionsPage = document.querySelector('.subscriptions');

var slides = document.querySelectorAll('.coaches__item');
var prev = document.querySelector('.coaches__arrow-left');
var next = document.querySelector('.coaches__arrow-right');
var coachesPage = document.querySelector('.coaches');


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


function switchSlider(step) {
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


function changeSlider() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    switchSlider(1);
  } else if (window.matchMedia('(max-width: 1199px)').matches) {
    switchSlider(2);
  } else {
    switchSlider(4);
  }
}

if (coachesPage) {
  changeSlider();
  window.addEventListener('resize', changeSlider);
}

