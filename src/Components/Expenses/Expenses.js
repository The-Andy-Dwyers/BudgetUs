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

  handleSwitchChange = month =>
    this.setState({ month }, () => {
      if (this.state.month) {
        this.props.getExpenses(start(moment()), end(moment()));
        this.props.getExpensesByCategory(start(moment()), end(moment()));
      } else {
        this.props.getExpenses(
          moment()
            .startOf("year")
            .format("l"),
          moment()
            .endOf("year")
            .format("l")
        );
        this.props.getExpensesByCategory(
          moment()
            .startOf("year")
            .format("l"),
          moment()
            .endOf("year")
            .format("l")
        );
      }
    });
  handleChange = month => {
    this.props.getExpenses(start(month), end(month));
    this.props.getExpensesByCategory(start(month), end(month));
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
        <Switch
          onChange={this.handleSwitchChange}
          checked={this.state.month}
          id="normal-switch"
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "white",
                paddingRight: 2,
                background: "#d12012",
                borderRadius: 50
              }}
            >
              Y
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "white",
                paddingRight: 2,
                background: "#d12012",
                borderRadius: 50
              }}
            >
              M
            </div>
          }
        />
        {this.state.month && (
          <select onChange={e => this.handleChange(e.target.value)}>
            <option
              value={moment().format("l")}
              defaultValue={moment().format("l")}
            >
              {moment().format("MMMM")}
            </option>
            {options}
          </select>
        )}
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
  return moment(d)
    .startOf("month")
    .format("l");
}
function end(d) {
  return moment(d)
    .endOf("month")
    .format("l");
}
