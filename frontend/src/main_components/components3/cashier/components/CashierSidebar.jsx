import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaCheckDouble, FaReceipt } from 'react-icons/fa';
import User from '../Images/user.svg';
import { GiTombstone } from 'react-icons/gi';


const CashierSidebar = () => {
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
                <FaMoneyBillWave className='icon'/>
                <span>List of Application for Payment</span>
            </Link>

            <Link to='/listofclients/approved' className='navItem'>
                <FaCheckDouble className='icon'/>
                <span>List of Client Approved</span>
            </Link>

            <Link to='/commisionrecord' className='navItem'>
                <FaReceipt className='icon'/>
                <span>Commission Record</span>
            </Link>

    
        </div>
    </div>
);
}

export default CashierSidebar;