import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import { getExpensesByCategory } from "../../ducks/reducers/expensesReducer";
import Switch from "react-switch";
import moment from "moment";

class Chart extends Component {
  constructor() {
    super();
    this.state = { month: true };
  }
  componentDidMount() {
    moment()
      .endOf("month")
      .format("l");
    this.props.getExpensesByCategory(
      moment()
        .startOf("month")
        .format("l"),
      moment()
        .endOf("month")
        .format("l")
    );
  }

  handleChange = month => {
    console.log(month);
    this.setState({ month });
  };

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
    const monthSpendData = {
      datasets: [
        {
          data: this.props.expenses.map(e => e.amount),
          backgroundColor: ["blue", "green", "purple", "red"]
        }
      ],
      labels: this.props.expenses.map(e => e.category)
    };
    const yearSpendData = {
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
        <Switch
          onChange={this.handleChange}
          checked={this.state.month}
          id="normal-switch"
        />
        {this.state.month ? "month chart" : "year chart"}
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
              <Doughnut data={monthSpendData} options={options} />
            )}
          </div>
        ) : (
          <div>
            <h2>Month View</h2>
            {this.props.expenses.length !== 0 && (
              <Doughnut data={yearSpendData} options={options} />
            )}
          </div>
        )}
      </div>
      // <div>
      //   <h2>Expenses Data</h2>
      //   {this.props.expenses.length !== 0 && (
      //     <Doughnut data={spenddata} options={options} />
      //   )}
      // </div>
    );
    // return (
    //   <div>
    //     <Switch
    //       onChange={this.handleChange}
    //       checked={this.state.checked}
    //       id="normal-switch"
    //     />
    //     {this.state.checked ? "Its true!" : "Its Not True!"}
    //   </div>
    // );
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
