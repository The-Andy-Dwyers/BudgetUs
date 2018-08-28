import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import { getExpensesByCategory } from "../../ducks/reducers/expensesReducer";

class Chart extends Component {
  componentDidMount() {
    this.props.getExpensesByCategory();
  }
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
        {
          data: this.props.expenses.map(e => e.amount),
          backgroundColor: ["blue", "green", "purple", "red"]
        }
      ],
      labels: this.props.expenses.map(e => e.category)
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
        {this.props.expenses.length !== 0 && (
          <Doughnut data={spenddata} options={options} />
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    income: state.incomeReducer.income,
    expenses: state.expensesReducer.expensesbycat
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