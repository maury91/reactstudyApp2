import React from 'react';
import EditableTimer from './EditableTimer';

/**
 * This component is a list of Editable Timers
 * This component is stateless
 */
export default class EditableTimerList extends React.Component {

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const timers = this.props.timers.map((timer) => {
            return (
                <EditableTimer
                    key={timer.id}
                    id={timer.id}
                    title={timer.title}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    runningSince={timer.runningSince}
                    onFormSubmit={this.props.onFormSubmit}
                    onTrashClick={this.props.onTrashClick}
                    onStartClick={this.props.onStartClick}
                    onStopClick={this.props.onStopClick}
                /> );
        });
        return (
            <div id='timers'>
                {timers}
            </div>
        );
    }
}
