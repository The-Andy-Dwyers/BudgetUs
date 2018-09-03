import React, { Component } from "react";
import { connect } from "react-redux";
import "fullcalendar";
import $ from "jquery";
import moment from "moment";
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
      droppable: true, // this allows things to be dropped onto the calendar
      displayEventTime: false,
      eventRender: function(event) {
        return (
          event.ranges.filter(function(range) {
            // test event against all the ranges

            return (
              event.start.isBefore(range.end) && event.end.isAfter(range.start)
            );
          }).length > 0
        ); //if it isn't in one of the ranges, don't render it (by returning false)
      },
      eventDrop: function(date, dayDelta, minuteDelta, allDay) {
        // const dateDrop = moment(date.start._d)
        //   .add(1, "day")
        //   .format("YYYY-MM-DD");
        console.log(
          moment(date.start._d)
            .add(1, "day")
            .format("YYYY-MM-DD")
        );
        console.log(allDay);
        // const chageEvent = () => {

        //   this.setState({date: dateDrop})
        //   console.log(this.state)
        // }
      },

      // events: `/api/income/${this.props.userReducer.id}`,
      // events: `/api/income/6`,
      events: [
        {
          // allDay: true,
          // displayEventTime: false,
          amount: 500,
          start: "10:00",
          end: "12:00",
          dow: [0],
          // date: "2018-08-01",
          title: "taster",
          ranges: [
            {
              start: moment("2018-08-19").startOf("day"),
              end: moment("2018-08-25").endOf("day")
            }
          ]
        }
      ],

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
        $(this).css("z-index", 8);
        $(".tooltipevent").remove();
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
    getUsers,
    getIncomeEvents
  }
)(Calendar);
