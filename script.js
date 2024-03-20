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

function parseDate(dateString) {
    if (dateString.length == 8){
        const year = parseInt(dateString.substr(0, 4));
        const month = parseInt(dateString.substr(4, 2)) - 1; // Month is zero-based
        const day = parseInt(dateString.substr(6, 2));

        // Create date object in UTC
        const date = new Date(Date.UTC(year, month, day));
        return date;
    }
    const year = parseInt(dateString.substr(0, 4));
    const month = parseInt(dateString.substr(4, 2)) - 1; // Month is zero-based
    const day = parseInt(dateString.substr(6, 2));
    const hour = parseInt(dateString.substr(9, 2));
    const minute = parseInt(dateString.substr(11, 2));
    const second = parseInt(dateString.substr(13, 2));

    // Create date object in UTC
    return new Date(Date.UTC(year, month, day, hour, minute, second)); 
}

function formatDates(start, end){
        const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
        console.log(start);
        const formattedStartDate = start.toLocaleDateString('fr-FR', options);
        const formattedEndDate = end.toLocaleTimeString('fr-FR', {hour: 'numeric', minute: 'numeric'});
        console.log(formattedStartDate, formattedEndDate);
        
    
        return (`${formattedStartDate.replace('à', 'de')} à ${formattedEndDate}`).replaceAll(':', 'h').replaceAll('00', '');
    }
function formatDate(date){//Should return only the day, number and month in french
    const options = { weekday: 'long', month: 'long', day: 'numeric'};
    console.log(date);
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    console.log(formattedDate);
    return formattedDate;
}

$(async ()=>{
let reponse = await fetch("/.netlify/functions/calendar");
let data = await reponse.json();
console.log(JSON.stringify(data));
let html = '';
data.forEach(event => {
    start = parseDate(event.startDate);
    end = parseDate(event.endDate);
    if (Math.abs(end-start) > 10*60*60*1000){
        html += `<li><strong>${event.summary}</strong><br>${formatDate(start)}</li>`
    }else{
    html += `
        <li>
            <strong>${event.summary}</strong><br>
            ${formatDates(start, end)}<br>
            ${event.location || ''}
        </li>
    `;
    }
});
document.getElementById("next-events").innerHTML = html;
});
