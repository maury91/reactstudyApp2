import React from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
import uuid from 'uuid';
import helpers from '../helpers';

export default class TimersDashboard extends React.Component {

    state = {
        timers: [{
            title: "Practice squat",
            project: "Gym Chores",
            id: uuid.v4(),
            elapsed: 5456099,
            runningSince: Date.now()
        }, {
            title: "Bake squash",
            project: "Kitchen Chores",
            id: uuid.v4(),
            elapsed: 1273998,
            runningSince: null
        }]
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

    static byId(searched_id) {
        return ({id}) => id === searched_id;
    }

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

    updateTimer(attrs) {
        this.updateTimerById(attrs.id, {
            title: attrs.title,
            project: attrs.project
        });
    }

    startTimer( timerId ) {
        this.updateTimerById( timerId, {
            runningSince: Date.now()
        });
    }

    stopTimer( timerId ) {
        const timer = this.state.timers.find(TimersDashboard.byId(timerId));
        if ( timer ) {
            this.updateTimerById( timerId, {
                elapsed : timer.elapsed + Date.now() - timer.runningSince,
                runningSince : null
            });
        }
    }

    handleCreateFormSubmit = (timer) => {
        this.createTimer(timer);
    };

    createTimer(timer) {
        const t = helpers.newTimer(timer);
        this.setState({
            timers: this.state.timers.concat(t)
        });
    };

    handleTrashClick = (timerId) => {
        this.deleteTimer(timerId);
    };

    deleteTimer(timerId) {
        this.setState({
            timers: this.state.timers.filter(({id}) => id !== timerId)
        });
    }


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
