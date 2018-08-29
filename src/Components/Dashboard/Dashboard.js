import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./Dashboard.css";
import { getUsers } from "../../ducks/reducers/userReducer";
import Income from "../Income/Income";
import Chart from "../Chart/Chart";
import Switch from "react-switch";
import {
  getIncome,
  getYearlyIncome,
  incomeSum
} from "../../ducks/reducers/incomeReducer";
import { getExpensesByCategory } from "../../ducks/reducers/expensesReducer";
import moment from "moment";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      month: true
    };
  }
  componentDidMount() {
    this.props.getUsers();
    this.incomeSum();
  }
  incomeSum = (start, end) => {
    axios.get(`/api/income-sum?start=${start}&end=${end}`).then(res => {
      this.setState({ incomeTotal: res.data[0]["sum"] });
    });
  };
  incomeYearlySum = (start, end) => {
    axios.get(`/api/yearly-income-sum`).then(res => {
      this.setState({ incomeTotal: res.data[0]["sum"] });
    });
  };
  handleChange = month => {
    // const { month } = this.state;
    this.setState({
      month
    });
    if (month) {
      this.props.getIncome(),
        this.props.getExpensesByCategory(
          moment()
            .startOf("month")
            .format("l"),
          moment()
            .endOf("month")
            .format("l")
        ),
        this.incomeSum();
    } else {
      this.props.getYearlyIncome(),
        this.props.getExpensesByCategory(
          moment()
            .startOf("year")
            .format("l"),
          moment()
            .endOf("month")
            .format("l")
        ),
        this.incomeYearlySum();
    }
  };
  render() {
    console.log(this.state.month);
    return (
      <div className="dashboard">
        <Switch
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
        />
        <Income month={this.state.month} />
        <Chart month={this.state.month} type="remaining" />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers,
    getIncome,
    getYearlyIncome,
    getExpensesByCategory
  }
)(Dashboard);
