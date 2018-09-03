import React, { Component } from 'react';

import './Settings.css'
import Setup from '../Setup/Setup';

export default class Settings extends Component {

    render() {
        return (
            <div className='settings_main'>
                <h1>Settings</h1>
                <Setup />
            </div>
        )
    }
}
