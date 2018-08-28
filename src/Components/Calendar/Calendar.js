import React, {Component} from 'react';
import 'fullcalendar';
import moment from 'moment';
import $ from 'jquery';

import './Calendar.css';
import './fullCalendar.css';


export default class Calendar extends Component {
    componentDidMount() {
    

 
  
      $('#calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
       
        events: '/api/income',
        events: [{
        title:"My repeating event",
        start: '11:00', // a start time (10am in this example)
        end: '14:00', // an end time (6pm in this example)
        
        dow: [ 1 ] // Repeat monday and thursday
    }],
        // eventMouseover: function(e, jsEvent) {
        //   const tooltip =
        //     '<div class="tooltipevent" style="padding:1% 1.5%;opacity: 0.8;background:rgb(241, 241, 241);position:absolute;z-index:10001;">' +
        //     e.title +
        //     '<br />' +
        //     moment(e.time).format('h:mm a')
        //     +
        //     '<br />' +
        //     e.location.substring(0, e.location.length - 5) +
        //     '</div>';
        //   $('body').append(tooltip);
        //   $(this)
        //     .mouseover(function(e) {
        //       $(this).css('z-index', 10000);
        //       $('.tooltipevent').fadeIn('500');
        //       $('.tooltipevent').fadeTo('10', 1.9);
        //     })
        //     .mousemove(function(e) {
        //       $('.tooltipevent').css('top', e.pageY + 10);
        //       $('.tooltipevent').css('left', e.pageX + 20);
        //     });
        // },
        // eventClick: function(e) {
        //   window.location.href = `/events/${e.title}`;
        // }
      });
    }
  
    render() {
      return (
        <div className="calendar">
          <div id="calendar" />

        </div>
      );
    }
  }