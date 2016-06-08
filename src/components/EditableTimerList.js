import React from 'react';
import EditableTimer from './EditableTimer';

export default class EditableTimerList extends React.Component {
    render() {
        return (
            <div id='timers'>
                <EditableTimer title='Learn React' project='Web Domination' elapsed='8986300' runningSince={null}
                               editFormOpen={false}
                />
                <EditableTimer
                    title='Learn extreme ironing' project='World Domination' elapsed='3890985' runningSince={null}
                    editFormOpen={true}
                /></div>
        );
    }
}
