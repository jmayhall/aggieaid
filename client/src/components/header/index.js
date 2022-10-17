import React from 'react';
import './styles.css'
import {Link } from "react-router-dom";
import AggieAidLogo from '../shared/images/logo.svg';

export default class HeaderComponent extends React.Component {
    render() {
        return  (
            <nav className="HeaderComponent navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand">
                        <img className="logo" src={AggieAidLogo} alt="AggieAid Logo" />
                        AGGIE AID
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/create-event"}>
                                    Create Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/find-event"}>
                                    Find Events
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about-us"}>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="nav-item">
                                <form className="d-flex">
                                    <i className="bi bi-search"></i>
                                    <input className="form-control me-2" type="search" placeholder="Find Events" aria-label="Search" />
                                </form>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-secondary btn-small navbar-btn" to={"/login"}>
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}