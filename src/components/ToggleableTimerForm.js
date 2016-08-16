import React from 'react';
import TimerForm from './TimerForm';

/**
 * This component shows a timer or a form to edit the timer, based on his internal state
 */
export default class ToggleableTimerForm extends React.Component {

    state = {
        isOpen: false
    };

    handleFormOpen = () => {
        this.setState({
            isOpen: true
        });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    handleFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({ isOpen: false });
    };

    /**
     * Render
     * @returns {XML}
     */
    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button
                        className='ui basic button icon'
                        onClick={this.handleFormOpen}
                    >
                        <i className='plus icon'></i>
                    </button>
                </div> );
        }
    }
}