import React from 'react';
import './Team.css';
import Nav2 from '../Nav/Nav2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Lead Instructor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      color: '#ffffff'
    },
    {
      id: 2,
      name: 'Michael Reynolds',
      position: 'Senior Instructor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      color: '#8BC34A'
    },
    {
      id: 3,
      name: 'David Martinez',
      position: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      color: '#2196F3'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      position: 'Customer Relations',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      color: '#E91E63'
    },
    {
      id: 5,
      name: 'Jessica Chen',
      position: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      color: '#FF9800'
    }
  ];

  return (
    <div className="team-page">
      {/* Navigation */}
      <Nav2 />

      {/* Team Header */}
      <header className="team-header">
        <div className="team-label">Team</div>
        <h1>BUSINESS TEAM PRESENTATION</h1>
        <p>This slide is perfect for product descriptions</p>
      </header>

      {/* Team Members Section */}
      <section className="team-members-container">
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="member-image-container">
                <img src={member.image} alt={member.name} className="member-image" />
              </div>
              <div className="member-details">
                <h3 className="member-position" style={{color: member.color}}>{member.position}</h3>
                <h2 className="member-name">{member.name}</h2>
                <p className="member-bio">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <div className="member-social">
                  <a href="#" className="social-link"><FontAwesomeIcon icon={faFacebookF} /></a>
                  <a href="#" className="social-link"><FontAwesomeIcon icon={faTwitter} /></a>
                  <a href="#" className="social-link"><FontAwesomeIcon icon={faLinkedinIn} /></a>
                  <a href="#" className="social-link"><FontAwesomeIcon icon={faInstagram} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;