import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import { getExpensesByCategory } from "../../ducks/reducers/expensesReducer";

class Chart extends Component {
  componentDidMount() {
    this.props.getExpensesByCategory();
  }
  render() {
    console.log(this.props);
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
    income: state.incomeReducer.income,
    expenses: state.expensesReducer.expensesbycat
  };
}

export default connect(
  mapStateToProps,
  { getExpensesByCategory }
)(Chart);
