var team = new Swiper('.swiper-team', {
    slidesPerView: 5,
    spaceBetween:20,
    lazy: true,
    loop:true,
    navigation: {
        nextEl: '.team__arrows-block .button-next',
        prevEl: '.team__arrows-block .button-prev',
    },

});
var documents = new Swiper('.swiper-documents', {
    slidesPerView: 3,
    spaceBetween:20,
    lazy: true,
    loop:true,
    navigation: {
        nextEl: '.documents__arrows-block .button-next',
        prevEl: '.documents__arrows-block .button-prev',
    },

});

var accreditadion = new Swiper('.swiper-accreditadion', {
    slidesPerView: 3,
    spaceBetween:20,
    lazy: true,
    loop:true,
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

async function getCity() {
    let response = await fetch('sypexgeo.php', {
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
