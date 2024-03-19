export default async (req, context) => {
    let iCalFlux = "https://calendar.google.com/calendar/ical/presences.ensl%40gmail.com/public/basic.ics?orderby=starttime&sortorder=ascending&futureevents=true&alt=json";


    let reponse = await fetch(iCalFlux, {
      headers: {
        "Accept": "application/json"
      }
    });
    let data = await reponse.json();

    return new Response(JSON.stringify(data));

    /*
    // Get list of upcoming iCal events formatted in JSON
    jQuery.getJSON(iCalFlux, function(data){
        // Parse and render each event
        jQuery.each(data.feed.entry, function(i, item){
          var event_url = jQuery.trim(item.content.$t);
          var event_header = item.title.$t;
          if(event_url.length > 0) {
            event_header = "<a href='" + event_url + "'>" + event_header + "</a>";
          };
          // Format the date string
          var d = new Date(item.gd$when[0].startTime);
          var d_string = '<strong>' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '</strong>';
          if(d.getHours() != 0 || d.getMinutes() != 0) {
            d_string = d_string + ' at ' + lpad(d.getHours(), '0', 2) + ':' + lpad(d.getMinutes(), '0', 2);
          };
          // Render the event
          jQuery("#next-events li").last().before(
            "<li><strong>"
            + event_header
            + "</strong><br/>Date: "
            + d_string
            + "<br/>Venue: <a href='https://maps.google.com/maps?q="
            + item.gd$where[0].valueString
            + "' target='_blank'>"
            + item.gd$where[0].valueString
            + "</a></li>");
        });
      });

    return new Response("Hello, world!");*/
  };
  