import React, { useState } from 'react';
import Apps from './components/apps'

function App() {
  const [app, setApp] = useState({});
  const handleChange = app => {
    setApp(app);
  };

  return (
    <div className="App">
      {!Object.keys(app).length ? <Apps key={1} handleChange = {handleChange} /> : <h1>{app.name}</h1>}
    </div>
  );
}

export default App;
