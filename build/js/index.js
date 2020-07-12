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
    console.log(answer);
    if(answer !== 'error') {
        $('.main-screen__title span').text('в городе ' + answer);
        $('.calculate__city').text(answer);
    }
}
getCity();

$(".calculate").submit(function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    console.log(form);

    $.ajax({
        type: "POST",
        url: 'calculate.php',
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
            alert(data); // show response from the php script.
        }
    });


});

// Замените на свой API-ключ
var token = "0796f2100cad58e4a7f5fe90ed66cc4e08a9037d";

var defaultFormatResult = $.Suggestions.prototype.formatResult;

function formatResult(value, currentValue, suggestion, options) {
    var newValue = suggestion.data.city;
    suggestion.value = newValue;
    return defaultFormatResult.call(this, newValue, currentValue, suggestion, options);
}

function formatSelected(suggestion) {
    return suggestion.data.city;
}

$(".calculate__city").suggestions({
    token: token,
    type: "ADDRESS",
    hint: false,
    bounds: "city",
    constraints: {
        locations: { city_type_full: "город" }
    },
    formatResult: formatResult,
    formatSelected: formatSelected,
    onSelect: function(suggestion) {
        console.log(suggestion);
    }
});
