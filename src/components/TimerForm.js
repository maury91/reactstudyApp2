import React from 'react';

/**
 * This component is a Timer when is being edited
 */
export default class TimerForm extends React.Component {

    state = {
        titleError: false,
        projectError: false
    };

    handleSubmit = () => {
        const titleError = !this.refs.title.value.trim().length;
        const projectError = !this.refs.project.value.trim().length;
        this.setState({
            titleError,
            projectError
        });
        if (!titleError && !projectError) {
            this.props.onFormSubmit({
                id: this.props.id,
                title: this.refs.title.value,
                project: this.refs.project.value
            });
        }
    };

    /**
     * Render
     * @returns {XML}
     */
    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        const titleClass = this.state.titleError ? 'field error' : 'field';
        const projectClass = this.state.projectError ? 'field error' : 'field';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className={titleClass}>
                            <label>Title</label>
                            <input type='text' ref="title" defaultValue={this.props.title}/></div>
                        <div className={projectClass}>
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