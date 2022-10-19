import React from 'react';
import './styles.css'
import UsersComponent from '../users';


export default class FindEventComponent extends React.Component {
    render() {
        return  (
            <div className="FindEventComponent">
                <h1>Find Event</h1>
                <UsersComponent></UsersComponent>
            </div>
        );
    }
}