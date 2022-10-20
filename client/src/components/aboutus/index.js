import React from 'react';
import './styles.css';
import TeamMemberComponent from './teamMember.component';
export default class AboutUsComponent extends React.Component {
    render() {
        return  (
            <div className="AboutUsComponent">
                <div className="container">
                    <div className="mission p-4 p-md-5 my-5 mb-4 rounded">
                        <div className="col-md-6 px-0">
                            <h1 className="display-4 fst-italic">Our Mission...</h1>
                            <p className="lead my-3">is to empower our fellow Aggie students to have the ability to reach within themselves to find their Aggie Spirit and engage in selfless service with AND for the members of the Bryan/College Station community</p>
                            <p className="lead mb-0"><a href="#team" className="text-white fw-bold">Meet the team:</a></p>
                        </div>
                    </div>
                </div>
                <div id="team" className='my-5 mb-5'>
                    <TeamMemberComponent></TeamMemberComponent>
                    <TeamMemberComponent></TeamMemberComponent>
                    <TeamMemberComponent></TeamMemberComponent>
                    <TeamMemberComponent></TeamMemberComponent>
                    <TeamMemberComponent></TeamMemberComponent>
                </div>
            </div>
        );
    }
}