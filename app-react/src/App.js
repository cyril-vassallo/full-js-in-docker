import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'



function App() {
  const [apiResult, setApiResult ] = useState({ 
    linkLabel: 'See express api here', 
    endpoint: null
  })

  const getAuthor = () => {
    fetch("http://localhost:8080")
      .then(function(response) { 
        return response.json()
      }).then(function(data) {
        console.log(data)
        setApiResult(data)
      })

  }

  useEffect(() => {
    getAuthor();
  },[]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={apiResult.endpoint}
          target="_blank"
          rel="noopener noreferrer"
        >
            {apiResult.linkLabel}
        </a>
      </header>
    </div>
  );
}

export default App;
