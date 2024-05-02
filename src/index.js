import './index.js';
import './index.html';
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';
import { Video, SoundPlayer, FullScreen, Trailer, SavePlayer, ViewPlayer, BanPlayer, FullVideo, Tabs, optionSwiper, Description, Stars, actorsSwiper, Names, reviewsSwiper, ReviewRating, ReviewMore } from './modules/module.js';
import videojs from "!video.js";
require('!style-loader!css-loader!video.js/dist/video-js.css');
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";
import './index.scss';
var videoName = [];
var timerIds = [];
var item = 0;

function Burger() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        menu.classList.toggle('menu--show');
        document.body.classList.toggle('body--active')
    })
}
Burger();

function Search() {
    const header = document.querySelector('.header');
    const searchBtn = document.querySelector('.header__search');
    const searchInput = document.querySelector('.header__inputwrapper');
    const menu = document.querySelector('.menu');
    const close = document.querySelector('.header__input-btn');
    searchBtn.addEventListener('click', () => {
        searchInput.classList.add('header__inputwrapper--active');
        menu.classList.add('menu--active');
        searchBtn.setAttribute('disabled', '');
        header.classList.add('header--active');
    })
    close.addEventListener('click', () => {
        searchInput.classList.remove('header__inputwrapper--active');
        menu.classList.remove('menu--active');
        searchBtn.removeAttribute('disabled');
        header.classList.remove('header--active');
    })
}
Search();


const swiper = new Swiper('.swiper-container-1', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1.1,
    centeredSlides: true,
    loopAdditionalSlides: 30,
    initialSlide: 0,
    speed: 1000,
    navigation: {
        nextEl: '.top-button-next',
        prevEl: '.top-button-prev',
        container: 'swiper-container-1',
    },
    breakpoints: {
        1160: {
            slidesPerView: 1.7,
        },
        950: {
            slidesPerView: 1.5,
        },
        600: {
            slidesPerView: 1.2,
            spaceBetween: 20,
        }
    },
    on: {
        init: function () {
            videoName = document.querySelectorAll('.treck');
            var poster = document.querySelectorAll('.treck-poster');
            var videoInfo = document.querySelectorAll('.treck__info');
            var playTimerId = setTimeout(function () {
                videoName[2].play();
                poster[2].classList.add('video-poster--hidden');
            }, 3000);
            var soundTimerId = setTimeout(function () {
                videoInfo[2].classList.add('video__info--active');
            }, 5000);
            timerIds.push(playTimerId, soundTimerId);
            videoName[2].addEventListener('ended', () => {
                poster[2].classList.remove('video-poster--hidden');
                videoInfo[2].classList.remove('video__info--active');
            })
        },

        slideChangeTransitionEnd: function () {
            var activeSlide = document.querySelector('.swiper-slide-active');
            var videoActiveName = activeSlide.getAttribute('video');
            var videoAllName = document.querySelectorAll('.treck');
            var poster = document.querySelectorAll('.treck-poster');
            var videoInfo = document.querySelectorAll('.treck__info');
            timerIds.forEach(timerId => {
                clearTimeout(timerId);
            });
            timerIds.splice(0, timerIds.length);
            videoAllName.forEach((item, index) => {
                item.pause();
                poster[index].classList.remove('video-poster--hidden');
                videoInfo[index].classList.remove('video__info--active');
                if (item.id == videoActiveName) {
                    var playTimerId = setTimeout(function () {
                        item.play();
                        poster[index].classList.add('video-poster--hidden');
                    }, 3000);
                    var soundTimerId = setTimeout(function () {
                        videoInfo[index].classList.add('video__info--active');
                    }, 5000);
                    timerIds.push(playTimerId, soundTimerId);
                    item.addEventListener('ended', () => {
                        poster[index].classList.remove('video-poster--hidden');
                        videoInfo[index].classList.remove('video__info--active');
                    })
                }
            })

        },
    }
})

function Sound() {
    const sound = document.querySelectorAll('.video-sound');
    const video = document.querySelectorAll('.video');
    sound.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('video-sound--active');
            video[index].muted == false ? video[index].muted = true : video[index].muted = false;
        })
    })
}
Sound();

function Rating() {
    const rating = document.querySelectorAll('.video__info-rating');
    rating.forEach(item => {
        if (item.innerHTML >= 8) {
            item.style.background = 'rgb(55, 168, 121)';
        }
        else if (item.innerHTML >= 5) {
            item.style.background = '#70717283';
        }
        else {
            item.style.background = '#e74949';
        }
    })
}
Rating();

