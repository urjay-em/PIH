import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaBuilding, FaDatabase, FaUsers } from 'react-icons/fa';
import { MdPersonPin } from 'react-icons/md';
import { AiOutlineDashboard, AiOutlineFileText } from 'react-icons/ai';
import User from '../Images/user.svg';
import { GiTombstone } from 'react-icons/gi';





const AdminSidebar = () => {
  return (
    <div className="adminsidebar">
        <div className="LogoContainer">
            <GiTombstone className='icon logoIcon'/>
            <h2 className='title'>PiH-BLIMAP</h2>
        </div>
        <div className="userContainer">
            <img src={User} alt='user' className='user'/>
            <div className="profileContents">
                <p className='name'>Hello, Eyesbebe! </p>
                <p>admin@gmail.com</p>
            </div>
        </div>
        <div className="contentContainer">
            <Link to='/' className="navItem">
                <AiOutlineDashboard className='icon'/>
                <span>Dashboard</span>
            </Link>
            <Link to='/manageadmin' className="navItem">
                <FaUserShield className='icon'/>
                <span>Manage Admin Account</span>
            </Link>
            <Link to='/manageagent' className="navItem">
                <MdPersonPin className='icon'/>
                <span>Manage Agent Account</span>
            </Link>
            <Link to='/managebranches' className="navItem">
                <FaBuilding className='icon'/>
                <span>Manage Branches</span>
            </Link>
            <Link to='/manageemployee' className="navItem">
                <FaUsers className='icon'/>
                <span>Manage Employee Account</span>
            </Link>
            <Link to='/backrestore' className="navItem">
                <FaDatabase className='icon'/>
                <span>Backup & Restore</span>
            </Link>
            <Link to='/reports' className="navItem">
                <AiOutlineFileText className='icon'/>
                <span>Reports</span>
            </Link>
        </div>  
    </div>
);
}

export default AdminSidebar;