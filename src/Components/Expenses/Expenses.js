import React, { Component } from "react";
import { getUsers } from "../../ducks/reducers/userReducer";
import {
  getExpenses,
  getExpensesByCategory
} from "../../ducks/reducers/expensesReducer";
import { connect } from "react-redux";
import moment from "moment";
import Switch from "react-switch";

import Chart from "../Chart/Chart";
import "./Expenses.css";
import ExpensesInfo from "./ExpensesInfo";
class Expenses extends Component {
  constructor() {
    super();
    this.state = { month: true };
  }
  componentDidMount() {
    this.props.getUsers();
    this.props.getExpenses(start(moment()), end(moment()));
    this.props.getExpensesByCategory(start(moment()), end(moment()));
  }

  handleChange = month => {
    if (month === "year") {
      this.props.getExpenses(
        moment()
          .startOf("year")
          .format("l"),
        moment().format("l")
      );
      this.props.getExpensesByCategory(
        moment()
          .startOf("year")
          .format("l"),
        moment().format("l")
      );
    } else {
      this.props.getExpenses(start(month), end(month));
      this.props.getExpensesByCategory(start(month), end(month));
    }
  };
  render() {
    const options = this.props.expensesReducer.expensesbymonth
      .filter(e => e.month.trim() !== moment().format("MMMM"))
      .map((e, i) => (
        <option key={i} value={moment(e.month.trim(), "MMMM").format("l")}>
          {e.month.trim()}
        </option>
      ));
    return (
      <div className="Expenses">
        <div className="expenses_top">
          {this.state.month && (
            <select
              className="dash_options"
              onChange={e => this.handleChange(e.target.value)}
            >
              <option
                value={moment().format("l")}
                defaultValue={moment().format("l")}
              >
                {moment().format("MMMM")}
              </option>
              <option disabled>───────</option>
              {options}
              <option value="year">YTD</option>
            </select>
          )}
        </div>
        <ExpensesInfo />
        <Chart type="expenses" />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getUsers, getExpenses, getExpensesByCategory }
)(Expenses);

function start(d) {
  return moment(new Date(d).toISOString())
    .startOf("month")
    .format("l");
}
function end(d) {
  return moment(new Date(d).toISOString())
    .endOf("month")
    .format("l");
}
