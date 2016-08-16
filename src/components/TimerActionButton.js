import React from 'react';

/**
 * This component is a simple button, if the timer is running is a Stop button, else is a Start button
 */
export default class TimerActionButton extends  React.Component {

    /**
     * Render
     * @returns {XML}
     */
    render() {
        if (this.props.timerIsRunning) {
            return (
                <div
                    className='ui bottom attached red basic button'
                    onClick={this.props.onStopClick}
                >
                    Stop
                </div>
            );
        } else {
            return (
                <div
                    className='ui bottom attached green basic button'
                    onClick={this.props.onStartClick}
                >
                    Start
                </div>
            );
        }
    }
    
}