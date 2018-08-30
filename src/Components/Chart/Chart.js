import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";

import "./Chart.css";

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
            "#28224F",
            this.props.incomesum - this.props.expensesum < 0
              ? "#d12012"
              : "#2EC4B6"
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
          backgroundColor: [
            "#D12012",
            "#28224F",
            "#68151E",
            "#205798",
            "#2EC4B6"
          ]
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
      <div className="chart">
        <h2>Remaining Chart</h2>
        <div className="chart_main">
          <Doughnut data={remainData} options={options} />
        </div>
      </div>
    ) : (
      <div className="chart">
        <h2>Expenses By Category Chart</h2>
        <Switch
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
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
