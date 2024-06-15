let toggleBtn = document.querySelector(".nav__toggle-btn")
let menu = document.querySelector(".menu")
let menuItems = document.querySelectorAll(".menu__item")
let cover = document.querySelector(".cover")
let resumeListItems = document.querySelectorAll(".resume-list__item")
let portfolioListItems = document.querySelectorAll(".portfolio-list__item")
const sections = document.querySelectorAll("main > section")
let switchBtn = document.querySelector(".switch__btn")
const lightModeIcon = `<svg class="switch__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>`
const darkModeIcon = `<svg class="switch__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>`



if(window.localStorage.getItem("mode") === "dark-mode"){
  document.documentElement.classList.add("dark-mode")
  switchBtn.innerHTML = darkModeIcon
}else{
  document.documentElement.classList.add("light-mode")
}


// Swiper Carusel

const swiper = new Swiper('.swiper-container', {
    direction:'horizental',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
    },
    slidesPerView: 1,
    spaceBetween: 30,

    breakpoints: {
    576: {
      slidesPerView: 2,
    },    
    1200: {
      slidesPerView: 3,
    },
  }
});


// Intersection Observe

const observer = new IntersectionObserver(observeHandler,{threshold:.3})
function observeHandler(sections){
  sections.map(section => {
    let sectionClassName = section.target.className
    let sectionMenuItem = document.querySelector(`.menu__item[section-class=${sectionClassName}]`)
    if(section.isIntersecting){
      sectionMenuItem.classList.add("menu__item--active")
    }else{
      sectionMenuItem.classList.remove("menu__item--active")
    }
  })
}

// custom Functions

function navigationTabsInit(listitems,listItemActiveclass,contentItemShowClass){
  listitems.forEach(ListItem => {
     ListItem.addEventListener("click",function(){
     removeActiveClass(listItemActiveclass)
     removeActiveClass(contentItemShowClass)  
     this.classList.add(listItemActiveclass)
     let contentId = this.getAttribute("data-content-id")
     document.querySelector(contentId).classList.add(contentItemShowClass)     
 })
})
}
function removeActiveClass(className) {document.querySelector(`.${className}`).classList.remove(className)}


// App Navigation Tab Setting Up

navigationTabsInit(resumeListItems,"resume-list__item--active","resume-content--show")
navigationTabsInit(portfolioListItems,"portfolio-list__item--active","portfolio-content--show")

// Event Listener  

toggleBtn.addEventListener("click",function(){
  this.classList.toggle("nav__toggle-btn--open")
  menu.classList.toggle("menu--open")
  cover.classList.toggle("cover--show")
})

switchBtn.addEventListener("click",function(){
  document.documentElement.classList.toggle("dark-mode")
  if(document.documentElement.classList.contains("dark-mode")){
    window.localStorage.setItem("mode","dark-mode")
    this.innerHTML = darkModeIcon
  }else{
    window.localStorage.setItem("mode","light-mode")
    this.innerHTML = lightModeIcon
  }
})


 
// loops

sections.forEach(section => {
  observer.observe(section)
})

menuItems.forEach(menuItem => {
  menuItem.addEventListener("click",function(event){
      event.preventDefault()
      removeActiveClass("menu__item--active")
      this.classList.add("menu__item--active")
      let sectionClass = this.getAttribute("section-class")
      let sectionOffsetTop = document.querySelector(`.${sectionClass}`).offsetTop
      window.scrollTo({
        top : sectionOffsetTop - 120,
        behavior:"smooth"
      })
  })
})