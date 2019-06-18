import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

var api = "http://localhost:8222"

var getData = () => {
  axios.get(api + "/subject").then(result => {
    console.log(result.data);
  })
}

var insertData = () => {
  axios.post(api + "/subject", { subject_name: "new subject" }).then(result => {
    console.log(result);
  });
}

function App() {
  return (
    <div className="App">
      <div><button onClick={getData}>Get Data</button></div>
      <div><button onClick={insertData}>Insert Data</button></div>
    </div>
  );
}

export default App;
