import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Charts extends Component {
  render() {
    const data = {
      datasets: [{ data: ["ack", "do"], backgroundColor: ["blue", "green"] }],
      labels: ["label one", "ltwo"]
    };
    return (
      <div>
        <Doughnut data={data} />
      </div>
    );
  }
}

export default Charts;
