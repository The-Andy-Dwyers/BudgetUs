import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './Income.css';
import {
  getIncome,
  updateAmount,
  updateName
} from '../../ducks/reducers/incomeReducer';
import {getUser} from '../../ducks/reducers/userReducer';

class Income extends Component {
  componentDidMount() {
    this.props.getIncome();
    this.props.getUser();
  }

  submitIncome = e => {
    let {amount, name} = this.props.incomeReducer
    let{ users_id} = this.props.userReducer.id

    axios.post('/api/setup-income', {
      amount, name, users_id
    })
  }

  render() {
    const { updateAmount, updateName } = this.props;

    return (
      <div className="income">
        <h1>Income</h1>
        <h2>Let's add your main expenses!</h2>
        <h3>Mortgage / Rent</h3>
        <div className='income_sub'>
          <p>Name:</p>
          <input onChange={e => updateName(e.target.value)} type="text" />
        </div>
        <div className='income_sub'>
          <p>Amount: $</p>
          <input onChange={e => updateAmount(e.target.value)} type="text" />
        </div>
        <h3 className='income_btn' onClick={e => this.submitIncome(e)}>Submit</h3>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser,
    getIncome,
    updateAmount,
    updateName
  }
)(Income);
