import React, { Component } from "react";
import { connect } from "react-redux";

import "./Dashboard.css";
import Income from "../Income/Income";

import { getUsers } from "../../ducks/reducers/userReducer";
import Chart from "../Chart/Chart";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="dashboard">
        <Income />
        <Chart />
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
)(Dashboard);
