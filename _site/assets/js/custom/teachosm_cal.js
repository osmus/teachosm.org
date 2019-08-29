$(document).ready(function() {
    $('#insert-calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyAiBpmAV3m9Y_1BkFL8nIArU2q_KnugXOU',
        events: {
            googleCalendarId: 'teachosm@gmail.com',
            color: 'none',   // an option!
            textColor: 'white' // an option!
        },
        eventAfterRender: function (event, element, view) {

        var locationString = String(event.location);

        if (locationString.toLowerCase().indexOf("class1") >= 0) {
            element.css('background-color', 'lightBlue');
            element.css('color', 'black');
            element.css('border', '2px solid #72bcd4');
        }
        if (locationString.toLowerCase().indexOf("class2") >= 0) {
            element.css('background-color', 'red');
            element.css('border', '2px solid darkred');
        }
        if (locationString.toLowerCase().indexOf("class3") >= 0) {
            element.css('background-color', '#ffff99');
            element.css('color', 'black');
            element.css('border', '2px solid #e7e700');
        }
    },
    header: {
      left:   'title',
      center: '',
      right:  'today prev,next'
    },
aspectRatio: 2,
    eventClick:  function(event, jsEvent, view) {
        //clears any existing value
        $("#eventInfo").empty();
        //set the values and open the modal
        $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
        $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
        $("#eventInfo").html(event.description);
        $("#eventLink").attr('href', event.url);
        $("#eventContent").dialog({ modal: true, title: event.title });
        $("#eventContent").dialog( "option", "width", 660 );
        if (event.url) {
            window.close(event.url);
            return false;
        }
    }
        
    });
});