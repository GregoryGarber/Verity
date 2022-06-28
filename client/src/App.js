//if there are changes to os template then do -- oc process -f openshift-template.yml | oc apply -f -

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import { configuration } from './config.js';
// import { env } from 'process';

function App() {
  const [test, updateTest] = useState("Poo")
  const environment = configuration.url;
  console.log(configuration)


  useEffect(() => {
    async function testing() {
      // await axios.get(environment + '/health', {mode:'cors'})
      //   .then(res => console.log(res))
      //   // .then(res => updateTest(res))
    

      await axios.post(environment + '/test2', {"test1": 2})
        .then(res => console.log(res))
    }
    testing()
  }, [environment])

  return (
    <div className="App">
     {test}
     <p>Environment: { environment }</p>
     ligma2
    </div>
  );
}

export default App;
