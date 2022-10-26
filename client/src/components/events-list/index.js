import React from 'react';
import './styles.css'
import ApiService from '../../service/api.service';
import APIPaths from '../../constants/apipath.constants';

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
                this.setState({events: res._embedded.events});
            })
        });
    }

    render() {
        return  (
            <div className="UsersComponent container">
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>List Events</button>
                <ul className="list-group my-5">
                    {
                        this.state.events.map(event => <li key={event.id} className="list-group-item">
                            {event.title}
                            <img alt="The event" src={`${APIPaths.API_BASE}/${APIPaths.PUBLIC}/${event.thumbnailFileName}`} />
                        </li>)
                    }
                </ul>
                

            </div>
        );
    }
}