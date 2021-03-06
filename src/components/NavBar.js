import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from "prop-types";
import $ from 'jquery';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'

class Navbar extends React.Component {
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
        const { location, user } = this.props;
        const classNotActive = "nav-item mr-2";
        const classActive = "nav-item active mr-2";
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h4 style={{ "marginLeft": "10px" }}>{this.convertToDisplayName(location)}</h4>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">
                            <li>
                                <button className="btn btn-default" onClick={e => this.deletePhase2(e)}>Xóa đkhp lần 2 </button>
                            </li>
                            <li>
                                <button className="btn btn-default" onClick={e => this.movePhase2(e)}>Lọc đkhp lần 2 </button>
                            </li>
                            <li className={location.pathname === "/dashboard/roadmap" ? classActive : classNotActive}>
                                <Link to="/dashboard/roadmap" className="nav-link">Roadmap</Link>
                            </li>
                            <li className={location.pathname === "/dashboard/subjects/register/phase2" ? classActive : classNotActive}>
                                <Link to="/dashboard/subjects/register/phase2" className="nav-link">Đăng ký học phần lần 2</Link>
                            </li>
                            <li className={location.pathname === "/dashboard/subjects/register/phase1" ? classActive : classNotActive}>
                                <Link to="/dashboard/subjects/register/phase1" className="nav-link">Đăng ký học phần lần 1</Link>
                            </li>
                        </ul>
                        <img
                            style={{ width: "35px", height: "35px", zIndex: 1050 }}
                            alt="avatar"
                            src="http://lanhdaotaiba.com/img/default_avatar.png"
                            data-html="true"
                            data-toggle="popover"
                            data-trigger="hover"
                            onMouseEnter={this.mouseEnter}
                            onMouseLeave={this.mouseLeave}

                            title={"<b>Profile</b> - " + user.ten}
                            data-content={"<div>  <div><b> Mã số sinh viên </b> - " + (user.id + 1612000) + "</div> <div><b>Lớp </b> - " + user.lop + "</div> <div><b> Khoa </b> - " + user.tenKhoa + "</div>  <div><b> Tích lũy </b> - " + user.soTinChiTichLuy + " tín chỉ</div> </div>"}
                        ></img>
                        <button className="btn btn-default" onClick={e => { this.signOut(e) }}>Đăng xuất</button>
                    </div>
                </div>
            </nav>)
    }
    convertToDisplayName(location) {
        switch (location.pathname) {
            case "/dashboard/roadmap":
                return "Road map"
            case "/dashboard/subjects/register/phase2":
                return "Đăng ký học phần lần 2"
            case "/dashboard/subjects/register/phase1":
                return "Đăng ký học phần lần 1"
            default:
                return ""

        }
    }
    mouseEnter() {
        $("body").append("<div id='modal-backdrop' class='modal-backdrop fade show'></div>");
    }
    mouseLeave() {
        $("#modal-backdrop").remove();
    }
    signOut(e) {
        e.preventDefault();
        localStorage.setItem("user", "{}");
        window.location.href = "/login";
    }
    movePhase2(e) {
        window.axios.post(window.API + "/move/phase2").then(result => {
            if (result.data.success) {
                iziToast.success({
                    message: "Chuyển qua đăng ký đợt 2 thành công"
                })
            }
            else {
                iziToast.error({
                    message: "Phải xóa hết sinh viên ở lần đăng ký đợt 2 trước khi chuyển qua đăng ký đợt 2"
                })
            }
        })
    }
    deletePhase2(e) {
        window.axios.post(window.API + "/delete/phase2").then(result => {
            if (result.data.success) {
                iziToast.success({
                    message: "Xóa sinh viên đợt 2 thành công"
                })
            }
        })
    }
}

export default withRouter(Navbar);