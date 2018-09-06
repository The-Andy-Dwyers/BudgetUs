import React, { Component } from "react";
import { connect } from "react-redux";
import "fullcalendar";
import $ from "jquery";
import "./Calendar.css";
import "./fullCalendar.css";

import { getUsers } from "../../ducks/reducers/userReducer";
import { getIncomeEvents } from "../../ducks/reducers/incomeReducer";

class Calendar extends Component {
  state = {
    date: "Hi there"
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getIncomeEvents();

    $("#calendar").fullCalendar({
      header: {
        left: "prev,next",
        center: "title",
        right: "month"
      },
      editable: true,
      droppable: true,
      displayEventTime: false,
      // eventRender: function(event) {
      //   return (
      //     event.ranges.filter(function(range) {
      //       // test event against all the ranges

      //       return (
      //         event.start.isBefore(range.end) && event.end.isAfter(range.start)
      //       );
      //     }).length > 0
      //   ); //if it isn't in one of the ranges, don't render it (by returning false)
      // },

      events: `/api/income/${this.props.userReducer.id}`,
      // events: `/api/income/6`,

      eventMouseover: function(e, jsEvent) {
        const tooltip =
          '<div class="tooltipevent" style="padding:1% 1.5%;opacity: 0.8;background:rgb(241, 241, 241);position:absolute;z-index:10001;">' +
          e.title +
          "<br />" +
          "$" +
          e.amount +
          "</div>";
        $("body").append(tooltip);
        $(this)
          .mouseover(function(e) {
            $(this).css("z-index", 10000);
            $(".tooltipevent").fadeIn("500");
            $(".tooltipevent").fadeTo("10", 1.9);
          })
          .mousemove(function(e) {
            $(".tooltipevent").css("top", e.pageY + 10);
            $(".tooltipevent").css("left", e.pageX + 20);
          });
      },
      eventMouseout: function(calEvent, jsEvent) {
        $(this).css("z-index", 0);
        $(".tooltipevent").remove();
      }
    });
  }

  render() {
    return (
      <div className="calendar">
      <div className='calendar_top'>

        <h1>Calendar</h1>
      </div>
        <div id="calendar" />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers,
    getIncomeEvents
  }
)(Calendar);
