'use strict';
var tabs = document.querySelectorAll('.subscriptions__item-month');
var tabControls = document.querySelector('.subscriptions__controls-list');
var tabContent = document.querySelectorAll('.subscriptions__tabs-list');
var subscriptionsPage = document.querySelector('.subscriptions');


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
