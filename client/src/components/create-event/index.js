import React from 'react';
import './styles.css'
//import AuthService from '../../service/auth.service';
import { withNavigation } from '../../helpers/hocs';
import ValidationMessages from '../../constants/validationMessages.constants';
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";


class CreateEventComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputBlur = this.handleUserInputBlur.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validationTimer = null;

        this.state = {
            isFormValid: false,
            formError: undefined,
            fields: {
                title: {
                    value: '',
                    displayName: 'Title',
                    valid: undefined,
                    validations: {
                        required: true,
                        minLength: 3,
                        maxLength: 75
                    }, 
                    errors: [],
                    wasValidated: false
                },
                date: {
                    value: Date.now(),
                    displayName: 'Event Date',
                    valid: undefined,
                    validations: {
                        required: true,
                        date: true
                    }, 
                    errors: [],
                    wasValidated: false
                },
                startTime: {
                    value: '',
                    displayName: 'Event Start Time',
                    valid: undefined,
                    validations: {
                        required: true,
                        time: true
                    }, 
                    errors: [],
                    wasValidated: false
                },
                endTime: {
                    value: '',
                    displayName: 'Event End Time',
                    valid: undefined,
                    validations: {
                        required: true,
                        time: true
                    }, 
                    errors: [],
                    wasValidated: false
                },
                volunteers: {
                    value: 5,
                    displayName: 'volunteers',
                    valid: undefined,
                    validations: {
                        max: 200,
                        min: 5,
                        required: true,
                        number: true
                    }, 
                    errors: [],
                    wasValidated: false
                }
            }
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        // const elements = e.target.elements;
        // AuthService.login(elements.title.value, elements.password.value)
        //     .then(res => {
        //         if(res.ok) {
        //             this.setState({formError: undefined}, () => {
        //                 this.props.navigate('/');
        //             });
        //         } else {
        //             res.text().then(e => {
        //                 this.setState({formError: JSON.parse(e).message});
        //             });   
        //         }
        //     });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        const fields = {...this.state.fields}
        const newState = {...fields[name]};
        newState.value = value;
        newState.errors = [];
        newState.valid = undefined;
        newState.wasValidated = false;
        fields[name] = newState;
        this.setState({fields}, ()=> {

            if(!!this.validationTimer) {
                clearTimeout(this.validationTimer);
            }

            this.validationTimer = setTimeout(() => {
                this.validateInput(e.target);
            }, 500);
            
        });
    }

    handleUserInputBlur(e) {
        this.validateInput(e.target);
    }

    handleVolunteerChange(change) {
        const fields = {...this.state.fields}
        fields.volunteers.value += change;
        console.log(fields.volunteers.value >= fields.volunteers.validations.min && fields.volunteers.value <= fields.volunteers.validations.max)
        if(fields.volunteers.value >= fields.volunteers.validations.min && fields.volunteers.value <= fields.volunteers.validations.max) {
            this.setState({fields})
        }
            
    }

    validateInput(target) {
        const name = target.name;
        const value = target.value;
        const fields = {...this.state.fields}
        const newState = {...fields[name]};
        newState.wasValidated = true;
        newState.errors = [];

        if(!value.trim().length && newState.validations.required) {
            newState.errors.push(ValidationMessages.REQUIRED)
        }

        if(value.length && value.length < newState.validations.minLength) {
            newState.errors.push(ValidationMessages.MIN_LENGTH.format(newState.validations.minLength))
        }

        if(value.length > newState.validations.maxLength) {
            newState.errors.push(ValidationMessages.MAX_LENGTH.format(newState.validations.maxLength))
        }

        fields[name] = newState;
        newState.valid = !newState.errors.length;
        const isFormValid = !Object.keys(fields).filter(k => !fields[k].wasValidated || !fields[k].valid).length;
        this.setState({fields, isFormValid});

    }

    render() {
        return  (
            <div className="CreateEventComponent container px-4 my-5 ">
                <div className="row gx-5 d-flex align-self-stretch">
                    <div className="col-lg d-flex align-self-stretch">
                        <div className="pane p-3 border bg-white align-self-stretch flex-fill">
                            <h2 className='text-center'>Create Event</h2>
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className={`alert alert-danger ${!this.state.formError ? 'd-none' : ''}`} role="alert">
                                    {this.state.formError}
                                </div>

                                <div className={`form-group`}>
                                    <label htmlFor="titleInput">Title</label>
                                    <input  name="title" 
                                            type="text" 
                                            className={`form-control ${this.state.fields.title.wasValidated ? this.state.fields.title.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                            id="titleInput" 
                                            aria-describedby="titleHelp titleFeedBack" 
                                            placeholder="Enter title" 
                                            value={this.state.fields.title.value} 
                                            onChange={(event) => this.handleUserInput(event)}
                                            onBlur={(event) => this.handleUserInputBlur(event)}
                                            required
                                    />
                                    <small id="titleHelp" className={`form-text text-muted ${this.state.fields.title.valid || !this.state.fields.title.wasValidated ? '' : 'd-none'}`}>Please input the Event's Title</small>
                                    <div id="titleFeedBack" className="invalid-feedback">
                                        {
                                            this.state.fields.title.errors.map(m => <li key={m}>{m}</li>)
                                        }
                                    </div>
                                </div>

                                <div className='row my-4'>
                                    <div className='col-6'>
                                        <div className={`form-group`}>
                                            <label htmlFor="dateInput">Event Date</label>
                                            <DatePicker
                                                id='dateInput' 
                                                selected={this.state.fields.date.value}
                                                onChange={(date) => {
                                                        const fields = {...this.state.fields};
                                                        fields.date.value = date;
                                                        this.setState({fields})
                                                    }
                                                }
                                                inline
                                            />
                                        </div>        
                                    </div>
                                    <div className='col-6'>
                                         <div className={`form-group`}>
                                            <label htmlFor="formFileLg" className="form-label">Event Thumnail</label>
                                            <div className='file-input-field'>
                                                <div className='preview'></div>
                                                <input id="formFileLg form-control" type="file" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className={`form-group`}>
                                            <label htmlFor="startTimeInput">Start Time</label>
                                            <input  name="startTime" 
                                                    type="text" 
                                                    className={`form-control ${this.state.fields.startTime.wasValidated ? this.state.fields.startTime.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                                    id="startTimeInput" 
                                                    aria-describedby="startTimeHelp startTimeFeedBack" 
                                                    placeholder="Enter Start Time" 
                                                    value={this.state.fields.startTime.value} 
                                                    onChange={(event) => this.handleUserInput(event)}
                                                    onBlur={(event) => this.handleUserInputBlur(event)}
                                                    required
                                            />
                                            <small id="startTimeHelp" className={`form-text text-muted ${this.state.fields.startTime.valid || !this.state.fields.startTime.wasValidated ? '' : 'd-none'}`}>Please input the Event's Start Time</small>
                                            <div id="startTimeFeedBack" className="invalid-feedback">
                                                {
                                                    this.state.fields.startTime.errors.map(m => <li key={m}>{m}</li>)
                                                }
                                            </div>
                                        </div>      
                                    </div>
                                    <div className='col-6'>
                                        <div className={`form-group`}>
                                            <label htmlFor="endTimeInput">End Time</label>
                                            <input  name="endTime" 
                                                    type="text" 
                                                    className={`form-control ${this.state.fields.endTime.wasValidated ? this.state.fields.endTime.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                                    id="endTimeInput" 
                                                    aria-describedby="endTimeHelp endTimeFeedBack" 
                                                    placeholder="Enter Event End Time" 
                                                    value={this.state.fields.endTime.value} 
                                                    onChange={(event) => this.handleUserInput(event)}
                                                    onBlur={(event) => this.handleUserInputBlur(event)}
                                                    required
                                            />
                                            <small id="endTimeHelp" className={`form-text text-muted ${this.state.fields.endTime.valid || !this.state.fields.endTime.wasValidated ? '' : 'd-none'}`}>Please input the Event's End Time</small>
                                            <div id="endTimeFeedBack" className="invalid-feedback">
                                                {
                                                    this.state.fields.endTime.errors.map(m => <li key={m}>{m}</li>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`form-group m-auto volunteers-form-group my-5`}>
                                    <label htmlFor="volunteersInput">How many</label>
                                    <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => this.handleVolunteerChange(-10)}>-10</button>
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => this.handleVolunteerChange(-1)}>-</button>
                                        <input  name="volunteers" 
                                                type="text" 
                                                className={`form-control ${this.state.fields.volunteers.wasValidated ? this.state.fields.volunteers.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                                id="volunteersInput" 
                                                aria-describedby="volunteersHelp volunteersFeedBack" 
                                                value={this.state.fields.volunteers.value} 
                                                onChange={(event) => this.handleUserInput(event)}
                                                onBlur={(event) => this.handleUserInputBlur(event)}
                                                required
                                                disabled
                                        />
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.handleVolunteerChange(1)}>+</button>
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.handleVolunteerChange(10)}>+10</button>
                                    </div>         
                                    <small id="volunteersHelp" className={`form-text text-muted ${this.state.fields.volunteers.valid || !this.state.fields.volunteers.wasValidated ? '' : 'd-none'}`}>Aggies</small>
                                    <div id="volunteersFeedBack" className="invalid-feedback">
                                        {
                                            this.state.fields.volunteers.errors.map(m => <li key={m}>{m}</li>)
                                        }
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary action" disabled={!this.state.isFormValid}>Create Event</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg d-flex align-self-stretch">
                        <div className="pane p-3 border bg-white align-self-stretch flex-fill">
                            <h2 className='text-center'>Preview</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(CreateEventComponent);