import React from 'react';
import './styles.css'
import UsersComponent from '../users';

export default class CreateEventComponent extends React.Component {
    render() {
        return  (
            <div className="CreateEventComponent">
                <h1>Create Event</h1>
                <UsersComponent></UsersComponent>
            </div>
        );
    }
}