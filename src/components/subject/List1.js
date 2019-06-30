import React from 'react';

import { Button } from 'react-bootstrap';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css'

class SubjectList1 extends React.Component {
    constructor(props) {
        super(props);
        this.dataTableInstance = null;
        this.start = 0;
        this.state = {
            subjects: [],
            registeredSubjects: [],
            dataTableInstance: null
        };
    }
    componentDidMount() {
        this.prepareData();
    }
    componentDidUpdate() {
        this.initTable();
    }
    initTable() {
        if (this.dataTableInstance != null) {
            this.dataTableInstance.destroy();
        }
        this.dataTableInstance = window.$("#table").DataTable({
            "lengthMenu": [5, 10],
            "iDisplayStart": this.start
        })
        this.dataTableInstance.on('page.dt', () => {
            var info = this.dataTableInstance.page.info();
            this.start = info.start;
        })
    }
    componentWillUnmount() {
        this.dataTableInstance != null && this.dataTableInstance.destroy();
    }
    render() {
        let subjectsFilter = this.state.subjects.map(subject => (
            { ...subject, isRegistered: this.state.registeredSubjects.some(registeredSubject => subject.id === registeredSubject.idMonHoc) }
        ))
        return (
            <table id="table" className="table table-hover table-bordered" >
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>Tên học phần</th>
                        <th style={{ width: "25%" }}>Tên giáo viên</th>
                        <th style={{ width: "15%" }}>Tín chỉ</th>
                        <th style={{ width: "15%" }}>Đăng ký</th>
                        <th style={{ width: "5%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjectsFilter.map(subject => (
                            <tr key={subject.id} className={subject.isRegistered ? "table-success" : ""}>
                                <td>{subject.tenMH}</td>
                                <td>{subject.tenGV}</td>
                                <td>{subject.soTinChi}</td>
                                <td>{subject.soLuongSVDaDangKyDot1}</td>
                                {
                                    !subject.isRegistered ?
                                        <td className="text-center"><Button variant="success" onClick={(e) => { this.registerSubject(subject, e) }}>Đăng ký</Button></td> :
                                        <td className="text-center"><Button variant="danger" onClick={(e) => { this.unregisterSubject(subject, e) }}>Hủy</Button></td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    prepareData() {
        Promise.all([this.getSubjects(), this.getRegisteredSubjects()]).then(result => {
            this.setState({
                registeredSubjects: result[1].data.data,
                subjects: result[0].data.data
            });
        })
    }
    registerSubject(subject) {
        window.axios.post(window.API + "/subject/" + subject.id + "/register/phase1").then(result => {
            if (result.data.success) {
                iziToast.success({
                    message: "Đăng ký thành công"
                })
                this.prepareData();
            }
            else {
                iziToast.error({
                    message: result.data.message
                })
            }
        })

    }
    unregisterSubject(subject) {
        window.axios.post(window.API + "/subject/" + subject.id + "/register/cancel/phase1").then(result => {
            if (result.data.success) {
                iziToast.success({
                    message: "Hủy đăng ký thành công"
                })
                this.prepareData();
            }
            else {
                iziToast.error({
                    message: result.data.message
                })
            }
        })
    }
    getSubjects() {
        return window.axios.get(window.API + "/subjects/available/phase1")
    }
    getRegisteredSubjects() {
        return window.axios.get(window.API + "/subjects/registered/phase1")
    }
}


export default SubjectList1;