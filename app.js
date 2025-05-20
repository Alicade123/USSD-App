const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  const textValue = text.split("*");
  const level = textValue.length;

  let response = "";

  if (text === "") {
    response = `CON Welcome to Alicade's Bank
Choose Language (Ururimi):
1. English
2. IKinyarwanda
3. French`;
  }

  // English path
  else if (text === "1") {
    response = `CON Main Menu:
1. Account Info
2. Balance Inquiry
3. Airtime Top-up
4. Transfer Funds
5. Contact Support`;
  }

  // English > Account Info
  else if (text === "1*1") {
    response = `END Account Number: ACC20231234
Name: Alicade ABITURIJE DUSABE`;
  }

  // English > Balance Inquiry
  else if (text === "1*2") {
    response = `END Your balance is: RWF 1,108,450`;
  }

  // English > Airtime Top-up
  else if (text === "1*3") {
    response = `CON Enter amount to top up:`;
  } else if (textValue[0] === "1" && textValue[1] === "3" && level === 3) {
    const amount = textValue[2];
    response = `END You have successfully topped up RWF ${amount}`;
  }

  // English > Transfer Funds
  else if (text === "1*4") {
    response = `CON Enter recipient phone number:`;
  } else if (textValue[0] === "1" && textValue[1] === "4" && level === 3) {
    response = `CON Enter amount to transfer:`;
  } else if (textValue[0] === "1" && textValue[1] === "4" && level === 4) {
    const recipient = textValue[2];
    const amount = textValue[3];
    response = `END You have sent RWF ${amount} to ${recipient}`;
  }

  // English > Contact Support
  else if (text === "1*5") {
    response = `END Contact Us:
Email: support@alicade.rw
Tel: +250 782 583 016`;
  }

  // Default fallback
  else {
    response = `END Invalid option. Please try again.`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Alicade's USSD app running on port ${PORT}`);
});
