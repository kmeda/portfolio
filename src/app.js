import 'gsap';
import '../styles/main.scss';
import './index.pug';
import './libs/jquery.mousewheel.min.js';
import 'gsap/src/uncompressed/plugins/ScrollToPlugin';

$(document).ready(function(){

// var left = $(".side-panel").offset().left;
// console.log(left);

//Vertical Scrolling Library
$("html, body, *").mousewheel(function(event, delta) {

    this.scrollLeft -= (delta * 1);
    event.preventDefault();
// if (this.scrollLeft > 100) {
//
// var left = $(".side-panel").offset().left;
// console.log(left);
// }
//
// if (left < -300) {
//
//   var tl = new TimelineMax();
//   setTimeout(function(){
//     tl
//       .to(['.sidebar', '.outer-most'], 0.3, {left:'-45'})
//       .to(['.sidebar', '.outer-most'], 0.1, {delay: 0.1, left: '0'})
//       .to('.side-panel',0.2, {marginLeft: '-=75%', ease: Linear.easeIn});
//
//     $("html, body, *").scrollLeft(0);
//   }, 500)
//
// }

});

// Front area animation

introTimeline();
frontAreaAnimation();
verticalBarsAnimation();
sidebarAnimation();



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
var sidebarAnimation = ()=> {

  var sidebarOpen = false;
  var sidePanelLeft;
  $('.sidebar').click((e)=>{
    e.stopPropagation();

    sidebarOpen = sidebarOpen === false ? true : false;
    sidePanelLeft = sidePanelLeft === '0' ? '-75%' : '0';

    if (sidebarOpen) {
      var tl = new TimelineMax();
          tl
            .to(['.sidebar', '.outer-most'], 0.3, {left:'-45'})
            .to(['.sidebar', '.outer-most'], 0.1, {delay: 0.1, left: '0'})
            .to('.side-panel',0.2, {marginLeft: sidePanelLeft, ease: Linear.easeIn});

          setTimeout(function(){
            $("html, body, *").scrollLeft(0);
          }, 500);

    } else {
      var tl = new TimelineMax();
          tl.to('.side-panel', 0.2, {marginLeft: sidePanelLeft, ease: Power0.easeOut})
            .to(['.sidebar', '.outer-most'], 0.1, {left:'-45'})
            .to(['.sidebar', '.outer-most'], 0.2, {left: '0'});
          $("html, body, *").scrollLeft(0);


    }

  });


}
