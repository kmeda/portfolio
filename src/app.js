import 'gsap';
import '../styles/main.scss';
import './index.pug';
import './libs/jquery.mousewheel.min.js';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';

$(document).ready(function(){


var width = window.innerWidth;
var height = window.innerHeight;

window.addEventListener('resize', function(){
  width = window.innerWidth;
  height = window.innerHeight;

})


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
        .to('.sidebar', 0, {backgroundColor:"rgba(255,255,255,0.7)", borderRight:"1px solid #cdcdcd"})
        .to(['.sidebar', '.outer-most'], 0.2, {left: '0'});

      TweenMax.to('.outer-most', 0.1, {scrollTo: {x: "0"},ease: Power2.easeOut});
      sidebarOpen = false;
      sidePanelLeft = '-75%';

  }, 100);

}

});


// Front area animation

introTimeline();
frontAreaAnimation();
verticalBarsAnimation();
sidebarAnimation();
blinkingPrompt();
goBackIndicator();
forwardIndicator();
dialAnimation();



$('.back').click(function(){
  console.log("Test");
  var tl = new TimelineMax();
  tl.to('.outer-most', .2, {marginLeft: "-60px"})
    .to('.outer-most', .1, {marginLeft: "0"})
    .to('.outer-most', 1, {scrollTo: {x: "0"},ease: Power2.easeOut});

});

$('.forward').click(function(){
  console.log("Test");
  TweenMax.to('.outer-most', 1, {scrollTo: {x: 0.75*$('.outer-most').width()} ,ease: Power2.easeOut});
});

$('.forward').mouseenter(function(){
  tiltDial();
});

$('.forward').mouseleave(function(){
  tiltDial();
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

// Sidebar pull indicator loop
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
            .to('.sidebar', 0, {backgroundColor:"rgb(30, 31, 36)", color: "#ffffff", borderRight:"1px solid #393939"})
            .to(['.sidebar', '.outer-most'], 0.1, {delay: 0.1, left: '0'})
            .to('.side-panel',0.2, {marginLeft: sidePanelLeft, ease: Linear.easeIn});

          setTimeout(function(){
            $("html, body, *").scrollLeft(0);
          }, 500);

    } else {

      var tl = new TimelineMax();
          tl.to('.side-panel', 0.2, {marginLeft: sidePanelLeft, ease: Power0.easeOut})
            .to(['.sidebar', '.outer-most'], 0.1, {left:'-45'})
            .to('.sidebar', 0, {backgroundColor:"rgba(255,255,255,0.7)", color: "#000", borderRight:"1px solid #cdcdcd"})
            .to(['.sidebar', '.outer-most'], 0.2, {left: '0'});
          $("html, body, *").scrollLeft(0);
    }
  });
}

var dialAnimation = function(){
  TweenMax.set(['.outer-circle', '.inner-circle', '.top-dial'], {transformOrigin:"50% 50%"});

  TweenMax.to('.outer-circle', 75, {rotateZtransformOrigin: "center", rotation: -360, repeat: -1})
  TweenMax.to('.inner-circle', 100, {rotateZtransformOrigin: "center", rotation: 360, repeat: -1})

  // TweenMax.to('.top-dial', 1, {rotateZtransformOrigin: "center", transform: "rotateY(45deg)", repeat: -1})
}


var dialTilt = false;
var tiltDial = function(){
  if (!dialTilt) {
    TweenMax.to('#Layer_1', 0.2, {scale: 0.95, rotation: 35});
    dialTilt = true;
  } else {
    TweenMax.to('#Layer_1', 0.2, {scale: 1, rotation: 0});
    dialTilt = false;
  }
}
