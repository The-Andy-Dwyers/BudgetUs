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
    console.log(this.props.totals)
    console.log(this.props)
    const data = {
      labels: this.props.totals.reverse().map(e => e.month.trim()),
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
      <div className='linechart'>
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
