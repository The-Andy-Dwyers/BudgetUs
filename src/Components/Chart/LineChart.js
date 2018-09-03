import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getExpenseTotalsByMonth } from '../../ducks/reducers/expensesReducer';

import './Chart.css';

class LineChart extends Component {
  componentDidMount() {
    this.props.getExpenseTotalsByMonth();
  }
  render() {
    const data = {
      labels: this.props.totals.reverse().map(e => {
        if (e.month === '01') {
          return 'January';
        } else if (e.month === '02') {
          return 'February';
        } else if (e.month === '03') {
          return 'March';
        } else if (e.month === '04') {
          return 'April';
        } else if (e.month === '05') {
          return 'May';
        } else if (e.month === '06') {
          return 'June';
        } else if (e.month === '07') {
          return 'July';
        } else if (e.month === '08') {
          return 'August';
        } else if (e.month === '09') {
          return 'September';
        } else if (e.month === '10') {
          return 'October';
        } else if (e.month === '11') {
          return 'November';
        } else {
          return 'December';
        }
      }),
      datasets: [
        {
          //   label: "Population (millions)",
          backgroundColor: [
            '#D12012',
            '#28224F',
            '#68151E',
            '#205798',
            '#2EC4B6',
            '#D12012',
            '#28224F',
            '#68151E',
            '#205798',
            '#2EC4B6',
            '#D12012',
            '#28224F',
            '#68151E',
            '#205798',
            '#2EC4B6'
          ],
          data: this.props.totals.map(e => +e.sum)
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMin: 0, // minimum will be 0, unless there is a lower value.
              // OR //
              beginAtZero: true // minimum value will be 0.
            }
          }
        ]
      },
      legend: { display: false },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return '$' + data.datasets[0]['data'][tooltipItem.index];
          }
        }
      }
      //   title: {
      //     display: true,
      //     text: "Predicted world population (millions) in 2050"
      //   }
    };
    return (
      <div className="linechart">
        <h1>Expenses Breakdown</h1>
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
