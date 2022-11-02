import React from 'react';
import './styles.css'
import APIPaths from '../../constants/apipath.constants';

export default class EventDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.formatTime = this.formatTime.bind(this);
    }

    formatTime(rawTime) {
        let time = !!rawTime ? new Date().setHours(rawTime.split(":")[0],rawTime.split(":")[1]) : Date.now();
        return new Intl.DateTimeFormat('default', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit'
        }).format(time);
    }
    
    render() {
        return (
            <div className='EventDetailsComponent w-100 h-100 container d-flex flex-column'>

                <div className='row'>
                    <div className='col'>
                        <h1>{this.props.title || "Event Title"}</h1>
                        <p className='text-muted'>{this.props.shortDescription || "A shorter description of the event."}</p>
                    </div>
                    <div className='col'>
                        <picture className='d-inline-block'>
                            <img 
                                className="card-img-top" 
                                style={{marginTop: `${this.props.offsetY}%`, marginLeft: `${this.props.offsetX}%`, transform: `scale(${this.props.offsetZoom})`}} alt="The event" 
                                src={!!this.props.thumbnailFileName 
                                    ? `${APIPaths.API_BASE}/${APIPaths.PUBLIC}/${this.props.thumbnailFileName}`
                                    : !!this.props.preview 
                                    ? this.props.preview 
                                    : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_183f09dd88b%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_183f09dd88b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.19140625%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"} />
                        </picture> 
                        <small className='d-inline-block text-muted w-100 text-center'>Event Sponsor: {this.props.username}</small>
                    </div>
                </div>
                <div className='row'>
                    <p className='my-5'>
                        {this.props.description || "A much longer description of the event. This will have more details and can be up to 1200 characters long."}
                    </p>
                </div>
                <div className='row mt-auto'>
                    <div className='col-7 d-flex align-items-end'>
                        <small className="text-muted"><i className="bi bi-people-fill"></i> {this.props.currentVolunteers || 0} / {this.props.volunteers || 5}</small>
                        <small className="text-muted"><i className="bi bi-clock ms-3"></i> 
                            {new Date(this.props.date).toLocaleDateString('default', { year: '2-digit', month: 'numeric', day: 'numeric' }) || "11.6.83"} @ 
                            {this.formatTime(this.props.timeStart) || "12pm"}-
                            {this.formatTime(this.props.timeEnd) || "1pm"}</small>
                    </div>
                    <div className='col-5 d-flex justify-content-end'>
                        <button className="btn btn-primary action ms-2">Volunteer</button> 
                    </div>
                </div>
            </div>
        );
    }
}