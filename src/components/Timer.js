import React from 'react';
import helpers from '../helpers';

export default class Timer extends React.Component {


    handleTrashClick = () => {
        this.props.onTrashClick(this.props.id);
    };

    render() {
        const elapsedString = helpers.renderElapsedString(this.props.elapsed);
        return (
            <div className='ui centered card'>
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
                <div className='ui bottom attached blue basic button'>
                    Start
                </div>
            </div>
        );
    }
}