const swiperCategory = new Swiper('.swiper-container-2', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    slidesPerGroup: 1,
    allowTouchMove: true,
    breakpoints: {
        900: {
            slidesPerGroup: 5,
        },
        700: {
            slidesPerGroup: 4,
        },
        600: {
            slidesPerGroup: 3,
        },
        450: {
            slidesPerGroup: 2,
        }
    },
    navigation: {
        nextEl: '.category-button-next',
        prevEl: '.category-button-prev',
        container: '.swiper-object',
        disabledClass: 'category-button-disabled'
    }
})


function sliderinit() {
    const sliders = document.querySelectorAll('.swiper-container-3');
    const slidersContainer = document.querySelectorAll('.swiper-object-2');
    const sliderBtnPrev = document.querySelectorAll('.film-button-prev');
    const sliderBtnNext = document.querySelectorAll('.film-button-next');
    let mySwipers = [];
    sliders.forEach((slider, index) => {
        if (!slider.swiper) {
            mySwipers[index] = new Swiper(slider, {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 1,
                speed: 500,

                breakpoints: {
                    1300: {
                        slidesPerView: 7,
                        speed: 1000,
                        slidesPerGroup: 5,
                        spaceBetween: 20,
                    },
                    1050: {
                        slidesPerView: 6,
                        speed: 1000,
                        slidesPerGroup: 5,
                        spaceBetween: 20,
                    },
                    850: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        speed: 1000,
                        spaceBetween: 20,
                    },
                    650: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        speed: 1000,
                        spaceBetween: 20,
                    },
                    500: {
                        slidesPerView: 3,
                        slidesPerGroup: 2,
                        speed: 500,
                        spaceBetween: 20,
                    },
                    400: {
                        spaceBetween: 20,
                        speed: 500,
                        slidesPerGroup: 1,
                        slidesPerView: 2,
                    },
                },
                navigation: {
                    nextEl: sliderBtnNext[index],
                    prevEl: sliderBtnPrev[index],
                    container: slidersContainer[index],
                    disabledClass: 'film-button-disabled'
                },

                on: {
                    init: function () {
                        Text();
                    },
                    slideChangeTransitionEnd: function () {
                        Text();
                    }
                }
            })
        } else {
            return;
        }
    })
}
sliderinit();


function Lines() {
    const lineData = document.querySelectorAll('.line-data');
    const line = document.querySelectorAll('.line');
    line.forEach((item, index) => {
        item.style.setProperty('--data', `${lineData[index].innerHTML * 10}%`);
    })
}
Lines();

function Graphik() {
    const graphikData = document.querySelectorAll('.film__graphik-data');
    const graphik = document.querySelectorAll('.film__graphik');
    graphik.forEach((item, index) => {
        item.style.setProperty('--graph', `${graphikData[index].innerHTML * 10}%`);
    })
}
Graphik();

function Save() {
    const saveBtn = document.querySelectorAll('.film__feedback-save');
    const Card = document.querySelectorAll('.film-wrapper');
    saveBtn.forEach((item, index) => {
        item.addEventListener('click', () => {
            item.firstElementChild.name == 'bookmark-outline' ? item.firstElementChild.name = 'bookmark' : item.firstElementChild.name = 'bookmark-outline';
            Card[index].classList.toggle('film--saved');
        })
    })
}
Save();

function View() {
    const view = document.querySelectorAll('.film__feedback-viewing');
    const Card = document.querySelectorAll('.film-wrapper');
    view.forEach((item, index) => {
        item.addEventListener('click', () => {
            Card[index].classList.toggle('film--view');
        })
    })
}
View();

function Text() {
    const text = document.querySelectorAll('.film__feedback-text');
    text.forEach((item, index) => {
        const pos = item.getBoundingClientRect();
        const dist = window.innerWidth - pos.left;
        if (dist < 250) {
            item.style.right = 0;
            item.style.left = 'auto';
        }
        else {
            item.style.right = 'auto';
            item.style.left = '-5px';
        }
    })
}


