import React, { Component } from 'react';
import {connect} from 'react-redux';

import './Income.css';
import {getIncome} from '../../ducks/reducers/incomeReducer';

class Income extends Component {
  componentDidMount() {
    this.props.getIncome();
  }


  

  render() {
      console.log(this.props)
    return (
      <div className="dashboard">
        <h1>Income</h1>
      </div>
    );
  }
}


const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getIncome
  }
)(Income);
