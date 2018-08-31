import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { getExpenseTotalsByMonth } from "../../ducks/reducers/expensesReducer";

class LineChart extends Component {
  componentDidMount() {
    this.props.getExpenseTotalsByMonth();
  }
  render() {
    const data = {
      labels: this.props.totals.map(e => e.month.trim()),
      datasets: [
        {
          //   label: "Population (millions)",
          backgroundColor: [
            "#D12012",
            "#28224F",
            "#68151E",
            "#205798",
            "#2EC4B6",
            "#D12012",
            "#28224F",
            "#68151E",
            "#205798",
            "#2EC4B6",
            "#D12012",
            "#28224F",
            "#68151E",
            "#205798",
            "#2EC4B6"
          ],
          data: this.props.totals.map(e => +e.sum)
        }
      ]
    };
    const options = {
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return "$" + data.datasets[0]["data"][tooltipItem.index];
          }
        }
      }
      //   title: {
      //     display: true,
      //     text: "Predicted world population (millions) in 2050"
      //   }
    };
    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totals: state.expensesReducer.expensesbymonth
  };
}

export default connect(
  mapStateToProps,
  { getExpenseTotalsByMonth }
)(LineChart);