function Banner() {
    var banner = document.querySelector('.banner');
    var nameVideo = document.querySelector('.banner-video');
    var poster = document.querySelector('.banner-poster');
    var videoInfo = document.querySelector('.banner-info');
    window.addEventListener('scroll', () => {
        if (isElementInViewport(banner) && nameVideo.paused) {
            setTimeout(function () {
                nameVideo.play();
                poster.classList.add('video-poster--hidden');
            }, 3000);
            setTimeout(function () {
                videoInfo.classList.add('video__info--active');
            }, 5000)
        }
    })

}
if (document.body.getAttribute('page') == 1) {
    Banner();
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const weekSwiper = new Swiper('.swiper-container-4', {
    slidesPerView: 1.25,
    spaceBetween: 0,
    slidesPerGroup: 1,
    speed: 500,

    breakpoints: {
        1200: {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesPerGroup: 3,
            speed: 1000,
        },
        970: {
            slidesPerView: 4,
            slidesPerGroup: 3,
            speed: 1000,
        },
        750: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            speed: 1000,
        },
        580: {
            slidesPerView: 2.5,
            slidesPerGroup: 2,
            speed: 500,
        },
        470: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            speed: 500,
        },
        340: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            speed: 500,
        }
    },

    navigation: {
        prevEl: '.week-button-prev',
        nextEl: '.week-button-next',
        container: '.swiper-object-3',
        disabledClass: 'week-button-disabled'
    }
})

const collectionSwiper = new Swiper('.swiper-container-5', {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 500,
    slidesPerGroup: 1,

    breakpoints: {
        1130: {
            slidesPerView: 'auto',
            spaceBetween: 10,
            speed: 1000,
            slidesPerGroup: 3,
        },
        850: {
            slidesPerView: 3,
            spaceBetween: 10,
            speed: 1000,
            slidesPerGroup: 3,
        },
        700: {
            slidesPerView: 2.5,
            spaceBetween: 10,
            speed: 1000,
            slidesPerGroup: 2,
        },
        500: {
            slidesPerView: 2,
            spaceBetween: 10,
            speed: 500,
            slidesPerGroup: 2,
        },
        400: {
            slidesPerView: 1.5,
            spaceBetween: 10,
            speed: 500,
            slidesPerGroup: 1,
        }
    },

    navigation: {
        prevEl: '.collection-button-prev',
        nextEl: '.collection-button-next',
        container: 'swiper-object-4',
        disabledClass: 'collection-button-disabled'
    },

    on: {
        init: function () {
            const collection = document.querySelector('.collection');
            const activeSlide = collection.querySelector('.swiper-slide-active');
            activeSlide.classList.add('collection-slide--active');
        },
        slideChangeTransitionEnd: function () {
            const slides = document.querySelectorAll('.collection__slider-slide');
            const collection = document.querySelector('.collection');
            const activeSlide = collection.querySelector('.swiper-slide-active');
            slides.forEach(item => { item.classList.remove('collection-slide--active') });
            activeSlide.classList.add('collection-slide--active');
        }
    }
})

function Collection() {
    const collection = document.querySelectorAll('.collection__items');
    if (window.innerWidth <= 700) {
        collection.forEach(item => {
            item.classList.remove('collection__items-hover');
        })
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 700) {
            collection.forEach(item => {
                item.classList.remove('collection__items-hover');
            })
        } else {
            collection.forEach(item => {
                item.classList.add('collection__items-hover');
            })
        }
    })
}
Collection();

function HiddenImg() {
    const hiddenLeft = document.querySelectorAll('.collection__img-left');
    const hiddenRight = document.querySelectorAll('.collection__img-right');
    const item = document.querySelectorAll('.collection__item');
    item.forEach((item, index) => {
        item.style.setProperty('--image-1', `url('${hiddenLeft[index].getAttribute('src')}')`);
        item.style.setProperty('--image-2', `url('${hiddenRight[index].getAttribute('src')}')`);
    })
}
HiddenImg();

function Footer() {
    const footerTitle = document.querySelectorAll('.footer__list-title');
    const footerList = document.querySelectorAll('.footer__list');
    footerTitle.forEach((item, index) => {
        item.addEventListener('click', () => {
            item.classList.toggle('footer__list-title--active');
            footerList[index].classList.toggle('footer__list--active');
        })
    })
}
Footer();

// PAGE-2
if (document.body.getAttribute('page') == 2) {
    Video();
    SoundPlayer(), FullScreen(), Trailer(), SavePlayer(), ViewPlayer(), BanPlayer(), FullVideo(), Tabs(), Description(), Stars(), Names(), ReviewRating(), ReviewMore();
}

// var userAgent = navigator.userAgent;
// if (/Mobi|Android/i.test(userAgent)) {
// } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {

// } else {

// }






