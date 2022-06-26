import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { configuration } from './config.js';

function App() {
  const [test, updateTest] = useState("Poo")
  const environment = configuration.URL;

  useEffect(() => {
    async function testing() {
      await axios.get('http://localhost:8082/test')
        .then(res => updateTest(res.data))
    }
    testing()
  }, [])

  return (
    <div className="App">
     {test}
     <p>Environment: { environment }</p>
    </div>
  );
}

export default App;
