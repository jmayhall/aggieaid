import React from 'react';
import './styles.css'
import ResourceService from '../../service/resource.service';
import { withNavigation } from '../../helpers/hocs';
import ValidationMessages from '../../constants/validationMessages.constants';
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";
import EventService from '../../service/event.service';
import AuthService from '../../service/auth.service';

class CreateEventComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputBlur = this.handleUserInputBlur.bind(this);
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleVolunteerChange = this.handleVolunteerChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validationTimer = null;

        this.state = {
            isFormValid: false,
            formError: undefined,
            previewUrl: undefined,
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
                    valid: true,
                    validations: {
                        required: true,
                        date: true
                    }, 
                    errors: [],
                    wasValidated: true
                },
                thumbnail: {
                    value: undefined,
                    displayName: 'Event Thumbnail',
                    valid: undefined,
                    validations: {
                        required: false,
                        image: true,
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
                    displayName: 'Aggies',
                    valid: true,
                    validations: {
                        max: 200,
                        min: 5,
                        required: true,
                        number: true
                    }, 
                    errors: [],
                    wasValidated: true
                },
                description: {
                    value: '',
                    displayName: 'Description',
                    valid: true,
                    validations: {
                        max: 1200,
                        min: 5,
                        required: true
                    }, 
                    errors: [],
                    wasValidated: true
                }
            }
        }

    }

    handleSubmit(e) {
        e.preventDefault();

        ResourceService.upload(this.state.fields.thumbnail.value)
            .then(r => {
                r.json().then(resourceDataDTO => {
                    const thumbnailFileName = resourceDataDTO.name;
                    EventService.create(
                        this.state.fields.title.value,
                        this.state.fields.date.value,
                        thumbnailFileName,
                        this.state.fields.startTime.value,
                        this.state.fields.endTime.value,
                        this.state.fields.volunteers.value,
                        this.state.fields.description.value,
                        AuthService.getCurrentUser().id
                    ). then(createResponse => {
                        if(createResponse.ok) {
                            this.props.navigate('/');
                        } else {
                            createResponse.text().then(e => {
                                this.setState({formError: JSON.parse(e).message});
                            });   
                        }
                    });

                });
            });

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

    handleFileSelection(e) {
        const files = e.target.files;
        const fields = {...this.state.fields}
        fields.thumbnail.value = files;
        fields.thumbnail.valid = true;
        fields.thumbnail.wasValidated = true;
        if(!!this.state.previewUrl) {
            URL.revokeObjectURL(this.state.previewUrl)
        }
        const previewUrl = URL.createObjectURL(files[0]);
        this.setState({fields, previewUrl});
    }

    handleVolunteerChange(change) {
        const fields = {...this.state.fields}
        let volCount = fields.volunteers.value + change;
        volCount = volCount < fields.volunteers.validations.min
        ? fields.volunteers.validations.min
        : volCount > fields.volunteers.validations.max
        ?  volCount = fields.volunteers.validations.max
        : volCount;
        fields.volunteers.value = volCount;
        fields.volunteers.valid = true;
        fields.volunteers.wasValidated = true;
        this.setState({fields});
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
                    <div className="col-xl d-flex align-self-stretch">
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
                                    <div className='col-lg-6'>
                                        <div className={`form-group`}>
                                            <label htmlFor="dateInput">Event Date</label>
                                            <div className='react-datepicker-wrapper'>
                                                <DatePicker
                                                    id='dateInput'
                                                    wrapperClassName="react-datepicker-wrapper"
                                                    minDate={Date.now()}
                                                    selected={this.state.fields.date.value}
                                                    onChange={(date) => {
                                                            const fields = {...this.state.fields};
                                                            fields.date.value = date;
                                                            fields.date.valid = true;
                                                            fields.date.wasValidated = true;
                                                            this.setState({fields})
                                                        }
                                                    }
                                                    inline
                                                />
                                            </div>
                                        </div>        
                                    </div>
                                    <div className='col-lg-6'>
                                         <div className={`form-group`}>
                                            <label htmlFor="formFileLg" className="form-label">Event Thumnail</label>
                                            <div className='file-input-field'>
                                                <div className='preview'>
                                                    <img className={!this.state.previewUrl ? 'd-none' : ''} src={this.state.previewUrl} alt="Event Thumnail" />
                                                    <i className={`bi bi-upload ${!!this.state.previewUrl ? 'd-none' : ''}`}></i>
                                                </div>
                                                <input id="formFileLg form-control" type="file" onChange={this.handleFileSelection} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div className={`form-group`}>
                                            <label htmlFor="startTimeInput">Start Time</label>
                                            <input  name="startTime" 
                                                    type="time"
                                                    step="3600"
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
                                    <div className='col-sm-6'>
                                        <div className={`form-group`}>
                                            <label htmlFor="endTimeInput">End Time</label>
                                            <input  name="endTime" 
                                                    type="time"
                                                    step="3600000"
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
                                                className={`form-control`}
                                                id="volunteersInput" 
                                                aria-describedby="volunteersHelp volunteersFeedBack" 
                                                value={this.state.fields.volunteers.value}
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
                    <div className="col-xl d-flex align-self-stretch">
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