import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./Dashboard.css";
import { getUsers } from "../../ducks/reducers/userReducer";
import Income from "../Income/Income";
import Chart from "../Chart/Chart";
import Switch from "react-switch";
import { getDashboard } from "../../ducks/reducers/incomeReducer";
import moment from "moment";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      month: true
    };
  }
  componentDidMount() {
    this.props.getDashboard("month");
  }
  handleChange = month =>
    this.setState({ month }, () =>
      this.props.getDashboard(this.state.month ? "month" : "year")
    );
  render() {
    return (
      <div className="dashboard">
        <Switch
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
        />
        {this.props.incomeReducer.dashboard.sources && (
          <Income month={this.state.month} />
        )}
        {this.props.incomeReducer.dashboard.sources && (
          <Chart type="remaining" />
        )}
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
