//if there are changes to os template then do -- oc process -f openshift-template.yml | oc apply -f -

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { configuration } from './config.js';

function App() {
  const [test, updateTest] = useState("Poo")
  const environment = configuration.url;
  console.log(configuration)


  useEffect(() => {
    async function testing() {
      await axios.get(environment + '/test', {mode:'cors'})
        .then(res => updateTest(res.data.msg))
    }
    testing()
  }, [])

  return (
    <div className="App">
     {test}
     <p>Environment: { environment }</p>
     ligma
    </div>
  );
}

export default App;
