import React, { Component } from 'react';
import $ from 'jquery';

import './LandingPage.css';

export default class LandingPage extends Component {
  componentDidMount() {
    $(window).scroll(function() {
      var scrollh = $(this).scrollTop();

      if (scrollh < 60 || scrollh === 0) {
        $('.landing_header').css({
          // height: '8vh',
          display: 'none'
        });
        $('.login_btn').css({
          'background-color': '#fff',
          'color': '#fff',
          'z-index': '9999'
        })
      } else {
        $('.landing_header').css({
          // height: '18vh',
          display: 'block',
          'background-color': '#fff'
        });
        $('.login_btn').css({
          'background-color': '#f6f6f6',
          'z-index': '9999'
        })
      }
    });
  }
  render() {
    return (
      <div className="landing">
        <div className="landing_header" />
        <div className="landing_content">
          <h1>BudgetUs</h1>
        </div>
        <a className="login_btn" href={process.env.REACT_APP_LOGIN}>
          <h1 className="login_link">Login</h1>
        </a>
        <div className="landing_sub">
          <div>
            <h2>Create Budget</h2>
            <p>
              Easily plan a budget to fit your needs, and keep track of your
              income and expenses.
            </p>
            <img
              src="https://image.flaticon.com/icons/svg/214/214285.svg"
              alt="Graph icon"
            />
          </div>
          <div>
            <h2>Manage Bills</h2>
            <p />
            <img
              src="https://image.flaticon.com/icons/svg/438/438051.svg"
              alt="Paying bills"
            />
          </div>
          <div>
            <h2>Track Savings</h2>
            <p>
              Lorem ipsum debitis optio maiores repellendus, aliquid accusamus
              sunt laudantium.
            </p>
            <img
              src="https://image.flaticon.com/icons/svg/858/858699.svg"
              alt="Savings tracker"
            />
          </div>
        </div>
        <div className="landing_sub1">
          <img
            src="https://www.mint.com/sites/default/files/styles/mint_half_width/public/billsmodule%402x_1.png?itok=Z7UZtlau&timestamp=1535430201"
            alt="Iphone"
          />
        </div>
        <div className="landing_sub2">
          <img
            className="ipad_image"
            src="http://icon-park.com/imagefiles/ipad_air_2_silver.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}
