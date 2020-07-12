const token = "0796f2100cad58e4a7f5fe90ed66cc4e08a9037d";
const defaultFormatResult = $.Suggestions.prototype.formatResult;

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
        if(suggestion.data && suggestion.data.city) {
            $('.main-screen__title span').text('в городе ' + suggestion.data.city);
        }
    }
});


function showSuggestion(suggestion) {
    console.log(suggestion);
    var data = suggestion.data;
    if (!data)
        return;

    if (data.name) {
        $(".auth-name").val(data.name.short_with_opf || "");
    }

    if (data.management) {
        $(".auth-fio").val(data.management.name || "");
    }

    $(".auth-inn").val(data.inn || "");
}

$(".auth-name").suggestions({
    token: token,
    type: "PARTY",
    count: 5,
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: showSuggestion
});

$(".auth-inn").suggestions({
    token: token,
    type: "PARTY",
    count: 5,
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: showSuggestion
});

$(".auth-fio").suggestions({
    token: token,
    type: "NAME",
    onSelect: function(suggestion) {
        console.log(suggestion);
    }
});