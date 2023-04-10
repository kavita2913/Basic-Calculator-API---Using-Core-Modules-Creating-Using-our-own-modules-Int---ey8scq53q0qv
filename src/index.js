const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// helper function to check if a number is within the valid range
function isWithinRange(num) {
  return num >= -1000000 && num <= 1000000;
}

// helper function to check if a number is a valid number
function isValidNumber(num) {
  return typeof num === "number" && !isNaN(num);
}

// helper function to handle errors
function handleError(res, status, message) {
  res.status(status).json({ status: "error", message });
}

// home page route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// addition route
app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    return handleError(res, 400, "Invalid data types");
  }
  const sum = num1 + num2;
  if (!isWithinRange(sum)) {
    return handleError(res, 400, "Overflow");
  }
  res.json({ status: "success", message: "The sum of given two numbers", sum });
});

// subtraction route
app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    return handleError(res, 400, "Invalid data types");
  }
  const difference = num1 - num2;
  if (!isWithinRange(difference)) {
    return handleError(res, 400, "Underflow");
  }
  res.json({
    status: "success",
    message: "The difference of given two numbers",
    difference,
  });
});

// multiplication route
app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;
  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    return handleError(res, 400, "Invalid data types");
  }
  const result = num1 * num2;
  if (!isWithinRange(result)) {
    return handleError(res, 400, "Overflow");
  }
  res.json({
    status: "success",
    message: "The product of given numbers",
    result,
  });
});

// division route
app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;
  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    return handleError(res, 400, "Invalid data types");
  }
  if (num2 === 0) {
    return handleError(res, 400, "Cannot divide by zero");
  }
  const result = num1 / num2;
  if (!isWithinRange(result)) {
    return handleError(res, 400, "Overflow");
  }
  res.json({
    status: "success",
    message: "The division of given numbers",
    result,
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
