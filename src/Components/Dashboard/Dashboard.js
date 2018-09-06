import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Income from '../Income/Income';
import Chart from '../Chart/Chart';
import Goals from '../Goals/Goals';
import LineChart from '../Chart/LineChart';
import Modal from '../Modal/Modal';
import TextLoop from 'react-text-loop';
import swal from 'sweetalert2';

import './Dashboard.css';
import { getUsers, getUser, getTrophy } from '../../ducks/reducers/userReducer';
import { getDashboard, getIncome } from '../../ducks/reducers/incomeReducer';
import { getTopExpenses } from '../../ducks/reducers/expensesReducer';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      month: true,
      expenses: []
    };
  }

  async componentDidMount() {
    await this.props.getDashboard(start(moment()), end(moment()));
    await this.props.getTopExpenses(start(moment()), end(moment()));
    await this.props.getTrophy();
    await this.props.getUser();
    await this.props.getIncome(this.props.userReducer.id);
    await this.addTrophy2();
  }

  addTrophy2 = () => {
    const { id } = this.props.userReducer;
    const { income } = this.props.incomeReducer;
    const { trophies } = this.props.userReducer;
    var find = trophies.filter(e => e.trophy === 2);

    !find &&
      income &&
      income.length >= 10 &&
      axios
        .post('/api/add-trophy', {
          trophy: 2,
          id
        })
        .then(() => {
          swal({
            position: 'top-end',
            title: 'New Achievement!',
            text: 'Go to settings to view your medals',
            imageUrl: 'https://image.flaticon.com/icons/svg/610/610333.svg',
            imageWidth: 150,
            imageHeight: 225,
            showConfirmButton: false,
            timer: 3000
          });
        });
  };

  handleChange = month => {
    if (month === 'year') {
      this.props.getDashboard(
        moment()
          .startOf('year')
          .format('l'),
        moment().format('l')
      );
      this.props.getTopExpenses(
        moment()
          .startOf('year')
          .format('l'),
        moment().format('l')
      );
    } else {
      this.props.getDashboard(start(month), end(month));
      this.props.getTopExpenses(start(month), end(month));
    }
  };

  render() {
    const { amount, dashboard } = this.props.incomeReducer;
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

    const options = this.props.incomeReducer.months
      .filter(e => e.month.trim() !== moment().format('MMMM'))
      .map((e, i) => (
        <option key={i} value={moment(e.month.trim(), 'MMMM').format('l')}>
          {e.month.trim()}
        </option>
      ));

    const remaining = dashboard && dashboard.incomesum - dashboard.expensesum;
    const days = moment().daysInMonth();
    const daily = Math.round((remaining / days) * 100) / 100;

    const {income} = this.props.incomeReducer
    const sum = income && income.reduce((sum, e) => (sum += +e.amount), 0)

    const sumTotal = sum + +amount
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
                <option value={'year'}>YTD</option>
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
                You've made <mark>${sumTotal}</mark> this year!
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
    getUser,
    getTrophy,
    getDashboard,
    getIncome,
    getTopExpenses
  }
)(Dashboard);

function start(d) {
  return moment(new Date(d).toISOString())
    .startOf('month')
    .format('l');
}
function end(d) {
  return moment(new Date(d).toISOString())
    .endOf('month')
    .format('l');
}
