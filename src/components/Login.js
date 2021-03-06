import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
    }
    componentDidMount() {
        this.getStudents();
    }
    componentWillUnmount() {
        // $(function () {
        //     // Enables popover
        //     $("[data-toggle=popover]").popover();
        // });
    }
    render() {
        return (
            <div className="center-login">
                <div className="card ">
                    <div className="card-header text-center">Đăng nhập với ...</div>
                    <div className="card-body">
                        <div className="btn-group-vertical">
                            {this.state.students.map(student =>
                                <button key={student.id} className="btn btn-secondary mt-2" onClick={(e) => this.userLogin(student, e)}>
                                    {(1612000 + student.id) + " - " + student.ten}
                                </button>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    userLogin(user) {
        const { setUser } = this.props;
        window.axios.get(window.API + "/student/" + user.id).then(result => {
            if (result.data.success) {
                user = result.data.data[0];
                console.log(user);
                localStorage.setItem("user", JSON.stringify(user));
                window.axios.defaults.headers.common['Authorization'] = user.id;
                setUser && setUser(user);
                window.location.href = "/dashboard/roadmap";
            }
        });

    }
    getStudents() {
        window.axios.get(window.API + "/students").then(result => {
            if (result.data.success) {
                this.setState({
                    students: result.data.data
                })
            }
        })
    }
}

export default Login;