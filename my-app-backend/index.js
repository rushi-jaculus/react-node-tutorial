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
