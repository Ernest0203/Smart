window.addEventListener("load",function(){"use strict";!function(){function e(e){e.preventDefault(),i.classList.remove("overlay--show"),n.classList.remove("menu--show"),document.body.style.overflow=""}var t=document.querySelector(".menu-toggler"),n=document.querySelector(".menu"),i=document.querySelector(".overlay"),o=n.querySelectorAll("a");t.onclick=function(e){e.preventDefault(),n.classList.add("menu--show"),i.classList.add("overlay--show"),i.classList.contains("overlay--show")&&(document.body.style.overflow="hidden")},i.onclick=function(){i.classList.remove("overlay--show"),n.classList.remove("menu--show"),i&&(document.body.style.overflow="")};for(var r=0;r<o.length;r++)o[r].onclick=e;window.onscroll=function(){window.pageYOffset>100?t.classList.add("menu-toggler--fixed"):t.classList.remove("menu-toggler--fixed")}}(),function(){for(var e,t=document.querySelectorAll(".tabs-nav__link"),n=document.querySelectorAll(".tabs__item"),i=0,o=function(e,t){e.addEventListener("click",function(e){e.preventDefault(),r(t)})},r=function(e){e!==i&&e>=0&&e<=t.length&&(t[i].classList.remove("tabs-nav__link--active"),t[e].classList.add("tabs-nav__link--active"),n[i].classList.remove("tabs__item--active"),n[e].classList.add("tabs__item--active"),i=e)},e=0;e<t.length;e++){var s=t[e];o(s,e)}}()}),$(document).ready(function(){$('a[href^="#"]').on("click",function(e){e.preventDefault();var t=this.hash,n=$(t);$("html, body").stop().animate({scrollTop:n.offset().top},900,"swing",function(){window.location.hash=t})}),$(".carousel").slick({dots:!0,fade:!1,slidesToShow:2,slidesToScroll:1,autoplay:!0}),$(".slick-prev").html($(".prev").html()),$(".slick-next").html($(".next").html()),$(".slick-dots > li > button").html("")});