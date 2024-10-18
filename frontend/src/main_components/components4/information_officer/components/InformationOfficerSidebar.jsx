import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckDouble, FaMapMarkedAlt } from 'react-icons/fa';
import User from '../Images/user.svg';
import { GiTombstone } from 'react-icons/gi';
import { MdPersonPin } from 'react-icons/md';

const InformationOfficerSidebar = () => {
  return (
    <div className="informationofficersidebar">
        <div className="LogoContainer">
            <GiTombstone className='icon logoIcon'/>
            <h2 className='title'>PiH-BLIMAP</h2>
        </div>
        <div className="userContainer">
            <img src={User} alt='user' className='user'/>
            <div className="profileContents">
                <p className='name'>Hello, Bossing!</p>
                <p>informationofficer@gmail.com</p>
            </div>
        </div>
        <div className="contentContainer">
            <Link to='/' className='navItem'>
                <FaMapMarkedAlt className='icon'/>
                <span>Map</span>
            </Link>

            <Link to='/listofagents' className='navItem'>
                <MdPersonPin className='icon'/>
                <span>List of Agent</span>
            </Link>

            <Link to='/listofclients/approved' className='navItem'>
                <FaCheckDouble className='icon'/>
                <span>List of Client Approved</span>
            </Link>

    
        </div>
    </div>
);
}

export default InformationOfficerSidebar;