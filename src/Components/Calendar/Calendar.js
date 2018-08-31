import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'fullcalendar';
import $ from 'jquery';
import moment from 'moment';
import './Calendar.css';
import './fullCalendar.css';

import { getUsers } from '../../ducks/reducers/userReducer';

class Calendar extends Component {

  state = {
    date: 'Hi there'
  }
  componentDidMount() {
    this.props.getUsers();

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      eventDrop: function(date, dayDelta, minuteDelta, allDay) {
        console.log(moment(date.start._d).add(1, 'day').format('YYYY-MM-DD'));
        // this.setState({date: dateDrop})
      },

      // events: `/api/income/${this.props.userReducer.id}`,
      events: `/api/income/6`,
      
      eventMouseover: function(e, jsEvent) {
        const tooltip =
          '<div class="tooltipevent" style="padding:1% 1.5%;opacity: 0.8;background:rgb(241, 241, 241);position:absolute;z-index:10001;">' +
          e.title +
          '<br />' +
          '$' + e.amount +
          '</div>';
        $('body').append(tooltip);
        $(this)
          .mouseover(function(e) {
            $(this).css('z-index', 10000);
            $('.tooltipevent').fadeIn('500');
            $('.tooltipevent').fadeTo('10', 1.9);
          })
          .mousemove(function(e) {
            $('.tooltipevent').css('top', e.pageY + 10);
            $('.tooltipevent').css('left', e.pageX + 20);
          });
      },
      eventMouseout: function(calEvent, jsEvent) {
        $(this).css('z-index', 8);
        $('.tooltipevent').remove();
      }
    });
  }

  render() {
    return (
      <div className="calendar">
      <h1>Calendar</h1>
        <div id="calendar" />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers
  }
)(Calendar);
