import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

class Chart extends Component {
  render() {
    console.log();
    console.log(this.props.income);
    const incomedata = {
      datasets: [
        {
          data:
            this.props.income.length !== 0 &&
            this.props.income.map(e => e.amount),
          backgroundColor: ["blue", "green", "purple"]
        }
      ],
      labels: ["label one", "ltwo", "third"]
    };
    const spenddata = {
      datasets: [
        { data: [5, 250], backgroundColor: ["blue", "green", "purple"] }
      ],
      labels: ["label one", "ltwo", "third"]
    };
    const options = {
      legend: { display: true, labels: { fontColor: "black" } }
    };
    return (
      <div>
        <h2>Income Data</h2>
        <Doughnut data={incomedata} options={options} />
        <h2>Expenses Data</h2>
        <Doughnut data={spenddata} options={options} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    income: state.incomeReducer.income
  };
}

// export default Charts;
export default connect(mapStateToProps)(Chart);
