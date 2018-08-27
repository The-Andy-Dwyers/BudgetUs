import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Navbar.css';

export default class Navbar extends Component {

    render(){
        return (
            <div className='navbar'>
                <Link className='link' to ='/dashboard'>
                    <h2>Home</h2>
                </Link>
                <Link className='link' to ='/expenses'>
                    <h2>Expenses</h2>
                </Link>
                <Link className='link' to ='/calendar'>
                    <h2>Calendar</h2>
                </Link>
                <Link className='link' to ='/settings'>
                    <h2>Settings</h2>
                </Link>

            </div>
        )
    }
}