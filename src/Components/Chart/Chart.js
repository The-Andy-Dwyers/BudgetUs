import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

class Chart extends Component {
  render() {
    const remaindata = {
      datasets: [
        {
          data: this.props.income.length !== 0 && [
            add(this.props.expenses),
            add(this.props.income) - add(this.props.expenses)
          ],
          backgroundColor: ["blue", "green", "purple"]
        }
      ],
      labels: ["expenses", "remaining"]
    };
    const spenddata = {
      datasets: [
        { data: [5, 250], backgroundColor: ["blue", "green", "purple"] }
      ],
      labels: ["label one", "ltwo", "third"]
    };
    const options = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return "$" + data.datasets[0]["data"][tooltipItem.index];
          }
        }
      },
      legend: { display: true, labels: { fontColor: "black" } },
      elements: { arc: { borderWidth: 0.5 } }
    };
    return (
      <div>
        <h2>Income Data</h2>
        {this.props.income.length !== 0 && (
          <Doughnut data={remaindata} options={options} />
        )}
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

export default connect(
  mapStateToProps,
  { getExpensesByCategory }
)(Chart);

function add(arr) {
  let total = 0;

  arr.forEach(e => (total += +e.amount));
  return total;
}
