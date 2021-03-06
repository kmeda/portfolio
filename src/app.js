import 'gsap';
import '../styles/main.scss';
import './index.pug';
import './libs/jquery.mousewheel.min.js';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';
import { TweenMax, Elastic, TimelineMax, Linear, Power0, Power4 } from 'gsap';

$(window).on('load', function(){

  verticalBarsAnimation();
  sidebarAnimation();
  blinkingPrompt();
  goBackIndicator();
  forwardIndicator();
  dialAnimation();
  animateSkills();



// All Events /----/----/



$(window).resize(function(){
  width = document.body.clientWidth;
  height = document.body.clientHeight;
});

//Vertical Scrolling
$(".outer-most").mousewheel(function(event, delta) {

    this.scrollLeft -= (delta * 2);
    event.preventDefault();

var left = $(".side-panel").offset().left;

if (sidebarOpen && left < -300) {

  setTimeout(function(){
    var tl = new TimelineMax();

      tl.to('.side-panel', 0.2, {marginLeft: "-75%", ease: Power0.easeOut})
        .to(['.sidebar', '.outer-most'], 0.1, {left:'-45'})
        .to('.sidebar', 0, {backgroundColor:"rgb(30, 31, 36)", borderRight:"1px solid #393939"})
        .to(['.sidebar', '.outer-most'], 0.2, {left: '0'});

      TweenMax.to('.outer-most', 0.1, {scrollTo: {x: "0"},ease: Power2.easeOut});
      sidebarOpen = false;
      sidePanelLeft = '-75%';

  }, 100);

}

});

$('.go-back-indicator').click(function(){

  var tl = new TimelineMax();

  tl.to('.outer-most', .2, {marginLeft: "-60px"})
    .to('.outer-most', .1, {marginLeft: "0"})
    .to('.outer-most', 1, {scrollTo: {x: "0"},ease: Power2.easeOut});
});

$('.forward').click(function(){
  TweenMax.to('.outer-most', 1, {scrollTo: {x: 0.75*$('.outer-most').width()} ,ease: Power2.easeOut});
});

$('.forward').mouseenter(function(){
  tiltDial();
});

$('.forward').mouseleave(function(){
  tiltDial();
});

$('.overlay').each(function(i, elem){

  $(this).mouseenter(function(){
      TweenMax.to($(this).children(".popup"), .2, {'top': '40%', ease: Linear.easeNone});
      TweenMax.to($(this).children(".count"), 1.5, {'top': '40%', ease: Elastic.easeOut});
      TweenMax.to($(this).find(".stack"), 1.5, {'top': '50%', ease: Elastic.easeOut});
      TweenMax.to($(this).find(".github"), 1.5, {'bottom': '10%', ease: Elastic.easeOut});
      TweenMax.to($(this).find(".live-link"), 1.5, {'bottom': '10%', ease: Elastic.easeOut});
    });

    $(this).mouseleave(function(){
      TweenMax.to($(this).children(".popup"), .2, {'top': '100%', ease: Linear.easeNone});
      TweenMax.to($(this).children(".count"), .2, {'top': '0%', ease: Linear.easeNone});
      TweenMax.to($(this).find(".stack"), .3, {'top': '100%', ease: Linear.easeNone});
      TweenMax.to($(this).find(".github"), .3, {'bottom': '-10%', ease: Linear.easeNone});
      TweenMax.to($(this).find(".live-link"), .3, {'bottom': '-10%', ease: Linear.easeNone});
    });
});


});


// All functions

var width = document.body.clientWidth;

//Blinking prompt
var blinkingPrompt = function(){
  var tl = new TimelineMax({repeat: -1});
  tl.to('.blink', 0.8, {opacity: 0})
    .to('.blink', 1, {opacity: 1})
}


var goBackIndicator = function(){
  var tl = new TimelineMax({repeat: -1});
  tl.to('.back', 2, {delay: 1.5, transform: "translateX(15px)"})
    .to('.back', 1.5, {transform: "translateX(0px)", ease: Elastic.easeOut});
}

var forwardIndicator = function(){
  var tl = new TimelineMax({repeat: -1});
  tl.to('.forward', 2, {delay: 1.5, transform: "translateX(-15px)"})
    .to('.forward', 1.5, {transform: "translateX(0px)", ease: Elastic.easeOut});

}

// Sidebar pull indicator
var verticalBarsAnimation = () => {
  var tl = new TimelineMax({repeat:-1, repeatDelay:2.5});

  tl.to('.v-bar-a', 0.2, {height: '-=10px', ease: Power0.easeIn})
    .to('.v-bar-b', 0.2, {height: '-=10px', ease: Power0.easeIn})
    .to('.v-bar-a', 0.2, {height: '+=10px', ease: Power0.easeIn})
    .to('.v-bar-b', 0.2, {height: '+=10px', ease: Power0.easeIn});

}

// Side panel Pull Animation
var sidebarOpen = false;
var sidePanelLeft = "-75%";
var sidebarAnimation = ()=> {

  $('.sidebar').click((e)=>{
    e.stopPropagation();

    sidebarOpen = sidebarOpen === false ? true : false;
    sidePanelLeft = sidePanelLeft === '-75%' ? '0' : '-75%';

    if (sidebarOpen) {
      var tl = new TimelineMax();
          tl
            .to(['.sidebar', '.outer-most'], 0.3, {left:'-45'})
            .to('.sidebar', 0, {backgroundColor:"#000", color: "#ffffff", borderRight:"1px solid #393939"})
            .to(['.sidebar', '.outer-most'], 0.1, {delay: 0.1, left: '0'})
            .to('.side-panel',0.2, {marginLeft: sidePanelLeft, ease: Linear.easeIn});

          setTimeout(function(){
            $("html, body, *").scrollLeft(0);
          }, 500);

    } else {

      var tl = new TimelineMax();
          tl.to('.side-panel', 0.2, {marginLeft: sidePanelLeft, ease: Power0.easeOut})
            .to(['.sidebar', '.outer-most'], 0.1, {left:'-45'})
            .to('.sidebar', 0, {backgroundColor:"rgb(30, 31, 36)", color: "#ffffff", borderRight:"1px solid #393939"})
            .to(['.sidebar', '.outer-most'], 0.2, {left: '0'});
          $("html, body, *").scrollLeft(0);
    }
  });
}

// Dial Rotation
var dialAnimation = function(){
  TweenMax.set(['.outer-circle', '.inner-circle', '.top-dial'], {transformOrigin:"50% 50%"});
  TweenMax.to('.outer-circle', 150, {rotateZtransformOrigin: "center", rotation: -360, ease: Linear.easeNone, repeat: -1})
  TweenMax.to('.inner-circle', 200, {rotateZtransformOrigin: "center", rotation: 360, ease: Linear.easeNone, repeat: -1})
};


// Tilt dial on mouse over forward-indicator
var dialTilt = false;
var tiltDial = function(){
  if (!dialTilt) {
    TweenMax.to('#Layer_1', 0.2, {scale: 0.95, rotation: 35});
    dialTilt = true;
  } else {
    TweenMax.to('#Layer_1', 0.2, {scale: 1, rotation: 0});
    dialTilt = false;
  }
};


// Animate skill set
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

var elem = $(`.level`).children();
var animateSkills = function(){
  var arr = [70, 67, 65, 70, 60, 55, 60, 39];
  
  for(var i = 0; i < arr.length; i++){
    var time = getRandomFloat(0.9, 1.5);
    TweenMax.to(elem[i], time, {width: arr[i]+'%', ease: Elastic.easeInOut, delay: 0.75});
  }
}
