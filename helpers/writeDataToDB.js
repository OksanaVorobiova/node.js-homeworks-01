const fsPromises = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "../", "db", "contacts.json");

function writeDataToDb(updatedData) {
  return fsPromises
    .writeFile(contactsPath, updatedData, 'utf8')
    .catch((error) => console.log(error));
}

module.exports = writeDataToDb;