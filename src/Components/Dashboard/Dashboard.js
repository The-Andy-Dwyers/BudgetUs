import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// import moment from 'moment';
import Switch from "react-switch";
import { Link } from "react-router-dom";

import Income from "../Income/Income";
import Chart from "../Chart/Chart";
import Goals from "../Goals/Goals";
import LineChart from "../Chart/LineChart";

import "./Dashboard.css";
import { getUsers } from "../../ducks/reducers/userReducer";
import { getDashboard } from "../../ducks/reducers/incomeReducer";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      month: true,
      expenses: []
    };
  }
  componentDidMount() {
    this.props.getDashboard("month");
    this.getTopExpenses();
  }

  getTopExpenses = () => {
    axios.get("/api/top-expenses").then(res => {
      this.setState({ expenses: res.data });
    });
  };

  handleChange = month =>
    this.setState({ month }, () =>
      this.props.getDashboard(this.state.month ? "month" : "year")
    );
  render() {
    const { expenses } = this.state;
    const map =
      expenses.length !== 0 &&
      expenses.map((e, i) => {
        return (
          <div className="dash_map" key={i}>
            <p>{e.category}</p>
            <p>${e.amount.toLocaleString()}</p>
          </div>
        );
      });

    return (
      <div className="dashboard">
        <Goals />
        <Switch
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
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
        />
        <div className="dashboard_top">
          {this.props.incomeReducer.dashboard.sources && (
            <Income month={this.state.month} />
          )}
          <div className="dashboard_expense">
            <h2>Top Expenses</h2>
            <div>{map}</div>
            <Link className="link2" to="/expenses">
              <h2 className="expenses_link btn">More info</h2>
            </Link>
          </div>
        </div>

        {this.props.incomeReducer.dashboard.sources && (
          <Chart type="remaining" />
        )}
        {this.props.incomeReducer.dashboard.sources && <LineChart />}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers,
    getDashboard
  }
)(Dashboard);
