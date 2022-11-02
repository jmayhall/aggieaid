import React from 'react';
import './styles.css'
import ResourceService from '../../service/resource.service';
import { withNavigation } from '../../helpers/hocs';
import ValidationMessages from '../../constants/validationMessages.constants';
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";
import EventService from '../../service/event.service';
import AuthService from '../../service/auth.service';
import EventThumbnail from '../event-thumbnail';
import EventResult from '../event-result';

class CreateEventComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputBlur = this.handleUserInputBlur.bind(this);
        this.handleFileSelection = this.handleFileSelection.bind(this);
        this.handleVolunteerChange = this.handleVolunteerChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleOffsetChange = this.handleOffsetChange.bind(this);
        this.validationTimer = null;

        this.state = {
            activeTabName: "basic",
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
                    value: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183f09dd88b%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183f09dd88b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.19140625%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
                    displayName: 'Event Thumbnail',
                    valid: undefined,
                    validations: {
                        required: false,
                        image: true,
                    },
                    errors: [],
                    wasValidated: false
                },
                thumbnailOffsetX: {
                    value: 0,
                    displayName: 'Event Thumbnail Offset X',
                    valid: true,
                    validations: {
                        required: false
                    },
                    errors: [],
                    wasValidated: true
                },
                thumbnailOffsetY: {
                    value: 0,
                    displayName: 'Event Thumbnail Offset Y',
                    valid: true,
                    validations: {
                        required: false
                    },
                    errors: [],
                    wasValidated: true
                },
                thumbnailOffsetZoom: {
                    value: 1,
                    displayName: 'Event Thumbnail Offset Zoom',
                    valid: true,
                    validations: {
                        required: false
                    },
                    errors: [],
                    wasValidated: true
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
                    displayName: 'How Many',
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
                shortDescription: {
                    value: '',
                    displayName: 'Short Description',
                    valid: false,
                    validations: {
                        max: 125,
                        min: 25,
                        required: true
                    }, 
                    errors: [],
                    wasValidated: false
                },
                description: {
                    value: '',
                    displayName: 'Full Description',
                    valid: false,
                    validations: {
                        max: 1200,
                        min: 5,
                        required: true
                    }, 
                    errors: [],
                    wasValidated: false
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
                        this.state.fields.thumbnailOffsetX.value,
                        this.state.fields.thumbnailOffsetY.value,
                        this.state.fields.thumbnailOffsetZoom.value,
                        this.state.fields.startTime.value,
                        this.state.fields.endTime.value,
                        this.state.fields.volunteers.value,
                        this.state.fields.description.value,
                        this.state.fields.shortDescription.value,
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

    handleTabChange(activeTabName) {
        this.setState({activeTabName})
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
        fields.thumbnailOffsetX.value = 0;
        fields.thumbnailOffsetY.value = 0;
        fields.thumbnailOffsetZoom.value = 1;

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

    handleOffsetChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const fields = {...this.state.fields};

        console.log(name, value);

        if(name === "x") {
            fields.thumbnailOffsetX.value = value
        }
        if(name === "y") {
            fields.thumbnailOffsetY.value = value
        }
        if(name === "zoom") {
            fields.thumbnailOffsetZoom.value = value
        }


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
                            <form className='d-flex flex-column' onSubmit={this.handleSubmit} noValidate>

                                <div className={`alert alert-danger ${!this.state.formError ? 'd-none' : ''}`} role="alert">
                                    {this.state.formError}
                                </div>

                                <ul className="nav nav-pills nav-fill mt-2 mb-5">
                                    <li className="nav-item" onClick={() => this.handleTabChange("basic")}>
                                        <span className={`nav-link ${this.state.activeTabName === 'basic' ? 'active' : ''} position-relative`} id="basic-tab" aria-current="page" href="#">
                                            <span className="position-absolute top-50 translate-middle badge bg-secondary">1</span> 
                                            Basic
                                        </span>
                                    </li>
                                    <li className="nav-item" onClick={() => this.handleTabChange("general")}>
                                        <span className={`nav-link ${this.state.activeTabName === 'general' ? 'active' : ''} position-relative`} id="general-tab">
                                            <span className="position-absolute top-50 translate-middle badge bg-secondary">2</span> 
                                            General
                                        </span>
                                    </li>
                                    <li className="nav-item" onClick={() => this.handleTabChange("detailed")}>
                                        <span className={`nav-link ${this.state.activeTabName === 'detailed' ? 'active' : ''} position-relative`} id="detailed-tab">
                                            <span className="position-absolute top-50 translate-middle badge bg-secondary">3</span> 
                                            Detailed
                                        </span>
                                    </li>
                                </ul>
                                <div className="tab-content" id="create-event-basic-tab-content">
                                    <div className={`tab-pane fade ${this.state.activeTabName === 'basic' ? 'active show' : ''}`} id="create-event-basic" role="tabpanel" aria-labelledby="basic-tab">

                                        <div className={`form-group`}>
                                            <label htmlFor="titleInput">{this.state.fields.title.displayName}</label>
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

                                        <div className={`form-group`}>
                                            <label htmlFor="formFileLg" className="form-label">{this.state.fields.thumbnail.displayName}</label>
                                            <div className='file-input-field'>
                                                <div className='preview'>
                                                    <img className={!this.state.previewUrl ? 'd-none' : ''} src={this.state.previewUrl} alt="Event Thumnail" />
                                                    <i className={`bi bi-upload ${!!this.state.previewUrl ? 'd-none' : ''}`}></i>
                                                </div>
                                                <input id="formFileLg form-control" type="file" onChange={this.handleFileSelection} />
                                            </div>
                                        </div>

                                        <label htmlFor="offsetX" className="form-label">{this.state.fields.thumbnailOffsetX.displayName}</label>
                                        <input name="x" type="range" className="form-range" min="-50" max="50" step="1" id="offsetX" onChange={(e) => this.handleOffsetChange(e)} value={this.state.fields.thumbnailOffsetX.value}></input>

                                        <label htmlFor="offsetY" className="form-label">{this.state.fields.thumbnailOffsetY.displayName}</label>
                                        <input name="y" type="range" className="form-range" min="-50" max="50" step="1" id="offsetY" onChange={(e) => this.handleOffsetChange(e)} value={this.state.fields.thumbnailOffsetY.value}></input>

                                        <label htmlFor="offsetZoom" className="form-label">{this.state.fields.thumbnailOffsetZoom.displayName}</label>
                                        <input name="zoom" type="range" className="form-range" min="0.5" max="1.5" step="0.01" id="offsetZoom" onChange={(e) => this.handleOffsetChange(e)} value={this.state.fields.thumbnailOffsetZoom.value}></input>


                                    </div>

                                    <div className={`tab-pane fade ${this.state.activeTabName === 'general' ? 'active show' : ''}`} id="create-event-general" role="tabpanel" aria-labelledby="general-tab">

                                        <div className={`form-group`}>
                                            <label htmlFor="shortDescriptionInput">{this.state.fields.shortDescription.displayName}</label>
                                            <textarea  name="shortDescription" 
                                                    type="text" 
                                                    className={`form-control ${this.state.fields.shortDescription.wasValidated ? this.state.fields.shortDescription.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                                    id="shortDescriptionInput" 
                                                    aria-describedby="shortDescriptionHelp shortDescriptionFeedBack" 
                                                    rows="2"
                                                    placeholder="Enter a Short Description" 
                                                    value={this.state.fields.shortDescription.value} 
                                                    onChange={(event) => this.handleUserInput(event)}
                                                    onBlur={(event) => this.handleUserInputBlur(event)}
                                                    required
                                            ></textarea>
                                            <small id="shortDescriptionHelp" className={`form-text text-muted ${this.state.fields.shortDescription.valid || !this.state.fields.shortDescription.wasValidated ? '' : 'd-none'}`}>Please input the Event's Short Description</small>
                                            <div id="shortDescriptionFeedBack" className="invalid-feedback">
                                                {
                                                    this.state.fields.shortDescription.errors.map(m => <li key={m}>{m}</li>)
                                                }
                                            </div>
                                        </div>

                                        <div className={`form-group`}>
                                            <label htmlFor="dateInput">{this.state.fields.date.displayName}</label>
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

                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <div className={`form-group`}>
                                                    <label htmlFor="startTimeInput">{this.state.fields.startTime.displayName}</label>
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
                                                    <label htmlFor="endTimeInput">{this.state.fields.endTime.displayName}</label>
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
                                            <div className={`form-group m-auto volunteers-form-group`}>
                                                <label htmlFor="volunteersInput">{this.state.fields.volunteers.displayName}</label>
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
                                        </div>
                                    </div>

                                    <div className={`tab-pane fade ${this.state.activeTabName === 'detailed' ? 'active show' : ''}`} id="create-event-detailed" role="tabpanel" aria-labelledby="detailed-tab">
                                        
                                        <div className={`form-group`}>
                                            <label htmlFor="descriptionInput">{this.state.fields.description.displayName}</label>
                                            <textarea  name="description" 
                                                    type="text" 
                                                    className={`form-control ${this.state.fields.description.wasValidated ? this.state.fields.description.valid ? 'is-valid' : 'is-invalid' : ''}`}
                                                    id="descriptionInput" 
                                                    aria-describedby="descriptionHelp descriptionFeedBack" 
                                                    rows="10"
                                                    placeholder="Enter Description" 
                                                    value={this.state.fields.description.value} 
                                                    onChange={(event) => this.handleUserInput(event)}
                                                    onBlur={(event) => this.handleUserInputBlur(event)}
                                                    required
                                            ></textarea>
                                            <small id="descriptionHelp" className={`form-text text-muted ${this.state.fields.description.valid || !this.state.fields.description.wasValidated ? '' : 'd-none'}`}>Please input the Event's Description</small>
                                            <div id="descriptionFeedBack" className="invalid-feedback">
                                                {
                                                    this.state.fields.description.errors.map(m => <li key={m}>{m}</li>)
                                                }
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>                                
                                <button type="submit" className="btn btn-primary action mt-auto" disabled={!this.state.isFormValid}>Create Event</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-xl d-flex align-self-stretch">
                        <div className="pane p-3 border bg-white align-self-stretch flex-fill">
                            <h2 className='text-center'>Preview</h2>
                            <div className="tab-content d-flex justify-content-center align-items-center align-self-stretch flex-fill h-75" id="myTabContent">
                                <div className={`tab-pane fade ${this.state.activeTabName === 'basic' ? 'active show' : ''}`} id="create-event-basic" role="tabpanel" aria-labelledby="basic-tab">
                                    <EventThumbnail 
                                        title={this.state.fields.title.value} 
                                        preview={this.state.previewUrl} 
                                        offsetX={this.state.fields.thumbnailOffsetX.value} 
                                        offsetY={this.state.fields.thumbnailOffsetY.value} 
                                        offsetZoom={this.state.fields.thumbnailOffsetZoom.value}>
                                    </EventThumbnail>
                                </div>
                                <div className={`tab-pane fade ${this.state.activeTabName === 'general' ? 'active show' : ''}`} id="create-event-basic" role="tabpanel" aria-labelledby="basic-tab">
                                    <EventResult 
                                        title={this.state.fields.title.value}
                                        username={AuthService.getCurrentUser().username}
                                        shortDescription={this.state.fields.shortDescription.value}
                                        volunteers={this.state.fields.volunteers.value}
                                        preview={this.state.previewUrl} 
                                        offsetX={this.state.fields.thumbnailOffsetX.value} 
                                        offsetY={this.state.fields.thumbnailOffsetY.value} 
                                        offsetZoom={this.state.fields.thumbnailOffsetZoom.value}
                                        date={this.state.fields.date.value}
                                        timeStart={this.state.fields.startTime.value.split(":")[0]}
                                        timeEnd={this.state.fields.endTime.value.split(":")[0]}>
                                    </EventResult>
                                </div>
                                <div className={`tab-pane fade ${this.state.activeTabName === 'detailed' ? 'active show' : ''}`} id="create-event-basic" role="tabpanel" aria-labelledby="basic-tab">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(CreateEventComponent);