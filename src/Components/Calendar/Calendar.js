import React, {Component} from 'react';
import 'fullcalendar';
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