import React from 'react';
import TimerActionButton from './TimerActionButton';
import helpers from '../helpers';

/**
 * This component shows a simple timer, the timer update the time showed every 50ms
 */
export default class Timer extends React.Component {

    state = {
        buttons : false
    };

    /**
     * When the component is mounted, force the refresh every 50ms
     */
    componentDidMount() {
        /**
         * This variable is used to stop the forceUpdate when the component is unmounted
         * @type {number}
         */
        this.forceUpdateInterval = setInterval( () => this.forceUpdate(), 50 );
    }

    /**
     * When the component is about to be unmounted, stop the refresh
     */
    componentWillUnmount() {
        clearInterval( this.forceUpdateInterval );
    }

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    handleStartClick = () => {
        this.props.onStartClick(this.props.id);
    };

    handleStopClick = () => {
        this.props.onStopClick(this.props.id);
    };

    showButtons = () => {
        this.setState({
            buttons : true
        });
    }

    hideButtons = () => {
        this.setState({
            buttons : false
        });
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const elapsedString = helpers.renderElapsedString( this.props.elapsed, this.props.runningSince );
        let buttons;
        if ( this.state.buttons ) {
            buttons = (
                <TimerActionButton
                    timerIsRunning={!!this.props.runningSince}
                    onStartClick={this.handleStartClick}
                    onStopClick={this.handleStopClick}
                />
            );
        }
        return (
            <div className='ui centered card' onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
                <div className='content'>
                    <div className='header'> {this.props.title}
                    </div>
                    <div className='meta'>
                        {this.props.project} </div>
                    <div className='center aligned description'>
                        <h2>
                            {elapsedString}
                        </h2></div>
                    <div className='extra content'>
                        <span
                            className='right floated edit icon'
                            onClick={this.props.onEditClick}
                        >
                            <i className='edit icon'></i>
                        </span>
                        <span
                            className='right floated trash icon'
                            onClick={this.handleTrashClick}
                        >
                            <i className='trash icon'></i>
                        </span>
                    </div>
                </div>
                {buttons}
            </div>
        );
    }
}