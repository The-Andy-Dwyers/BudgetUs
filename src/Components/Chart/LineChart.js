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
      scales: { xAxes: [{ maxBarThickness: 90 }] },
      legend: { display: false },
      tooltips: {
        custom: function(tooltip) {
          tooltip.displayColors = false;
        },
        callbacks: {
          label: function(tooltipItem, data) {
            return "$" + data.datasets[0]["data"][tooltipItem.index];
          }
        }
      }
    };
    return (
      <div className="linechart_cont">
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
