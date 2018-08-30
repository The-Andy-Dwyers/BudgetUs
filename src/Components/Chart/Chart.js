import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import {
  getExpensesByCategory,
  getYearlyExpensesByCategory,
  getExpenses
} from "../../ducks/reducers/expensesReducer";
import Switch from "react-switch";
// import moment from "moment";

class Chart extends Component {
  constructor() {
    super();
    this.state = { month: true };
  }
  componentDidMount() {
    this.props.getExpensesByCategory();
  }

  handleChange = month => {
    this.setState(
      {
        month
      },
      () => {
        this.state.month
          ? (this.props.getExpensesByCategory(), this.props.getExpenses())
          : this.props.getYearlyExpensesByCategory();
        this.props.getExpenses();
      }
    );
  };
  render() {
    const remainData = {
      datasets: [
        {
          data: [
            this.props.expensesum,
            this.props.incomesum - this.props.expensesum
          ],
          backgroundColor: [
            "blue",
            this.props.incomesum - this.props.expensesum < 0 ? "red" : "green",
            "purple"
          ]
        }
      ],
      labels: [
        "expenses",
        this.props.incomesum - this.props.expensesum < 0
          ? "defecit"
          : "remaining"
      ]
    };
    const spendData = {
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
    return this.props.type === "remaining" ? (
      <div>
        <h2>Remaining Chart</h2>
        <Doughnut data={remainData} options={options} />
      </div>
    ) : (
      <div>
        <h2>Expenses By Category Chart</h2>
        <Switch
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
        />
        {this.state.month ? (
          <div>
            <h2>Month View</h2>
            {this.props.expenses.length !== 0 && (
              <Doughnut data={spendData} options={options} />
            )}
          </div>
        ) : (
          <div>
            <h2>Year View</h2>
            {this.props.expenses.length !== 0 && (
              <Doughnut data={spendData} options={options} />
            )}
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    income: state.incomeReducer.income,
    expenses: state.expensesReducer.expensesbycat,
    incomesum: state.incomeReducer.dashboard.incomesum,
    expensesum: state.incomeReducer.dashboard.expensesum
  };
}

export default connect(
  mapStateToProps,
  { getExpensesByCategory, getYearlyExpensesByCategory, getExpenses }
)(Chart);
