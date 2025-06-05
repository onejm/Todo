import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/theme.css';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="nav-title">TODO APP</div>
            <ul className="nav-links">
                <li className={location.pathname === '/todo' ? 'active' : ''}>
                    <Link to="/todo">달력 보기</Link>
                </li>
                <li className={location.pathname === '/todo/list' ? 'active' : ''}>
                    <Link to="/todo/list">전체 목록</Link>
                </li>
                <li className={location.pathname === '/todo/create' ? 'active' : ''}>
                    <Link to="/todo/create">등록</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
