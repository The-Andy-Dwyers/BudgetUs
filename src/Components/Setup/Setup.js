import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Setup.css';
import { getGoals } from '../../ducks/reducers/expensesReducer';
import { getUsers } from '../../ducks/reducers/userReducer';
import Modal from '../Modal/Modal';

class Setup extends Component {
  state = {
    name: '',
    email: '',
    savings: ''
  };

  componentDidMount() {
    this.props.getGoals();
  }

  editUser = () => {
    const { users } = this.props.userReducer;
    const find =
      users.length && users.find(e => e.id === this.props.userReducer.id);
    const { name, email } = this.state;

    axios.put('/api/edit-user', {
      name: name ? name : find.name,
      email: email ? email : find.email
    });
  };

  editGoal = () => {
    const { savings } = this.state;
    const { id } = this.props.expensesReducer.goals[0];

    axios.put('/api/edit-goal', {
      id,
      savings
    });
  };

  render() {
    const { goals } = this.props.expensesReducer;
    return (
      <div className="setup">
        <div>
          <h1>Welcome to BudgetUs</h1>
          <h2>Let's get started!</h2>
          <input
            type="text"
            placeholder="Tell us your name"
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            type="text"
            placeholder="What is your email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <h3 onClick={() => this.editUser()}>Submit</h3>
        </div>

        <div className="setup_modal">
          <Modal type="goals" />
        </div>
        {/* {this.props.expensesReducer.goals.length !== 0 ? (
          <div>
            <h2>Edit Goal</h2>
            <input
              type="text"
              placeholder="Edit your goal"
              onChange={e => this.setState({ savings: e.target.value })}
            />
            <h3 onClick={() => this.editGoal()}>Submit</h3>
          </div>
        ) : (
          <div>Add Goal</div>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getGoals, getUsers }
)(Setup);
