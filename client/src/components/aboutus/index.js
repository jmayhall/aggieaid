import React from 'react';
import './styles.css'
import UsersComponent from '../users';

export default class AboutUsComponent extends React.Component {
    render() {
        return  (
            <div className="AboutUsComponent">
                <h1>About Us</h1>
                <UsersComponent></UsersComponent>
            </div>
        );
    }
}