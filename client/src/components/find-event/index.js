import React from 'react';
import './styles.css'
import EventsListComponent from '../events-list';


export default class FindEventComponent extends React.Component {
    render() {
        return  (
            <div className="FindEventComponent">
                <h1>Find Event</h1>
                <EventsListComponent></EventsListComponent>
            </div>
        );
    }
}