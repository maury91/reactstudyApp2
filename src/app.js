require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import TimersDashboard from './components/TimersDashboard';

/**
 * Main file of the application, here the application is inserted in the document
 * @file App
 */

ReactDOM.render(
    <TimersDashboard />,
    document.getElementById('content')
);