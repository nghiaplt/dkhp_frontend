import React from 'react';

import { Link } from 'react-router-dom';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return (
            <nav id="sidebar">
                <div id="dismiss">
                    <i className="fas fa-arrow-left"></i>
                </div>

                <div className="sidebar-header">
                    <h4>Học phần</h4>
                </div>

                <ul className="list-unstyled components">
                    <li className="active">
                        <Link to="/subjects/learnt" aria-expanded="false">Học phần đã học</Link>
                    </li>
                    <li>
                        <Link to="/subjects/">Đăng ký học phần</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default SideBar;