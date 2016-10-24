window.addEventListener('load', function () {
  'use strict';
  
  (function menuShow() {
    var toggler = document.querySelector('.menu-toggler'),
        menu = document.querySelector('.menu'),
        overlay = document.querySelector('.overlay'),
        link = menu.querySelectorAll('a');
    
    toggler.onclick = function(e){
        e.preventDefault();
        menu.classList.add('menu--show');
        overlay.classList.add('overlay--show');
        
        if (overlay.classList.contains('overlay--show')) {
            document.body.style.overflow = "hidden";
        }
    };
    overlay.onclick = function () {
        overlay.classList.remove('overlay--show');
        menu.classList.remove('menu--show');
        
        if (overlay) {
            document.body.style.overflow = "";
        }
    };
    
    function linkClick(e) {
        e.preventDefault()
        overlay.classList.remove('overlay--show');
        menu.classList.remove('menu--show');
        document.body.style.overflow = "";
    }
    for(var i = 0; i < link.length; i++) {
        link[i].onclick = linkClick;
    }
    
    window.onscroll = function () {
      if(window.pageYOffset > 100){
        toggler.classList.add('menu-toggler--fixed')
      }
      else {
        toggler.classList.remove('menu-toggler--fixed')
      }
    };
  })();
  
  (function tabActions() {
    var tabsNav = document.querySelectorAll('.tabs-nav__link'),
        tabs = document.querySelectorAll('.tabs__item'),
        activeIndex = 0,
        i;
        
    var handleClick = function(link, index) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        goToTab(index);
      });
    };
    var goToTab = function(index) {
      if (index !== activeIndex && index <= tabsNav.length) {
      tabsNav[activeIndex].classList.remove('tabs-nav__link--active');
      tabsNav[index].classList.add('tabs-nav__link--active');
      tabs[activeIndex].classList.remove('tabs__item--active');
      tabs[index].classList.add('tabs__item--active');
      activeIndex = index;
    }
    };
    for (var i = 0; i < tabsNav.length; i++) {
      var link = tabsNav[i];
      handleClick(link, i);
    }
  })();
 });

$(document).ready(function () {
  
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();
    var target = this.hash;
    var $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  });
  
  $('.carousel').slick({
    dots: true,
    fade: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true
  });
  
  $('.slick-prev').html($('.prev').html());
  $('.slick-next').html($('.next').html());
  $('.slick-dots > li > button').html('');
});