var team = new Swiper('.swiper-team', {
    slidesPerView: 1.2,
    slideToClickedSlide: true,
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
    menuToggler:$(".js-menu-toggler")
};

popups.popupToggler.on("click",function () {
    popups.popupToggle(popups.popup)
});

popups.menuToggler.on("click",function () {
    popups.popupToggle(popups.menu)
});

(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };
}(jQuery));
$(document).ready(function() {
    $(".phone-input").inputFilter(function(value) {
        return   /^([0-9]{0,1})?([-0-9]{0,1})?([0-9]{0,2})?([-0-9]{0,2})?([0-9]{0,2})?([-0-9]{0,2})?([0-9]{0,2})?([-0-9]{0,1})?([0-9]{0,2})?(\([0-9]{3})?(\)[0-9]{7})?(\+[0-9]{0,1})?([-0-9]{0,1})?([0-9]{0,3})?([-0-9]{0,1})?([0-9]{0,3})?([-0-9]{0,1})?([0-9]{0,2})?([-0-9]{0,1})?([0-9]{0,2})?( [0-9]{1,12})?( [0-9]{4})?( [0-9]{3})?( [0-9]{2})?( [0-9]{2})?(\([0-9]{1,3})?(\)[0-9]{1})?([-0-9]{0,3})?([-]{0,5})?( [0-9]{6})?$/.test(value);
    });
});

//empty input validation
let valid = true;
const validation = function (form) {
    valid = true;
    let input = form.find(".required");
    let checkbox = form.find(".personal-data");
    input.each(function (index, value) {
        if ($(value).val().length === 0) {
            $(value).addClass("empty__input");
            $(value).next(".error-message").addClass("active");
            valid = false;
        } else {
            $(value).removeClass("empty__input");
            $(value).next(".error-message").removeClass("active");
        }
    });
    if (!checkbox.prop("checked")) {
        $(checkbox).parent().addClass("not-checked");
        valid = false;
    }
    else{
        $(checkbox).parent().removeClass("not-checked");
    }
};


$(".calculate__submit").on("click",function (evt) {
    validation($("#calculate-form"))
    if(!valid){
        evt.preventDefault()
    }
})
$(".callback__submit").on("click",function (evt) {
    validation($("#callback-form"))
    if(!valid){
        evt.preventDefault()
    }
})
$(".whatsapp__submit").on("click",function (evt) {
    validation($("#whatsapp-form"))
    if(!valid){
        evt.preventDefault()
    }
})
$(".auth__submit").on("click",function (evt) {
    validation($("#auth-form"))
    if(!valid){
        evt.preventDefault()
    }
})


$(".personal-data").on("click",function () {
    if($(this).prop("checked")) {
    $(this).parent().removeClass("not-checked")
    }
})

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});
function countup(className){
    var countBlockTop = $("."+className).offset().top;
    var windowHeight = window.innerHeight;
    var show = true;

    $(window).scroll( function (){
        if(show && (countBlockTop < $(window).scrollTop() + windowHeight)){
            show = false;

            $('.'+className).spincrement({
                from: 1,
                duration: 4000,
            });
        }
    })
}
$(function() {
    countup("count");
});


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
