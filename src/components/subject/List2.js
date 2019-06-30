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
            { ...subject, isRegistered: this.state.registeredSubjects.some(registeredSubject => subject.id === registeredSubject.id) }
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
                                        <td className="text-center"><Button variant="success" onClick={this.registerSubject.bind(this)}>Đăng ký</Button></td> :
                                        <td className="text-center"><Button variant="danger" onClick={this.unregisterSubject.bind(this)}>Hủy</Button></td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    registerSubject() {
        let result = {
            responseCode: 0
        }
        if (result.responseCode === 0) {
            this.getSubjects();
            this.getRegisteredSubjects();
        }
    }
    unregisterSubject() {
        let result = {
            responseCode: 0
        }
        if (result.responseCode === 0) {
            this.getSubjects();
            this.getRegisteredSubjects();
        }
    }
    getSubjects() {
        // let config = {
        //     headers: {
        //         authorization: 1
        //     }
        // }
        // axios.get('http://localhost:8000/subjects', config, result => {
        //     this.setState({
        //         subjects: result.data.data
        //     })
        // })
        this.setState({
            subjects: [
                {
                    "id": 1,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 100,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 100,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                },
                {
                    "id": 2,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 200,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 170,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                },
                {
                    "id": 3,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 100,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 100,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                },
                {
                    "id": 4,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 200,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 170,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                },
                {
                    "id": 5,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 100,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 100,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                },
                {
                    "id": 6,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 200,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 170,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                }
            ]
        })
    }
    getRegisteredSubjects() {
        this.setState({
            registeredSubjects: [
                {
                    "id": 1,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 100,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 100,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                },
                {
                    "id": 2,
                    "ten": "NONONO",
                    "soTinChi": 1,
                    "tenGV": "HIHII",
                    "soLuongSVToiDa": 200,
                    "soLuongSVDaDangKyDot1": 150,
                    "soLuongSVDaDangKyDot2": 170,
                    "ngayBatDau": "20-12-2012",
                    "ngayKetThuc": "21-12-2012"
                }
            ]
        })
    }
}


export default SubjectList1;