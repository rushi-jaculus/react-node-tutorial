import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [a, set_a] = useState(0);
  const [b, set_b] = useState(0);
  const [c, set_c] = useState(0);

  //database
  const [name, set_name] = useState("");
  const [location, set_location] = useState("");
  const [student_list, set_student_list] = useState([]);

  const [test_api_response, set_test_api_response] = useState([]);
  let baseurl = "http://localhost:5000/";
  let testendpoint = baseurl + "test";
  let calculateendpoint = baseurl + "calculate";
  let studentadd = baseurl + "student/add";
  let studnetlist = baseurl + "student/list";
  let studnetdelete = baseurl + "student/delete";

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

    load_student_list();
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

  const add_student = () => {
    let data = JSON.stringify({
      name: name,
      location: location,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: studentadd,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.success) {
          alert("Student Added");
          load_student_list();
        } else {
          alert("Error in API");
        }
      })
      .catch((error) => {
        alert("Error in API");
      });
  };
  const load_student_list = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: studnetlist,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.success) {
          set_student_list(response.data?.result);
        } else {
          alert("Error in API");
        }
      })
      .catch((error) => {
        alert("Error in API");
      });
  };
  const student_delete = (student_id) => {
    let data = JSON.stringify({
      id: student_id,
    });

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: studnetdelete,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.success) {
          load_student_list();
        } else {
          alert("Error in API");
        }
      })
      .catch((error) => {
        alert("Error in API");
      });
  };
  return (
    <div className="App">
      <h1>Get Test API Response</h1>
      {JSON.stringify(test_api_response)}
      <br />
      ############
      <h1>Post Calculate API Response</h1>
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
      Result : {c}
      <br />
      ############
      <h1>Student CRUD with Mysql DB</h1>
      Student Detail
      <br />
      Name :{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => set_name(e.target.value)}
      />
      <br />
      Location :{" "}
      <input
        type="text"
        value={location}
        onChange={(e) => set_location(e.target.value)}
      />
      <br />
      <button onClick={() => add_student()}>Add Student</button>
      <br />
      <center>
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Location</th>
            <th>delete</th>
          </tr>
          {student_list.map((item) => {
            return (
              <tr>
                <td>{item?.student_id}</td>
                <td>{item?.name}</td>
                <td>{item?.location}</td>
                <td>
                  <button onClick={() => student_delete(item.student_id)}>
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </center>
    </div>
  );
}

export default App;
