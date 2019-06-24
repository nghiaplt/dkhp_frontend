import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from "prop-types";


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {

    }
    static propTypes = {
        location: PropTypes.object.isRequired
    }
    render() {
        const { location } = this.props;
        const classNotActive = "nav-item";
        const classActive = "nav-item active";
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button type="button" id="sidebarCollapse" className="btn btn-info">
                        <i className="fas fa-align-left" style={{ "margin-right": "10px" }}></i>
                        <span>{this.convertToDisplayName(location)}</span>
                    </button>
                    <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-align-justify"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li className={location.pathname === "/home" ? classActive : classNotActive}>
                                <Link to="/home" className="nav-link">Trang chủ</Link>
                            </li>
                            <li className={location.pathname === "/subjects" ? classActive : classNotActive}>
                                <Link to="/subjects" className="nav-link">Học phần</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>)
    }
    convertToDisplayName(location) {
        switch (location.pathname) {
            case "/subjects":
            case "/subject/details":
                return "Học phần"
            case "/home":
                return "Trang chủ"
            default:
                return ""

        }
    }
}

export default withRouter(SideBar);