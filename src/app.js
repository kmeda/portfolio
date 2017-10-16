import 'gsap';
import '../styles/main.scss';
import './index.pug';
import './libs/jquery.mousewheel.min.js';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';

$(document).ready(function(){

// var left = $(".side-panel").offset().left;
// console.log(left);

//Vertical Scrolling Library
$(".outer-most").mousewheel(function(event, delta) {

    this.scrollLeft -= (delta * 1);
    event.preventDefault();

var left = $(".side-panel").offset().left;

if (sidebarOpen && left < -300) {
  console.log(left);
  setTimeout(function(){
    var tl = new TimelineMax();

      tl.to('.side-panel', 0.2, {marginLeft: "-75%", ease: Power0.easeOut})
        .to(['.sidebar', '.outer-most'], 0.1, {left:'-45'})
        .to(['.sidebar', '.outer-most'], 0.2, {left: '0'});

      TweenMax.to('.outer-most', 0.1, {scrollTo: {x: "0"},ease: Power2.easeOut});
      sidebarOpen = false;
      sidePanelLeft = '-75%';

  }, 100);

}

});

// $('.skills').mousewheel(function(e, d){
//   this.scrollLeft = 0;
//   this.scrollTop -= (d * 10);
//
// });

// Front area animation

introTimeline();
frontAreaAnimation();
verticalBarsAnimation();
sidebarAnimation();
blinkingPrompt();
goBackIndicator();
forwardIndicator();



$('.back').click(function(){
  console.log("Test");

  TweenMax.to('.outer-most', 1, {scrollTo: {x: "0"},ease: Power2.easeOut});

});

$('.forward').click(function(){
  console.log("Test");

  TweenMax.to('.outer-most', 1, {scrollTo: {x: 0.5*$('.outer-most').width()+15} ,ease: Power2.easeOut});

});

});




// All Functions

var introTimeline = () => {
  //fade in video
  //overlay video
  //move in frontAreaAnimation
  //movein sidebar and controls
}


var frontAreaAnimation = () => {

}

//Blinking prompt
var blinkingPrompt = function(){
  var tl = new TimelineMax();
  tl.to('.blink', 0.8, {opacity: 0})
    .to('.blink', 1, {opacity: 1})
  tl.repeat(-1);
}


var goBackIndicator = function(){
  var tl = new TimelineMax();
  tl.to('.back', 2, {delay: 1.5, transform: "translateX(15px)"})
    .to('.back', 1.5, {transform: "translateX(0px)", ease: Elastic.easeOut})

  tl.repeat(-1);
}

var forwardIndicator = function(){
  var tl = new TimelineMax();
  tl.to('.forward', 2, {delay: 1.5, transform: "translateX(-15px)"})
    .to('.forward', 1.5, {transform: "translateX(0px)", ease: Elastic.easeOut})

  tl.repeat(-1);
}

// Sidebar pull indicator loop
var verticalBarsAnimation = () => {
  var tl = new TimelineMax({repeat:-1, repeatDelay:2.5});

  tl.to('.v-bar-a', 0.2, {height: '-=10px', ease: Power0.easeIn})
    .to('.v-bar-b', 0.2, {height: '-=10px', ease: Power0.easeIn})
    .to('.v-bar-a', 0.2, {height: '+=10px', ease: Power0.easeIn})
    .to('.v-bar-b', 0.2, {height: '+=10px', ease: Power0.easeIn})

  tl.delay(2)
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
      console.log("Test");
      console.log(sidePanelLeft);
      var tl = new TimelineMax();
          tl
            .to(['.sidebar', '.outer-most'], 0.3, {left:'-45'})
            .to(['.sidebar', '.outer-most'], 0.1, {delay: 0.1, left: '0'})
            .to('.side-panel',0.2, {marginLeft: sidePanelLeft, ease: Linear.easeIn});

          setTimeout(function(){
            $("html, body, *").scrollLeft(0);
          }, 500);

    } else {
      console.log(sidePanelLeft);
      var tl = new TimelineMax();
          tl.to('.side-panel', 0.2, {marginLeft: sidePanelLeft, ease: Power0.easeOut})
            .to(['.sidebar', '.outer-most'], 0.1, {left:'-45'})
            .to(['.sidebar', '.outer-most'], 0.2, {left: '0'});
          $("html, body, *").scrollLeft(0);

    }

  });


}
