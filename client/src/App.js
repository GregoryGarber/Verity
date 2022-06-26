import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [test, updateTest] = useState("Poo")

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
    </div>
  );
}

export default App;
