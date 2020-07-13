var team = new Swiper('.swiper-team', {
    slidesPerView: 1.2,
    spaceBetween:20,
    lazy: true,
    loop:true,
    breakpoints: {
        350: {
            slidesPerView: 1.4,
            spaceBetween: 20
        },
        450: {
            slidesPerView: 1.2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1.7,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1180: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1510: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        1920: {
            slidesPerView: 5,
            spaceBetween: 20
        }
    },
    navigation: {
        nextEl: '.team__arrows-block .button-next',
        prevEl: '.team__arrows-block .button-prev',
    },

});
var documents = new Swiper('.swiper-documents', {
    slidesPerView: 1,
    spaceBetween:20,
    lazy: true,
    loop:true,
    pagination:{
        el: '.documents__pagination'
    },
    breakpoints: {
        350: {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination:true
        },
        450: {
            slidesPerView: 1.2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1.9,
            spaceBetween: 20
        },
        1150: {
            slidesPerView: 2.2,
            spaceBetween: 20
        },
        1180: {
            slidesPerView: 2.5,
            spaceBetween: 20
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 20
        },
    },
    navigation: {
        nextEl: '.documents__arrows-block .button-next',
        prevEl: '.documents__arrows-block .button-prev',
    },

});

var accreditadion = new Swiper('.swiper-accreditadion', {
    slidesPerView: 1,
    spaceBetween:20,
    lazy: true,
    loop:true,
    pagination:{
        el: '.accreditadion__pagination'
    },
    breakpoints: {
        350: {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination:true
        },
        450: {
            slidesPerView: 1.2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1.9,
            spaceBetween: 20
        },
        1150: {
            slidesPerView: 2.2,
            spaceBetween: 20
        },
        1180: {
            slidesPerView: 2.5,
            spaceBetween: 20
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 20
        },
    },

    navigation: {
        nextEl: '.swiper-accreditadion .button-next',
        prevEl: '.swiper-accreditadion .button-prev',
    },

});
team.on('slideChangeTransitionEnd',function () {
    let slideCite = ($(".swiper-slide-active").find(".team__slide").data("cite"));
    let citeBlock = $(".js-cite-block");
    citeBlock.text(slideCite)
});

var popups = {
    popup:$(".js-callback"),
    menu:$(".js-menu"),
    popupImg:$(".popup__background svg"),
    popupToggle:function (element) {
        element.fadeToggle(300);
        this.popupImg.toggleClass("opened")
    },
    popupToggler:$(".js-popup-toggler"),
    menuToggler:$(".js-menu-toggler"),
}

popups.popupToggler.on("click",function () {
    popups.popupToggle(popups.popup)
})

popups.menuToggler.on("click",function () {
    popups.popupToggle(popups.menu)
})


for (let i = 1;i< 6;i++) {
        let slide = ".team .slide"+i;
    $(slide).on("click", function () {
        team.slideToLoop(i -1, 500, true);

    })
}

// $('.team .swiper-slide').each(function (index, value) {
//     $(this).on("click",function () {
//         console.log(index)
//         if(index>10){
//             team.slideToLoop(index-10, 500, true);
//         }
//         else {
//             team.slideToLoop(index-3, 500, true);
//         }
//     })
//     // console.log(index);
// });

async function getCity() {
    let response = await fetch('/php/sypexgeo.php', {
        mode: "no-cors", // same-origin, no-cors
        redirect: "follow", // manual, error
    });
    let answer = await response.text();
    if(answer !== 'error') {
        $('.main-screen__title span').text('в городе ' + answer);
        $('.calculate__city').val(answer);
    }
}
getCity();
