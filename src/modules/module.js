export { Video, SoundPlayer, FullScreen, Trailer, SavePlayer, ViewPlayer, BanPlayer, FullVideo, Tabs, optionSwiper, Description, Stars, actorsSwiper, Names, reviewsSwiper, ReviewRating, ReviewMore };
import videojs from "!video.js";
require('!style-loader!css-loader!video.js/dist/video-js.css');
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";
let fullscreenButton = null;
const Video = function () {
    const video = document.querySelector('.player-video');
    const videoPoster = document.querySelector('.player-poster');
    setTimeout(function () {
        video.play();
        videoPoster.classList.add('video-poster--hidden');
    }, 3000)
    video.addEventListener('ended', () => {
        videoPoster.classList.remove('video-poster--hidden');
    })
}

const SoundPlayer = function () {
    const sound = document.querySelectorAll('.player-sound');
    const video = document.querySelector('.player-video');
    sound.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('player-sound--active');
            video.muted == false ? video.muted = true : video.muted = false;
        })
    })
}

const FullScreen = function () {
    const full = document.querySelector('.player-full');
    const video = document.querySelector('.player-video');
    full.addEventListener('click', () => {
        video.requestFullscreen();
        fullscreenButton = 'button1';
        video.classList.add('player-video--full');
    })
}

const Trailer = function () {
    var time;
    const video = document.querySelector('.player-video');
    const trailer = document.querySelector('.player__btns-trailer');
    trailer.addEventListener('click', () => {
        video.requestFullscreen();
        time = video.currentTime;
        video.currentTime = 0;
        video.muted = false;
        fullscreenButton = 'button2';
        video.classList.add('player-video--full');
    })
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
            video.classList.remove('player-video--full');
            video.muted = true;
            if (fullscreenButton == 'button2') {
                video.currentTime = time;
            }
        }
    })
}

const SavePlayer = function () {
    const save = document.querySelector('.player__btns-save');
    const item = document.querySelector('.player__item');
    save.addEventListener('click', () => {
        save.firstElementChild.name == 'bookmark-outline' ? save.firstElementChild.name = 'bookmark' : save.firstElementChild.name = 'bookmark-outline';
        item.classList.toggle('film--save');
    })
}

const ViewPlayer = function () {
    const view = document.querySelector('.player__btns-view');
    const item = document.querySelector('.player__item');
    view.addEventListener('click', () => {
        item.classList.toggle('film--view');
    })
}

const BanPlayer = function () {
    const fan = document.querySelector('.player__btns-break');
    fan.addEventListener('click', () => {
        const item = document.querySelector('.player__item');
        item.classList.toggle('film--ban');
    })
}

const FullVideo = function () {
    const player = videojs("vid1", {});
    const FullVideoBtn = document.querySelector('.player__btns-subscribe');
    const FullVideoWindow = document.querySelector('.full-video');
    const FullVideoClose = document.querySelector('.full-video__close');
    const trailer = document.querySelector('.player-video');
    const FullFideoTitle = document.querySelector('.full-video__titles');
    const Overlay = document.querySelector('.overlay-gradient');
    var curText, durText;

    FullVideoBtn.addEventListener('click', () => {
        FullVideoWindow.classList.add('full-video--active');
        player.play();
        player.volume(0.5);
        document.body.style.overflow = 'hidden';
        trailer.pause();
    })
    FullVideoClose.addEventListener('click', () => {
        document.body.style.overflow = 'visible';
        document.body.style.overflowX = 'hidden';
        player.pause();
        FullVideoWindow.classList.remove('full-video--active');
        trailer.play();
    })
    player.on('userinactive', function () {
        FullFideoTitle.classList.add('full-video__titles--active');
        FullVideoClose.classList.add('full-video__close--active');
        Overlay.classList.add('overlay-gradient--active');
    })
    player.on('useractive', function () {
        FullFideoTitle.classList.remove('full-video__titles--active');
        FullVideoClose.classList.remove('full-video__close--active');
        Overlay.classList.remove('overlay-gradient--active');
    })
    player.on('timeupdate', function () {
        var time = player.currentTime();
        // var curTime = format(time);
        curText.innerText = new Date(time * 1000).toISOString().slice(11, 19);

    })
    player.on('loadedmetadata', function () {
        var durTime = player.duration();
        durText.innerHTML = format(durTime);
    })

    player.ready(function () {
        var timeBlock = this.controlBar.addChild('Component', {}, 0);
        timeBlock.addClass("my-image");
        curText = document.createElement('span');
        var slesh = document.createElement('span');
        slesh.innerText = ' / ';
        durText = document.createElement('span');
        timeBlock.el().appendChild(curText);
        timeBlock.el().appendChild(slesh);
        timeBlock.el().appendChild(durText);
    });

}

