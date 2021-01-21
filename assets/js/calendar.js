document.addEventListener('DOMContentLoaded', function() {
  var url = window.location.href;
  var params = url.match(/.*\/(.*)\/(.*)$/);
  var lang = params[1];
  if (lang == "ru") {
    add_button_text = "Новая дата";
  } else if (lang == "en-gb") {
    add_button_text = "New Date";
  } else if (lang == "hu") {
    add_button_text = "Új időpont";
  } else if (lang == "sv") {
    add_button_text = "Nytt möte";
  } else if (lang == "es") {
    add_button_text = "Nueva fecha";
  } else if (lang == "fr") {
    add_button_text = "Nouvelle date";
  } else if (lang == "pl") {
    add_button_text = "Nową datę";
  } else if (lang == "cs") {
    add_button_text = "Nová schůzka";
  } else if (lang == "it") {
    add_button_text = "Nuova data";
  } else if (lang == "tr") {
    add_button_text = "Yeni randevu";
  } else if (lang == "nl") {
    add_button_text = "Nieuwe datum";
  } else {
    add_button_text = "Neuer Termin";
    lang = "de";
  }
  
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      start: 'title', // will normally be on the left. if RTL, will be on the right
      center: '',
      end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
    },
    footerToolbar: {
      left: 'listWeek,dayGridMonth,dayGridDay',
      right: 'addButton'
    },
    customButtons: {
      addButton: {
        text: add_button_text,
        click: function() {
          window.open('https://demo.terminkalender.top/add/' + lang + '/');
        }
      }
    },
    titleFormat: { year: 'numeric', month: 'numeric', day: 'numeric' },
    events: '/event-data',
    eventClick: function(info) {
      info.jsEvent.preventDefault(); // don't let the browser navigate
      //console.log(info);
      if (info.event.extendedProps.stream) {
        window.open(info.event.extendedProps.stream);
      } else if (info.event.url) {
        window.open(info.event.url);
      }
    },
    navLinks: true,
    locale: lang,
    height: 'auto',
    themeSystem: 'standard',
    initialView: 'listWeek',
    views: {
      dayGridMonth: {
        dayMaxEvents: 5,
        firstDay: 1,
      }
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventDidMount: function(info) {
      var elemTitle = info.el.getElementsByClassName('fc-list-event-title')[0];
      if (elemTitle) {
        if (info.event.url && info.event.extendedProps.stream) {
          elemTitle.innerHTML = '<a href="' + info.event.url + '">' + elemTitle.innerText + '</a>&nbsp;&nbsp;<a href="' + info.event.extendedProps.stream + '"><img src="https://demo.terminkalender.top/img/live.png" height="16px" style="vertical-align:middle"/></a>';
        } else if (info.event.url) {
          elemTitle.innerHTML = '<a href="' + info.event.url + '">' + elemTitle.innerText + '</a>';
        } else if (info.event.extendedProps.stream) {
          elemTitle.innerHTML = elemTitle.innerText + '&nbsp&nbsp<a href="' + info.event.extendedProps.stream + '"><img src="https://demo.terminkalender.top/img/live.png" height="16px" style="vertical-align:middle"/></a>';
        } else {
          elemTitle.innerHTML = elemTitle.innerText;
        }
      }
      var elemDot = info.el.getElementsByClassName('fc-list-event-dot')[0];
      if (elemDot) {
         elemDot.outerHTML = '<img src="https://demo.terminkalender.top/img/' + info.event.extendedProps.country.toUpperCase() + '.png" height="16px" width="16px" style="vertical-align: top;"/>'
      }
    }
  });

  calendar.render();

});
