const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  const textArray = text.split("*");
  const level = textArray.length;
  const input = textArray[textArray.length - 1];

  let response = "";

  if (text === "") {
    response = `CON Welcome to Alicade's Bank\nChoose Language:\n1. English\n2. Ikinyarwanda\n3. French`;
  } else if (text === "1") {
    response = getEnglishMenu();
  } else if (text === "2") {
    response = getKinyarwandaMenu();
  } else if (text === "3") {
    response = getFrenchMenu();
  } else if (text.startsWith("1*")) {
    response = handleEnglishFlow(textArray);
  } else if (text.startsWith("2*")) {
    response = handleKinyarwandaFlow(textArray);
  } else if (text.startsWith("3*")) {
    response = handleFrenchFlow(textArray);
  } else {
    response = `END Invalid option. Please try again.`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

// English Flow
function getEnglishMenu() {
  return `CON Main Menu:\n1. Account Info\n2. Balance Inquiry\n3. Airtime Top-up\n4. Transfer Funds\n5. Contact Support\n0. Back`;
}

function handleEnglishFlow(textArray) {
  const level = textArray.length;
  const [lang, opt1, opt2, opt3] = textArray;
  if (textArray.includes("0")) return getEnglishMenu();

  switch (opt1) {
    case "1":
      return `END Account Number: ACC20231234\nName: Alicade ABITURIJE DUSABE`;
    case "2":
      return `END Your balance is: RWF 1,108,450`;
    case "3":
      if (level === 2) return `CON Enter amount to top-up:`;
      return `END You have topped up RWF ${opt2}`;
    case "4":
      if (level === 2) return `CON Enter recipient number:`;
      if (level === 3) return `CON Enter amount to transfer:`;
      return `END You sent RWF ${opt3} to ${opt2}`;
    case "5":
      return `END Contact:\nEmail: support@alicade.rw\nTel: +250 782 583 016`;
    default:
      return `END Invalid option. Please try again.`;
  }
}

// Kinyarwanda Flow
function getKinyarwandaMenu() {
  return `CON Ihitamo ry'ibanze:\n1. Konti Yanjye\n2. Reba Umutungo\n3. Kugura Airtime\n4. Ohereza Amafaranga\n5. Serivisi Y'Ubufasha\n0. Subira inyuma`;
}

function handleKinyarwandaFlow(textArray) {
  const level = textArray.length;
  const [lang, opt1, opt2, opt3] = textArray;
  if (textArray.includes("0")) return getKinyarwandaMenu();

  switch (opt1) {
    case "1":
      return `END Nimero ya Konti: ACC20231234\nIzina: Alicade ABITURIJE DUSABE`;
    case "2":
      return `END Umutungo wawe ni: RWF 1,108,450`;
    case "3":
      if (level === 2) return `CON Andika amafaranga ushaka kugura:`;
      return `END Waguriye Airtime RWF ${opt2}`;
    case "4":
      if (level === 2) return `CON Andika nimero wohereza:`;
      if (level === 3) return `CON Andika amafaranga wohereza:`;
      return `END Wohereje RWF ${opt3} kuri ${opt2}`;
    case "5":
      return `END Duhamagare:\nEmail: support@alicade.rw\nTel: +250 782 583 016`;
    default:
      return `END Hitamo ikosa. Ongera ugerageze.`;
  }
}

// French Flow
function getFrenchMenu() {
  return `CON Menu Principal:\n1. Informations du Compte\n2. Solde\n3. Recharger Crédit\n4. Transférer Fonds\n5. Support Technique\n0. Retour`;
}

function handleFrenchFlow(textArray) {
  const level = textArray.length;
  const [lang, opt1, opt2, opt3] = textArray;
  if (textArray.includes("0")) return getFrenchMenu();

  switch (opt1) {
    case "1":
      return `END Numéro de Compte: ACC20231234\nNom: Alicade ABITURIJE DUSABE`;
    case "2":
      return `END Votre solde est: RWF 1,108,450`;
    case "3":
      if (level === 2) return `CON Entrez le montant à recharger:`;
      return `END Vous avez rechargé RWF ${opt2}`;
    case "4":
      if (level === 2) return `CON Entrez le numéro du destinataire:`;
      if (level === 3) return `CON Entrez le montant à transférer:`;
      return `END Vous avez envoyé RWF ${opt3} à ${opt2}`;
    case "5":
      return `END Contactez-nous:\nEmail: support@alicade.rw\nTel: +250 782 583 016`;
    default:
      return `END Option invalide. Réessayez.`;
  }
}

app.listen(PORT, () => {
  console.log(`Alicade's USSD app running on port ${PORT}`);
});
