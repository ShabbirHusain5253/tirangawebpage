'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
//! Tabs Element Select...
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////

// Smooth Scroll...

btnScrollTo.addEventListener('click',function(e){

  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y) ',window.pageXOffset,window.pageYOffset);

  console.log('height/width viewport',document.documentElement.clientHeight,
  document.documentElement.clientWidth);

  // ! Old Method To Scroll...

  // *Scrolling-->

  // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);

  // window.scrollTo({left: s1coords.left + window.pageXOffset,
  // top: s1coords.top + window.pageYOffset,
  // behavior: 'smooth',});
  
  // ! New Modern Method...
  
  section1.scrollIntoView({behavior: 'smooth'});



});

// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};



btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ! Smooth Scrolling on Nav Links...

//* It Will Set Multiple Copies Of Same Function In Javascript...

// document.querySelectorAll('.nav__link').forEach(function(el){

//   el.addEventListener('click',function(e){

//     e.preventDefault();
//     // console.log('LINK');

//     const id = e.target.getAttribute('href');

//     console.log(id);

//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});

//   });

// });

//! Event Delegation...

document.querySelector('.nav__links').addEventListener('click',function(e){

  console.log('link: ',e.target);

    e.preventDefault();
    // console.log('LINK');

    // ! Check For Class Name On Event Target...


    if(e.target.classList.contains('nav__link'))
    {
      const id = e.target.getAttribute('href');

      console.log(id);

      document.querySelector(id).scrollIntoView({behavior: 'smooth'});

    }


});



//! Event Handle For Activating Tab...

tabsContainer.addEventListener('click',function(e){

  const clicked = e.target.closest('.operations__tab');

  // console.log(clicked);

  // ? Guard Clause...
  if(!clicked) return;

  //! Remove Active Class...
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));


  //! Activate Tabs...
  clicked.classList.add('operations__tab--active');



  //! Activating Content Area....
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


});

//! Menu Fade Animation...
const nav = document.querySelector('.nav');

const handleHover = function(e){

  // console.log(this,e.currentTarget);

  if(e.target.classList.contains('nav__link'))
  {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }


}




//* Passing "arrgument" into event handle using Bind Method...

nav.addEventListener('mouseover',handleHover.bind(0.5));

nav.addEventListener('mouseout',handleHover.bind(1));

/*

//! Making Navigation Bar Sticky...

const intialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll',function(){

  console.log(window.scrollY);

  if(window.scrollY > intialCoords.top)
  {
    nav.classList.add('sticky');
  }
  else
  {
    nav.classList.remove('sticky');
  }

});

*/

//! Sticky Navigation: Intersection Observer API...

// const obsCallBack = function(entries,observer){

//   entries.forEach(entry => {
//     console.log(entry);
//   });

// };

// const obsOptions = {

//   root: null,
//   threshold: 0.1,

// };

// const observer = new IntersectionObserver(obsCallBack,obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);


const stickyNav = function(entries){

  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting)
  {
    nav.classList.add('sticky');
  }
  else
  {
    nav.classList.remove('sticky');
  }

}


const headerObserver = new IntersectionObserver(stickyNav,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

//! Reveal Section Via Intersection Api...

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries,observer){

  const [entry] = entries;
  // console.log(entry);
 
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
   
};

const sectionObserver = new IntersectionObserver(revealSection,{root: null,threshold: 0.15});

allSections.forEach(function(section){

  sectionObserver.observe(section);
  section.classList.add('section--hidden');

});

//! LAZY LOADING IMAGES...

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer)
{

  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;

  //* Replace src with data-src...

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  });

};

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// ! Slider 

// ! Seperating Function From Global Scope...

