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
    

      // await axios.post(environment + '/createContact', {"test1": 2})
      //   .then(res => console.log(res))
      await axios.delete(environment + "/deleteContact?ID=62fd599084d38020725c2ca5")
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
