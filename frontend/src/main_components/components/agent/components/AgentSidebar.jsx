import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaMapMarkedAlt, FaChevronDown } from 'react-icons/fa';
import User from '../Images/user.svg';
import { GiTombstone } from 'react-icons/gi';

const AgentSidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="agentsidebar">
            <div className="LogoContainer">
                <GiTombstone className='icon logoIcon'/>
                <h2 className='title'>PiH-BLIMAP</h2>
            </div>
            <div className="userContainer">
                <img src={User} alt='user' className='user'/>
                <div className="profileContents">
                    <p className='name'>Hello, Bossing!</p>
                    <p>agent@gmail.com</p>
                </div>
            </div>
            <div className="contentContainer">
                <Link to='/' className='navItem'>
                    <FaMapMarkedAlt className='icon'/>
                    <span>Map</span>
                </Link>

                <div className='navItem dropdown'>
                    <div onClick={toggleDropdown} className='dropdownToggle'>
                        <FaUsers className='icon'/>
                        <span>List of Client</span>
                        <FaChevronDown className={`icon dropdownIcon ${isDropdownOpen ? 'open' : ''}`} />
            
                    </div>
                    {isDropdownOpen && (
                        <ul className="dropdownMenu">
                            <li>
                                <Link to='/listofclient/approved' className='dropdownItem'>
                                Approved
                                </Link>
                            </li>
                            <li>
                                <Link to='/listofclient/declined' className='dropdownItem'>
                                Declined
                                </Link>
                            </li>
                        </ul>
                    )}
                    </div>
            </div>
        </div>
    );
}

export default AgentSidebar;