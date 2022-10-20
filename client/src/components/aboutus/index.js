import React from 'react';
import './styles.css';
import TeamMemberComponent from './teamMember.component';
import timPort from '../shared/images/TimPortrait.jpg';
import jeremyPort from '../shared/images/JeremyPortrait.jpg';
import jeffPort from '../shared/images/JeffPortrait.jpg';
import ryanPort from '../shared/images/RyanPortrait.jpg';
import jacobPort from '../shared/images/Jacob.jpg';


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
                    <TeamMemberComponent 
                        fullName='Tim Chockerham'
                        email='tcockerham@tamu.edu'
                        portrait={timPort}
                        bio='Tim Cockerham is a proud triple-Aggie. He graduated from Texas A&M with a BBA in Management of Information Systems in 2000, has worked at Texas A&M for the last 18 years as a database administrator, and is midway through his master’s degree there as well. Before he was a DBA though, he made money as a waiter, a bartender, a radio DJ, a burger flipper, a butcher, a parking lot valet, a software developer, a teacher, a test driver, a lawn mower, and a paperboy. He’s always willing to do any job that helps out his family, friends, or colleagues.'>
                    </TeamMemberComponent>
                    <TeamMemberComponent 
                        fullName='Jeremy Huff'
                        email='huff@tamu.edu'
                        portrait={jeremyPort}
                        bio="Jeremy Huff is a Software Application Developer working for Texas A&M Technology Services - Libraries. He has been developing software for the Libraries at Texas A&M for the past ten years. Before joining A&M as a software developer Jeremy had a diverse set of educational and vocational experiences. His undergraduate degree was a dual bachelor's in Philosophy and Criminal Justice. After graduation, Jeremy taught Classics, Logic, and Ballroom Dancing for 4 years at the secondary level, as well as pastoring a small congregation. Jeremy is currently pursuing a Master of Science in Management Information Systems and is eagerly anticipating whatever future developments may be in store in his career.">
                    </TeamMemberComponent>
                    <TeamMemberComponent 
                        fullName='Jeff Mayhall'
                        email='jmayhall@tamu.edu'
                        portrait={jeffPort}
                        bio='Jeff Mayhall was born in Alabama and unconscionably raised as an Auburn fan while growing up in Texas. He eventually earned his Bachelor of Computer Science degree from Auburn University before pursuing his MS-MIS from Texas A&M. He has worked in IT for nearly 20 years and has always felt drawn toward “helping people”. Being a very introverted person with a drive to help people, he enjoys finding ways to use technology to help others who help people as his way to contribute to the community. He has a lot of pride in helping 100s of doctors and police officers with their technological needs to assist them with providing invaluable services to society and is always looking for more ways to help others do the same.'>
                    </TeamMemberComponent>
                    <TeamMemberComponent 
                        fullName='Ryan Mobley'
                        email='ryan.mobley@tamu.edu'
                        portrait={ryanPort}
                        bio='Ryan Mobley is the loudest and proudest member of the Fightin’ Texas Aggie Class of 2019 (Whoop)! Ryan was born in 1996 and grew up in Lake Jackson, Texas. After graduating from Texas A&M in 2019 with a BBA in Management Information Systems, Ryan chose to pursue a career in technology consulting with the public consulting firm Grant Thornton in Dallas, TX. At the end of the day, Ryan’s main goal is to let the human element of each project shine through the code and architecture so that everyday people can benefit from advancements in technology.'>
                    </TeamMemberComponent>
                    <TeamMemberComponent 
                        fullName='Jacob Palisch'
                        email='jpalisch@tamu.edu'
                        portrait={jacobPort}
                        bio='Although a Texas native, Jacob Palisch traveled out to California for his undergraduate degree and collegiate baseball, where he graduated with a B.S. in Computer Science from Stanford University in 2021. After graduating, he returned to Texas, where he began a graduate program in the Mays Business School at Texas A&M and played his final year of baseball. He is continuing to pursue baseball, signing a contract with the Chicago White Sox. Jacob’s ultimate motivation is to use the work ethic and teamwork skills he has developed through years of athletics to help those around him succeed and thrive in their own impactful way.'>
                    </TeamMemberComponent>
                </div>
            </div>
        );
    }
}