function format(s) {
    var h = Math.floor(s / 3600);
    h = (h >= 10) ? h : '0' + h;
    var m = Math.floor(s / 60);
    m = (m >= 10) ? m : '0' + m;
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : '0' + s;
    return h + ':' + m + ':' + s;
}

function Tabs() {
    const tab = document.querySelectorAll('.tab');
    const siblings = el => [].slice.call(el.parentNode.children).filter(child => (child !== el));
    tab.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            siblings(item).forEach((el) => {
                el.classList.remove('tab--active');
                document.querySelector(el.getAttribute('href')).classList.remove('tabs-content--active');
            })
            item.classList.add('tab--active');
            document.querySelector(item.getAttribute('href')).classList.add('tabs-content--active');
        })
    })
}

const optionSwiper = new Swiper('.swiper-container-6', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    speed: 500,
    slidesPerGroup: 1,
    breakpoints: {
        1150: {
            spaceBetween: 15,
            speed: 1000,
            slidesPerGroup: 3,
        },
        800: {
            spaceBetween: 15,
            speed: 1000,
            slidesPerGroup: 2,
        },
    },
    navigation: {
        prevEl: '.options-button-prev',
        nextEl: '.options-button-next',
        container: 'swiper-object-5',
        disabledClass: 'options-button-disabled'
    }
})

const actorsSwiper = new Swiper('.swiper-container-7', {
    slidesPerView: 3.5,
    spaceBetween: 10,
    speed: 500,
    slidesPerGroup: 2,
    breakpoints: {
        1100: {
            slidesPerView: 'auto',
            spaceBetween: 25,
            speed: 1000,
            slidesPerGroup: 3,
        },
        900: {
            slidesPerView: 7,
            spaceBetween: 25,
            speed: 1000,
            slidesPerGroup: 3,
        },
        670: {
            slidesPerView: 6,
            spaceBetween: 25,
            speed: 1000,
            slidesPerGroup: 3,
        },
        540: {
            slidesPerView: 5,
            spaceBetween: 25,
            speed: 500,
            slidesPerGroup: 3,
        },
        400: {
            slidesPerView: 4,
            spaceBetween: 20,
            speed: 500,
            slidesPerGroup: 3,
        }
    },
    navigation: {
        prevEl: '.actors-button-prev',
        nextEl: '.actors-button-next',
        container: 'swiper-object-6',
        disabledClass: 'actors-button-disabled'
    }
})

const reviewsSwiper = new Swiper('.swiper-container-8', {
    slidesPerView: 1,
    spaceBetween: 15,
    speed: 500,
    slidesPerGroup: 1,
    breakpoints: {
        1300: {
            slidesPerView: 'auto',
            spaceBetween: 15,
            speed: 1000,
            slidesPerGroup: 2,
        },
        1200: {
            slidesPerView: 2.5,
            spaceBetween: 15,
            speed: 1000,
            slidesPerGroup: 2,
        },
        900: {
            slidesPerView: 2,
            spaceBetween: 15,
            speed: 1000,
            slidesPerGroup: 2,
        },
        650: {
            slidesPerView: 1.5,
            spaceBetween: 15,
            speed: 1000,
            slidesPerGroup: 1,
        }
    },
    navigation: {
        prevEl: '.reviews-button-prev',
        nextEl: '.reviews-button-next',
        container: 'swiper-object-7',
        disabledClass: 'reviews-button-disabled'
    }
})

