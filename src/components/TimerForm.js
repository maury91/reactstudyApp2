import React from 'react';

export default class TimerForm extends React.Component {

    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.refs.title.value,
            project: this.refs.project.value
        });
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input type='text' ref="title" defaultValue={this.props.title}/></div>
                        <div className='field'>
                            <label>Project</label>
                            <input type='text' ref="project" defaultValue={this.props.project}/></div>
                        <div className='ui two bottom attached buttons'>
                            <button
                                className='ui basic blue button'
                                onClick={this.handleSubmit}
                            >
                                {submitText}
                            </button>
                            <button
                                className='ui basic red button'
                                onClick={this.props.onFormClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div> );
    }
}