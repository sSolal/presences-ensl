function navigate(selectedValue) {
    if (selectedValue) {
        // Scroll to the associated anchor on the page
        var targetElement = $('#' + selectedValue);
        $('html, body').animate({
            scrollTop: targetElement.offset().top
        }, 500);
        window.location.hash = selectedValue;
    }
}

$(document).ready(function () {
    var scrollContent = $('#scrollContent');
    var current_panel = "hey";
    $("#slide_" + current_panel).addClass("active");
    var panels = Object.fromEntries($(".panel").get().map(x => [x.id, x]));
    $(window).scroll(function () {
        var scrollPosition = $(this).scrollTop();
        var new_panel = current_panel;
        var best_cand = Number.MAX_VALUE;
        for (const [name, panel] of Object.entries(panels)) {
            if (panel.offsetTop + panel.offsetHeight - window.innerHeight / 4 - scrollPosition < 0) {
                continue;
            }
            if (panel.offsetTop + panel.offsetHeight - window.innerHeight / 4 - scrollPosition < best_cand) {
                best_cand = panel.offsetTop - scrollPosition;
                new_panel = name;
            }
        }
        if (new_panel != current_panel) {
            $("#slide_" + current_panel).removeClass("active");
            $("#slide_" + new_panel).addClass("active");
            current_panel = new_panel;
        }
    });

    $('#mobileDropdown').focus();

//Handle navigation on mobile :
    $('#mobileDropdown').on('change', function () {
        var selectedValue = $(this).val();
        navigate(selectedValue);
    });

});


$(async ()=>{
let reponse = await fetch("/.netlify/functions/calendar");
let data = await reponse.json();
console.log(data);
});
