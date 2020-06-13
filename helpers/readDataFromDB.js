const fsPromises = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "../", "db", "contacts.json");

function readDataFromDb() {
  return fsPromises
    .readFile(contactsPath, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((error) => console.log(error));
}

module.exports = readDataFromDb;