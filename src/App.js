import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import SubjectList from './components/subject/List';
import SubjectDetails from './components/subject/Details';
import Home from './components/Home';

import SideBar from './components/Sidebar/SideBar';
import NavBar from './components/NavBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <Router>
            <SideBar></SideBar>
            <div className="content">
              <NavBar></NavBar>
              <Route path="/" render={() => (
                < Redirect to="/subjects" />
              )} />
              <Route path="/home" component={Home} />
              <Route path="/subjects" component={SubjectList} />
              <Route path="/subject/details" component={SubjectDetails} />
            </div>
          </Router>
        </div>
        <div className="overlay"></div>
      </div>
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
