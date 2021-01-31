import React, { useState } from "react";

import "../../styles.css";
import Header from "../Header";
function Tabuada() {
  const [tab, setTabs] = useState([]);
  const [values, setValues] = useState();

  function handleValues(e) {
    const { name, value } = e.target;
    if (value) {
      setValues(value);
      return;
    }
  }

  function calcTabuada(e) {
    e.preventDefault();
    if (values) {
      let newTabs = [];
      for (let t = 1; t <= 10; t++) {
        let total = values * t;
        newTabs.push(`${values} x ${t} = ${total}`);
      }
      setTabs(newTabs);
    }
  }

  return (
    <>
      <Header />
      <div className="App">
        <div className="content">
          <h2>Tabuada de: </h2>
          <form onSubmit={calcTabuada}>
            <input
              onChange={handleValues}
              type="number"
              name="tabuada"
              id=""
              required
            />
          </form>
          <div className="itens">
            {tab.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Tabuada;
