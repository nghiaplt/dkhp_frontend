import React from 'react';

import { Table, Button } from 'react-bootstrap';

class SubjectList1 extends React.Component {
    constructor(props) {
        super(props);
        this.dataTableInstance = null;
        this.state = {
            subjects: [],
            registeredSubjects: [],
            dataTableInstance: null
        };
    }
    componentDidMount() {
        // Promise.all(axios.all)
        this.getSubjects();
        this.getRegisteredSubjects();

    }
    componentDidUpdate() {
        this.initTable();
    }
    initTable() {
        if (this.dataTableInstance != null) {
            this.dataTableInstance.destroy();
        }
        this.dataTableInstance = window.$("#table").DataTable({
            "lengthMenu": [5, 10]
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
                        <th style={{ width: "30%" }}>Tên học phần</th>
                        <th style={{ width: "20%" }}>Tên giáo viên</th>
                        <th style={{ width: "5%" }}>Tín chỉ</th>
                        <th style={{ width: "5%" }}>Đăng ký</th>
                        <th style={{ width: "5%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjectsFilter.map(subject => (
                            <tr key={subject.id} className={subject.isRegistered ? "table-success" : ""}>
                                <td>{subject.ten}</td>
                                <td>{subject.tenGV}</td>
                                <td className="text-center">{subject.soTinChi}</td>
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
    registerSubject(subject) {
        window.axios.post(window.API + "/subject/" + subject.id + "/register/phase1").then(result => {
            if (result.data.success) {
                this.getSubjects();
                this.getRegisteredSubjects();
            }
        })

    }
    unregisterSubject(subject) {
        window.axios.post(window.API + "/subject/" + subject.id + "/register/cancel/phase1").then(result => {
            if (result.data.success) {
                this.getSubjects();
                this.getRegisteredSubjects();
            }
        })
    }
    getSubjects() {
        window.axios.get(window.API + "/subjects/available/phase1").then(result => {
            if (result.data.success) {
                this.setState({
                    subjects: result.data.data
                });
            }
        })
    }
    getRegisteredSubjects() {
        window.axios.get(window.API + "/subjects/registered/phase1").then(result => {
            if (result.data.success) {
                this.setState({
                    registeredSubjects: result.data.data
                });
            }
        })

    }
}


export default SubjectList1;