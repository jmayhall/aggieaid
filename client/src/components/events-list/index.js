import React from 'react';
import './styles.css'
import ApiService from '../../service/api.service';
import APIPaths from '../../constants/apipath.constants';
import EventResultComponent from '../event-result';

export default class EventsListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            events: []
        }

    }

    async handleClick(e) {
        ApiService.get(APIPaths.EVENTS).then(r => {
            r.json().then(res => {
                this.setState({events: res});
            })
        });
    }

    render() {
        return  (
            <div className="EventsListComponent container">
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>List Events</button>
                {
                    this.state.events.map(event =><div className='my-2'>
                        <EventResultComponent
                            title={event.title}
                            username={event.owner}
                            shortDescription={event.shortDescription}
                            volunteers={event.volunteerCount}
                            thumbnailFileName={event.thumbnailFileName} 
                            offsetX={event.thumbnailXOffset} 
                            offsetY={event.thumbnailYOffset} 
                            offsetZoom={event.thumbnailZoomOffset}
                            date={event.date}
                            timeStart={event.startTime}
                            timeEnd={event.endTime}>
                        </EventResultComponent>
                    </div>)
                }
            </div>
        );
    }
}