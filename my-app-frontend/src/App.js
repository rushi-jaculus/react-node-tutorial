import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [a, set_a] = useState(0);
  const [b, set_b] = useState(0);
  const [c, set_c] = useState(0);

  const [test_api_response, set_test_api_response] = useState([]);
  let baseurl = "http://localhost:5000/";
  let testendpoint = baseurl + "test";
  let calculateendpoint = baseurl + "calculate";

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: testendpoint,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        set_test_api_response(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculate = (type) => {
    let data = JSON.stringify({
      a: a,
      b: b,
      type: type,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: calculateendpoint,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        set_c(response.data.calculation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>Get Test API Response</h1>
      {JSON.stringify(test_api_response)}
      ############
      <h1>Post Test API Response</h1>
      calculation
      <br />a :{" "}
      <input type="text" value={a} onChange={(e) => set_a(e.target.value)} />
      <br />b :{" "}
      <input type="text" value={b} onChange={(e) => set_b(e.target.value)} />
      <br />
      <button onClick={() => calculate("add")}>Add</button>
      <button onClick={() => calculate("sub")}>Sub</button>
      <button onClick={() => calculate("mul")}>Mul</button>
      <button onClick={() => calculate("div")}>Div</button>
      <br />
      addition : {c}
    </div>
  );
}

export default App;