const slider = function(){

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currSlide = 0;
const maxSlide = slides.length;

// ! All Function In Pack...

const createDots = function(){
  slides.forEach(function(_,i){

    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`);

  });
};

const activateDot = function(slide) {

  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active') ;

};

const goToSlide = function(slide){

  slides.forEach((s,i) => {s.style.transform = `translateX(${100 * (i - slide)}%)`});
};

const nextSlide = function(){

  // console.log(currSlide);

  if(currSlide === maxSlide - 1)
  {
    currSlide = 0;
  }
  else
  {
    currSlide++;
  }

  goToSlide(currSlide);
  activateDot(currSlide);

}

const prevSlide = function(){

  // console.log(currSlide);
  if(currSlide === 0 )
  {
    currSlide = maxSlide - 1;  
  }
  else
  {
    currSlide--; 
  }
  goToSlide(currSlide);
  activateDot(currSlide);

}

//* Intiallize Slider...

const inti = () => {

  createDots();
  activateDot(0);
  goToSlide(0);
};

inti();

//* Event Handlers...

// ! Event For Clicking Arrow...
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

// ! Event For keyboard arrowKeys..
document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  if(e.key === 'ArrowRight') nextSlide();
});

// ! Event For Clicking Dots...

dotContainer.addEventListener('click',function(e){

  // console.log('DOT');
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }

});

};

slider();



////////////////////////////////////////////////////
  //! ------------- LECTURE CODE -----------------
////////////////////////////////////////////////////

//! ------------------------------ Lecture 1 -------------------------------------
/*

// ? To Select Whole Html Elements...

console.log(document.documentElement);

// * To Select Specific Elements...

console.log(document.head);
console.log(document.body);

//! To Select Element Vai Class Or Id...

const header = document.querySelector('.header');
const allSelections = document.querySelectorAll('.section');
console.log('Node List =>',allSelections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log("HTML LIVE OBJECT =>",allButtons);
 
console.log(document.getElementsByClassName('btn')); 

//! Creating And Inserting Element...
//* insertAdjacentHMTL...

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = "We use cookie for improved functionality and analytics";
message.innerHTML = "We use cookie for improved functionality and analytics. <button class='btn btn--close--cookie'>Got It!</button>"

//! We Cannot Use Both Method Simultaniously...

// header.prepend(message); //! Include Child Element To First Position...

header.append(message); //! Include Child Element To Last Position...

// //! To Make Clone Node Of Same Element For Displaying On Both Position...
// header.append(message.cloneNode(true));


//* To Make Appear DOM Element Before/After Parent Node...

// header.before(message);

// header.after(message);

//! Delete Element...

document.querySelector('.btn--close--cookie').addEventListener('click',function(){
  // message.remove(); //! New Functionality 2020

  message.parentElement.removeChild(message);
});
*/

//! ------------------------------ Lecture 2 -------------------------------------

//* Style 

/*

message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.height); //? Class Contianed Or Computed Value...
console.log(message.style.backgroundColor); //! It Will Get Due Inline Style In Html Ele...

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 10 + "px";

// document.documentElement.style.setProperty("--color-primary","orangered");

//* Attributes 

const logo = document.querySelector('.nav__logo');

console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

//! Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute("company","Bankist");

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//* Data Attribute...
console.log(logo.dataset.verNo);

//! Classes...
logo.classList.add('c','j');
logo.classList.remove('c','j');
logo.classList.toggle('c');
logo.classList.contains('c'); //! Not Like Include In Array...

// Don't Use...
// logo.className = 'jonas';

*/

//! ------------------------------ Lecture 3 -------------------------------------



//! ------------------------------ Lecture 4 -------------------------------------
/*

//* Different Types Of Event...

const h1 = document.querySelector('h1');

// console.log(h1);

const alertH1 = function(){

  alert('AddEventListerner: Great! It Works Event Trigger On Mouse Movement H1')
 
  
}

setTimeout(() => h1.removeEventListener('mouseenter',alertH1),10000);

h1.addEventListener('mouseenter',alertH1);

// ! Old School Way...

// h1.onmouseenter = function(){

//   alert('OnMouseenter');


// };
*/

//! ------------------------------ Lecture 5 -------------------------------------

/*

const navLink = document.querySelector('.nav__link');

const navLinks = document.querySelector('.nav__links');

const nav = document.querySelector('.nav');

const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) +min);

const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// console.log(randomColor());

const colorChanger = function(e){

  this.style.backgroundColor = randomColor();

  console.log(this.className,e.target);

  console.log(e.target === this);

  // // Stop Propagation...

  // e.stopPropagation();

};

navLink.addEventListener('click',colorChanger);
navLinks.addEventListener('click',colorChanger);
nav.addEventListener('click',colorChanger);

*/

//! ------------------------------ Lecture 6 -------------------------------------
/*

const h1 = document.querySelector('h1');

// ! Going Downwards : Child 

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); //! It Take All Things...

console.log(h1.children); //? It Takes All Elements...

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// ! Going Upwards : Parents 

console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// ! Going SideVise : Siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){

  if(el !== h1)
  {
    el.style.transform = 'scale(0.5)';
  }


});
*/


//! ------------------------------ Lecture Semi Final -------------------------------------

//* Differnt Lifecycle Of DOM...

// document.addEventListener('DOMContentLoaded',function(e){
//   console.log('HTML parsed and DOM tree Bulit!',e);
// });

// window.addEventListener('load',function(e){
//   console.log('PAGE Is Loaded', e);
// })