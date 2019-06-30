
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import SubjectList1 from './subject/List1';
import SubjectList2 from './subject/List2';
import Roadmap from './Roadmap';

import SideBar from './Sidebar/SideBar';
import NavBar from './NavBar';

import $ from 'jquery';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.dataTableInstance = null;
        this.state = {
            subjects: [],
            registeredSubjects: [],
            dataTableInstance: null
        };
        var user = JSON.parse(localStorage.getItem("user"));
        window.axios.defaults.headers.common['Authorization'] = user.id;

    }
    render() {
        const { user } = this.props;
        const mutateUser = ($.isEmptyObject(user)) ? JSON.parse(localStorage.getItem("user")) : user;


        return (
            <Router>

                <div className="wrapper">

                    <SideBar></SideBar>
                    <div className="content">
                        <NavBar user={mutateUser}></NavBar>
                        <Route
                            path="/dashboard/roadmap"
                            render={(props) =>
                                <Roadmap
                                    {...props}
                                    user={mutateUser}
                                />}
                        />
                        <Route path="/dashboard/subjects/register/phase1" component={SubjectList1} />
                        <Route path="/dashboard/subjects/register/phase2" component={SubjectList2} />
                    </div>
                </div>
                <div className="overlay"></div>

            </Router>
        )
    }
    componentDidMount() {
        window.$(function () {
            // Enables popover
            window.$("[data-toggle=popover]").popover();
        });

    }
}

export default Main;