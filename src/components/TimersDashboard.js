import React from 'react';
import helpers from '../helpers';
import ServerCommunication from '../helpers/serverCommunication';

import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';

const Client = new ServerCommunication();

/**
 * This is the main component, it shows a list of editable timers and a button/box to create a new timer
 * It also handle all the logic and communication with the server
 */
export default class TimersDashboard extends React.Component {

    state = {
        timers: []
    };

    handleEditFormSubmit = (attrs) => {
        this.updateTimer(attrs);
    };

    handleStartClick = (timerId) => {
        this.startTimer(timerId);
    };

    handleStopClick = (timerId) => {
        this.stopTimer(timerId);
    };

    /**
     * Return a function for filter/find in an array an element with the specified id
     * @param {string} searched_id
     * @returns {function(arg : {id: string}): boolean}
     */
    static byId(searched_id) {
        return ({id}) => id === searched_id;
    }

    /**
     * Update a timer using the defined id
     * @param {string} id
     * @param {APITimer} attrs
     */
    updateTimerById(id, attrs) {
        const timers = this.state.timers.slice();
        const timerPos = timers.findIndex(TimersDashboard.byId(id));
        if (~timerPos) {
            timers[timerPos] = Object.assign({}, timers[timerPos], attrs);
            this.setState({
                timers
            });
        }
    }

    /**
     * Update a timer
     * @param {APITimer} attrs
     */
    updateTimer(attrs) {
        this.updateTimerById(attrs.id, {
            title: attrs.title,
            project: attrs.project
        });
        Client.updateTimer(attrs);
    }

    /**
     * Start a timer
     * @param {string} timerId
     */
    startTimer(timerId) {
        this.updateTimerById(timerId, {
            runningSince: Date.now()
        });
        Client.startTimer({
            id: timerId
        });
    }

    /**
     * Stop a timer
     * @param {string} timerId
     */
    stopTimer(timerId) {
        const timer = this.state.timers.find(TimersDashboard.byId(timerId));
        if (timer) {
            this.updateTimerById(timerId, {
                elapsed: timer.elapsed + Date.now() - timer.runningSince,
                runningSince: null
            });
            Client.stopTimer({
                id: timerId
            });
        }
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    /**
     * Create a new timer
     * @param {APITimer} timer
     */
    createTimer(timer) {
        const t = helpers.newTimer(timer);
        this.setState({
            timers: this.state.timers.concat(t)
        });
        Client.createTimer(timer)
    }

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };

    /**
     * Delete the specified timerId from the server
     * @param {string} timerId
     */
    deleteTimer(timerId) {
        this.setState({
            timers: this.state.timers.filter(({id}) => id !== timerId)
        });
        Client.deleteTimer( timerId );
    }

    loadTimersFromServer = async() => {
        try {
            const timers = await Client.getTimers();
            this.setState({
                timers
            });
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Reload the data from the server every 5s
     */
    componentDidMount() {
        this.loadTimersFromServer();
        /**
         * Ref of the setInterval
         * This variable is used to clear the interval when the element is unmounted
         * @type {number}
         */
        this.ajaxInterval = setInterval(this.loadTimersFromServer, 5000);
    }

    /**
     * Stop loading the data from the server
     */
    componentWillUnmount() {
        clearInterval(this.ajaxInterval);
    }

    /**
     * Render
     * @returns {XML}
     */
    render() {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableTimerList
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
                        onStartClick={this.handleStartClick}
                        onStopClick={this.handleStopClick}
                        timers={this.state.timers}
                    />
                    <ToggleableTimerForm
                        onFormSubmit={this.handleCreateFormSubmit}
                        isOpen={true}/>
                </div>
            </div>
        );
    }
}
