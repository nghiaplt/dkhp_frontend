import React from 'react';
import './App.css';


import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";

import axios from "axios";
window.axios = axios;
window.API = "http://localhost:8222";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    window.$(function () {
      // Enables popover
      window.$("[data-toggle=popover]").popover();
    });
  }
  render() {
    return (
      <Router>

        <Route exact path="/" render={() => (
          < Redirect to="/login" />
        )} />
        <Route
          path="/login"
          render={(props) =>
            <Login
              {...props}
              setUser={(user) => { this.setState({ user }) }}
            />}
        />
        <Route
          path="/dashboard/*"
          render={(props) =>
            <Main
              {...props}
              user={this.state.user}
            />} />

      </Router>
    );
  }
}



// function App() {
//   return (
//     <div className="App">
//       <div><button onClick={getData}>Get Data</button></div>
//       <div><button onClick={insertData}>Insert Data</button></div>
//     </div>
//   );
// }

export default App;
