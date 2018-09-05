import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Income from '../Income/Income';
import Chart from '../Chart/Chart';
import Goals from '../Goals/Goals';
import LineChart from '../Chart/LineChart';
import Modal from '../Modal/Modal';
import TextLoop from 'react-text-loop';

import './Dashboard.css';
import { getUsers } from '../../ducks/reducers/userReducer';
import { getDashboard } from '../../ducks/reducers/incomeReducer';
import { getTopExpenses } from '../../ducks/reducers/expensesReducer';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      month: true,
      expenses: []
    };
  }
  componentDidMount() {
    this.props.getDashboard(start(moment()), end(moment()));
    this.props.getTopExpenses(start(moment()), end(moment()));
    // this.getIncome();
  }


// getIncome = () => {
// const {id} = this.props.userReducer
// axios.get(`/api/income/${id}`)

// };


  handleChange = month => {
    if (
      month ===
      moment()
        .startOf('year')
        .format('l')
    ) {
      this.props.getDashboard(start(month), moment().format('l'));
      this.props.getTopExpenses(
        start(month),
        moment()
          .endOf('month')
          .format('l')
      );
    } else {
      this.props.getDashboard(start(month), end(month));
      this.props.getTopExpenses(start(month), end(month));
    }
  };
  handleSwitchChange = month => {
    this.setState(
      { month },
      () =>
        this.state.month
          ? this.props.getDashboard(start(moment()), end(moment()))
          : this.props.getDashboard(
              start(moment().startOf('year')),
              end(moment().endOf('year'))
            )
    );
  };

  render() {
    console.log(this.props)
    const { topExpenses } = this.props.expensesReducer;
    const map =
      topExpenses.length !== 0 &&
      topExpenses.map((e, i) => {
        return (
          <div className="dash_map" key={i}>
            <div className="dash_map_icon">
              {e.category === 'Food' ? (
                <img
                  src="https://image.flaticon.com/icons/svg/263/263125.svg"
                  alt="Food icon"
                />
              ) : e.category === 'Bills' ? (
                <img
                  src="https://image.flaticon.com/icons/svg/85/85966.svg"
                  alt="Bills icon"
                />
              ) : e.category === 'Entertainment' ? (
                <img
                  src="https://image.flaticon.com/icons/svg/263/263068.svg"
                  alt="Entertainment icon"
                />
              ) : e.category === 'Gas' ? (
                <img
                  src="https://image.flaticon.com/icons/svg/115/115101.svg"
                  alt="Gas icon"
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/116/116384.svg"
                  alt="Rent icon"
                />
              )}
            </div>
            <div className="dash_map2">
              <p>{e.category}</p>
              <p>
                <mark>${e.amount.toLocaleString()}</mark>
              </p>
            </div>
          </div>
        );
      });
    const options = this.props.expensesReducer.expensesbymonth
      .filter(e => e.month.trim() !== moment().format('MMMM'))
      .map((e, i) => (
        <option key={i} value={moment(e.month.trim(), 'MMMM').format('l')}>
          {e.month.trim()}
        </option>
      ));

    const { dashboard } = this.props.incomeReducer;
    const remaining = dashboard && dashboard.incomesum - dashboard.expensesum;
    const days = moment().daysInMonth();
    const daily = Math.round((remaining / days) * 100) / 100;

    // console.log(this.props);

    return (
      <div className="dashboard">
        <header className="dash_switch">
          <div>
            {this.state.month && (
              <select
                className="dash_options"
                onChange={e => this.handleChange(e.target.value)}
              >
                <option
                  className="dash_select"
                  value={moment().format('l')}
                  defaultValue={moment().format('l')}
                >
                  {moment().format('MMMM')}
                </option>
                <option disabled>───────</option>
                {options}
                <option
                  value={moment()
                    .startOf('year')
                    .format('l')}
                >
                  YTD
                </option>
              </select>
            )}
          </div>
          <div>
            <TextLoop speed={4000} adjustingSpeed={500}>
              <p>
                You've spent <mark>${daily && daily} </mark> per day this month.
              </p>
              <p>
                You earned <mark>${dashboard.incomesum}</mark> this month!
              </p>
              <p>
                You've made <mark>${dashboard.incomesum}</mark> this year!
              </p>
            </TextLoop>
          </div>
          <div className="dash_modal">
            <Modal />
          </div>
        </header>
        <Goals />
        <div className="dashboard_top">
          {this.props.incomeReducer.dashboard.sources && (
            <Income month={this.state.month} />
          )}
          {this.state.month ? (
            <div className="dashboard_expense">
              <h2>Expenses Overview</h2>
              <div>{map}</div>
              <Link className="link2" to="/expenses">
                <h2 className="expenses_link btn">More info</h2>
              </Link>
            </div>
          ) : (
            <div className="dashboard_expense">
              <Link className="link2" to="/expenses">
                <h2 className="expenses_link btn">Go To Expenses Page</h2>
              </Link>
            </div>
          )}
        </div>
        <div className="dash_bottom">
          {this.props.incomeReducer.dashboard.sources && (
            <Chart type="remaining" />
          )}
          {this.props.incomeReducer.dashboard.sources && <LineChart />}
        </div>
        <div className="dash_top2">
          {this.props.incomeReducer.dashboard.sources && (
            <Income month={this.state.month} />
          )}
          {this.props.incomeReducer.dashboard.sources && (
            <Chart type="remaining" />
          )}
        </div>
        <div className="dash_bottom2">
          {this.state.month ? (
            <div className="dashboard_expense">
              <h2>Expenses Overview</h2>
              <div>{map}</div>
              <Link className="link2" to="/expenses">
                <h2 className="expenses_link btn">More info</h2>
              </Link>
            </div>
          ) : (
            <div className="dashboard_expense">
              <Link className="link2" to="/expenses">
                <h2 className="expenses_link btn">Go To Expenses Page</h2>
              </Link>
            </div>
          )}

          {this.props.incomeReducer.dashboard.sources && <LineChart />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUsers,
    getDashboard,
    getTopExpenses
  }
)(Dashboard);

function start(d) {
  return moment(d)
    .startOf('month')
    .format('l');
}
function end(d) {
  return moment(d)
    .endOf('month')
    .format('l');
}