const Description = function () {
    const descBtn = document.querySelector('.description__button');
    const descInfo = document.querySelector('.description__info');
    descBtn.addEventListener('click', () => {
        descBtn.classList.toggle('description__button--active');
        descInfo.classList.toggle('description__info--active');
        if (descBtn.classList.contains('description__button--active')) {
            descBtn.innerHTML = 'Свернуть описание';
        } else {
            descBtn.innerHTML = 'Подробное описание';
        }
    })
}

const Stars = function () {
    const star = document.querySelectorAll("input[name='rating']");
    const starText = document.querySelector('.description__right-title');
    const starReset = document.querySelector('.description__right-btn');
    star.forEach(item => {
        item.addEventListener('change', (event) => {
            if (event.target.checked) {
                starText.innerText = `Ваша оценка - ${item.value}`;
                starReset.classList.add('description__right-btn--active');
            }
        })
    })
    starReset.addEventListener('click', () => {
        star.forEach(item => { item.checked = false });
        starText.innerText = 'Поставьте оценку';
        starReset.classList.remove('description__right-btn--active');
    })
}

const Names = function () {
    const nameBox = document.querySelectorAll('.actors__slide-face');
    const hasCapital = (s) => s.match(/[А-ЯA-Z]/g);
    nameBox.forEach(item => {
        if (item.childElementCount == 0) {
            var name = item.nextElementSibling.innerHTML;
            const newElement = document.createElement('p');
            newElement.textContent = hasCapital(name).join('');
            item.appendChild(newElement);
        }
    })
}

const ReviewRating = function () {
    const rating = document.querySelectorAll('.reviews__slide-rating');
    rating.forEach(item => {
        if (item.innerHTML >= 8) {
            item.style.background = 'rgb(55, 168, 121)';
        }
        else if (item.innerHTML > 4) {
            item.style.background = '#3f3e43';
        }
        else {
            item.style.background = '#e74949';
        }
    })
}

const ReviewMore = function () {
    const review = document.querySelector('.reviews');
    const reviewText = review.querySelectorAll('.reviews__slide-text');
    const lineHeight = parseFloat(window.getComputedStyle(reviewText[0]).lineHeight);
    const maxHeight = lineHeight * 5;
    const reviewBtn = document.querySelectorAll('.reviews__slide-btn');
    const modalWindow = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    reviewBtn.forEach((item, index) => {
        item.addEventListener('click', () => {
            modalWindow.classList.add('modal--active');
            modalOverlay.classList.add('modal-overlay--active');
            document.body.style.overflow = 'hidden';
            modalWindow.querySelector('.reviews__slide-text').innerHTML = item.previousElementSibling.innerHTML;
            modalWindow.querySelector('.reviews__slide-name').innerHTML = item.parentNode.querySelector('.reviews__slide-name').innerHTML;
            modalWindow.querySelector('.reviews__slide-data').innerHTML = item.parentNode.querySelector('.reviews__slide-data').innerHTML;
            modalWindow.querySelector('.reviews__slide-rating').innerHTML = item.parentNode.querySelector('.reviews__slide-rating').innerHTML;
            ReviewRating();
        })
    })
    // клик вне области
    modalOverlay.addEventListener('click', (event) => {
        if (!modalWindow.contains(event.target)) {
            modalWindow.classList.remove('modal--active');
            modalOverlay.classList.remove('modal-overlay--active');
            document.body.style.overflow = 'visible';
            document.body.style.overflowX = 'hidden';
        }
    })
    modalClose.addEventListener('click', () => {
        modalWindow.classList.remove('modal--active');
        modalOverlay.classList.remove('modal-overlay--active');
        document.body.style.overflow = 'visible';
        document.body.style.overflowX = 'hidden';

    })
    reviewText.forEach((item, index) => {
        var height = item.scrollHeight;
        if (height >= maxHeight) {
            reviewBtn[index].style.display = 'block';
        }
    })
}




