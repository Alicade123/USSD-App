const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
  // Read the variables sent via POST from our API
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON Welcome To Alicade's USSD App
    Choose Language(Hitamo Ururimi):
        1. English
        2. IKinyarwa
        3. French `;
  } else if (text == "1") {
    // Business logic for first level response
    response = `CON Choose account information you want to view
        1. 
        2.
        3.
        4.
        5.`;
  } else if (text == "2") {
    // Business logic for first level response
    // This is a terminal request. Note how we start the response with END
    response = `END Your phone number is ${phoneNumber}`;
  } else if (text == "1*1") {
    // This is a second level response where the user selected 1 in the first instance
    const accountNumber = "ACC100101";
    // This is a terminal request. Note how we start the response with END
    response = `END Your account number is ${accountNumber}`;
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`The USSD App is Listening To Port:${PORT}`);
});
