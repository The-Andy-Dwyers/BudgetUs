import React, { Component } from 'react';
import axios from 'axios';

import './Expenses.css';

export default class Expenses extends Component {
  componentDidMount() {
    this.getExpenses();
  }

  getExpenses = () => {
    axios.get('/api/expenses').then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="expenses">
        <h1>Expenses</h1>
      </div>
    );
  }
}
