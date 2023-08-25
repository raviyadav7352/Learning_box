import React from 'react';
import './SidebarComponent.css';
import DynamicSVG from './DynamicSVG';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const SidebarComponent = () => {
    const { showSidebar, setShowSidebar } = useAppContext();
    const location = useLocation();
    const isActive = (pathname) => {
        return location.pathname === pathname;
    };

    return (
        <div className={`u-sidebar pL30 pR20 pY16 ${!showSidebar ? 'showSidebar' : " "}`}>
            <div className="menu-text-mobile dN sm-flex alignC justifySB">
                <h4 className='fs14 color-theme fw-500'>Menu</h4>
                <button className='close-btn' onClick={() => setShowSidebar(!showSidebar)}>
                    <DynamicSVG svgName={'smclose'} />
                </button>
            </div>
            <ul className="sidebar-menu pL0 list flex-col alignC">
                <li className={`u-sidebar-menu-item ${isActive('/dashboard') ? 'active' : ''}`}>
                    <NavLink
                        className='u-sidebar-item-link flex-col alignC'
                        to="/dashboard"
                    >
                        <DynamicSVG svgName='dashboard' />
                        <div>Dashboard</div>
                    </NavLink>
                </li>
                <li className={`u-sidebar-menu-item ${isActive('/assessment') ? 'active' : ''}`}>
                    <NavLink
                        className='u-sidebar-item-link flex-col alignC'
                        to="/assessment"
                    >
                        <DynamicSVG svgName='assessment' />
                        <div>Assessment</div>
                    </NavLink>
                </li>
                <li className={`u-sidebar-menu-item ${isActive('/my-library') ? 'active' : ''}`}>
                    <NavLink
                        className='u-sidebar-item-link flex-col alignC'
                        to="/my-library"
                    >
                        <DynamicSVG svgName='library' />
                        <div>My Library</div>
                    </NavLink>
                </li>
                <li className='u-sidebar-menu-item-diff'>
                    <div className='u-btn-box '>
                        <button className='u-btn u-btn-admin sm-dN'>Admin</button>
                    </div>
                </li>
                <li className={`u-sidebar-menu-item ${isActive('/round-status') ? 'active' : ''}`}>

                    <NavLink
                        className='u-sidebar-item-link flex-col alignC'
                        to="/round-status"
                    >
                        <DynamicSVG svgName='status' />
                        <div>Round Status</div>
                    </NavLink>
                    <div className='u-btn-box border0'>
                        <button className='u-btn u-btn-admin dN sm-block'>Admin</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SidebarComponent;
