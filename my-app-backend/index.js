const express = require("express");
const cors = require("cors");

const port = 5000;
const app = express();
//post in json response
app.use(express.json());
app.use(
  cors({
    //for allow all clients listening
    origin: ["http://localhost:3000"],
  })
);

app.listen(port, () => console.log(`listen on post ${port}`));

app.get("/test", (req, res) => {
  return res.json({
    apitest: "My App Backend API is Working",
    myname: "test data",
  });
});

app.post("/calculate", (req, res) => {
  const { a, b, type } = req.body;
  let a_num = parseInt(a);
  let b_num = parseInt(b);
  let c_num = 0;
  if (type == "add") {
    c_num = a_num + b_num;
  } else if (type == "sub") {
    c_num = a_num - b_num;
  } else if (type == "mul") {
    c_num = a_num * b_num;
  } else if (type == "div") {
    c_num = a_num / b_num;
  }
  return res.json({
    calculation: c_num,
  });
});

app.get("/calculate", (req, res) => {
  return res.json({
    response: "calculation get",
  });
});

//database
const mysql = require("mysql");
const db_host = "localhost";
const db_user = "root";
const db_password = "";
const db_database = "tutorial_student";
const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_database,
  charset: "utf8mb4",
});

app.post("/student/add", (req, res) => {
  const { name, location } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ apires: "Database_Issue" });
    } else {
      connection.query(
        `insert into student (name,location) ` +
          `values('${name}','${location}');`,
        (err, rows) => {
          if (!err) {
            return res.json({ success: true, apires: "Added" });
          } else {
            return res.json({ apires: "Database_Issue" });
          }
        }
      );
    }
  });
});

app.get("/student/list", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ apires: "Database_Issue" });
    } else {
      connection.query(`select * from student;`, (err, rows) => {
        if (!err) {
          return res.json({ success: true, apires: "List", result: rows });
        } else {
          return res.json({ apires: "Database_Issue" });
        }
      });
    }
  });
});

app.put("/student/update", (req, res) => {
  const { id, name, location } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ apires: "Database_Issue" });
    } else {
      connection.query(
        `update student set name='${name}', location='${location}' where student_id='${id}';`,
        (err, rows) => {
          if (!err) {
            return res.json({ success: true, apires: "Updated" });
          } else {
            return res.json({ apires: "Database_Issue" });
          }
        }
      );
    }
  });
});

app.delete("/student/delete", (req, res) => {
  const { id } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ apires: "Database_Issue" });
    } else {
      connection.query(
        `delete from student where student_id='${id}';`,
        (err, rows) => {
          if (!err) {
            return res.json({ success: true, apires: "Deleted" });
          } else {
            return res.json({ apires: "Database_Issue" });
          }
        }
      );
    }
  });
});
