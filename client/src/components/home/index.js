import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import { ReactComponent as AggieAidLogo } from '../shared/images/aggie-aid-logo.svg';

export default class HomeComponent extends React.Component {
    render() {
        return  (
            <div className="HomeComponent container">
                <div className="hero px-4 py-5 my-5 text-center">
                    <h1 className="fw-bold fs-3">A Platform for Connecting Aggie Volunteers to Community Needs</h1>
                    <div className="col-lg-6 mx-auto">
                        <Link to={"/create-event"}>
                            <button type="button" className="btn btn-primary">Create An Event</button>
                        </Link>
                        <AggieAidLogo className='logo'></AggieAidLogo>
                        <Link to={"/find-event"}>
                            <button type="button" className="btn btn-primary">Find an Event</button>
                        </Link>
                    </div>
                    <h2 className='fs-1'>AGGIE AID</h2>
                    <h3 className="fw-lighter fs-4">HOW MANY AGGIES</h3>
                </div>
            </div>
        );
    }
}