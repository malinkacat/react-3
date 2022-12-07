import React, { useState } from "react";
import './App.css';
import Widget from './widget';

function App() {
  const [selectedCity, setSelectedCity] = useState();
  const selectCity = (event) => {
    const value = event.target.value;
    setSelectedCity(value);
  };

  return (
    <div className="App">
      <div className="input-container">
        <input onBlur={selectCity}/>
      </div>
      <Widget city={selectedCity} />
    </div>
  );
}

export default App;