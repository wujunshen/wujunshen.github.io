window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;Fluid.utils={listenScroll:function(e){var t=new Debouncer(e);window.addEventListener("scroll",t,false);t.handleEvent();return t},unlistenScroll:function(e){window.removeEventListener("scroll",e)},scrollToElement:function(e,t){var n=jQuery(e).offset();if(n){jQuery("html,body").animate({scrollTop:n.top+(t||0),easing:"swing"})}},elementVisible:function(e,t){t=t&&t>=0?t:0;var n=e.getBoundingClientRect();var i=window.innerHeight||document.documentElement.clientHeight;var o=n.top;return o>=0&&o<=i*(t+1)||o<=0&&o>=-(i*t)-n.height},waitElementVisible:function(e,i,o){var t=typeof window!=="undefined";var n=t&&!("onscroll"in window)||typeof navigator!=="undefined"&&/(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent);if(!t||n){return}o=o&&o>=0?o:0;function r(e){if(Fluid.utils.elementVisible(e,o)){i();return}if("IntersectionObserver"in window){var t=new IntersectionObserver(function(e,t){if(e[0].isIntersecting){i();t.disconnect()}},{threshold:[0],rootMargin:(window.innerHeight||document.documentElement.clientHeight)*o+"px"});t.observe(e)}else{var n=Fluid.utils.listenScroll(function(){if(Fluid.utils.elementVisible(e,o)){Fluid.utils.unlistenScroll(n);i()}})}}if(typeof e==="string"){this.waitElementLoaded(e,function(e){r(e)})}else{r(e)}},waitElementLoaded:function(i,o){var e=typeof window!=="undefined";var t=e&&!("onscroll"in window)||typeof navigator!=="undefined"&&/(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent);if(!e||t){return}if("MutationObserver"in window){var n=new MutationObserver(function(e,t){var n=document.querySelector(i);if(n){o(n);t.disconnect()}});n.observe(document,{childList:true,subtree:true})}else{document.addEventListener("DOMContentLoaded",function(){var t=function(){var e=document.querySelector(i);if(e){o(e)}else{setTimeout(t,100)}};t()})}},createScript:function(e,t){var n=document.createElement("script");n.setAttribute("src",e);n.setAttribute("type","text/javascript");n.setAttribute("charset","UTF-8");n.async=false;if(typeof t==="function"){if(window.attachEvent){n.onreadystatechange=function(){var e=n.readyState;if(e==="loaded"||e==="complete"){n.onreadystatechange=null;t()}}}else{n.onload=t}}var i=document.getElementsByTagName("script")[0]||document.getElementsByTagName("head")[0]||document.head||document.documentElement;i.parentNode.insertBefore(n,i)},createCssLink:function(e){var t=document.createElement("link");t.setAttribute("rel","stylesheet");t.setAttribute("type","text/css");t.setAttribute("href",e);var n=document.getElementsByTagName("link")[0]||document.getElementsByTagName("head")[0]||document.head||document.documentElement;n.parentNode.insertBefore(t,n)},loadComments:function(e,t){var n=document.querySelector("#comments[lazyload]");if(n){var i=function(){t();n.removeAttribute("lazyload")};Fluid.utils.waitElementVisible(e,i,CONFIG.lazyload.offset_factor)}else{t()}}};function Debouncer(e){this.callback=e;this.ticking=false}Debouncer.prototype={constructor:Debouncer,update:function(){this.callback&&this.callback();this.ticking=false},requestTick:function(){if(!this.ticking){requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this)));this.ticking=true}},handleEvent:function(){this.requestTick()}};