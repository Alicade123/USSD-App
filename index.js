const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";
  const textValue = text.split("*");

  switch (textValue.length) {
    case 1:
      response = `CON Welcome to My USSD Service
1. Check Balance
2. Buy Airtime`;
      break;
    case 2:
      if (textValue[1] === "1") {
        response = "END Your balance is KES 500";
      } else if (textValue[1] === "2") {
        response = "CON Enter amount to buy airtime";
      } else {
        response = "END Invalid option";
      }
      break;
    case 3:
      response = `END You have bought KES ${textValue[2]} airtime`;
      break;
    default:
      response = "END Invalid input";
      break;
  }

  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`USSD app running on port ${PORT}`);
});
