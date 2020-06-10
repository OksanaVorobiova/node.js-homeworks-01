const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contact = JSON.parse(data).find(({ id }) => id === contactId);
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const updatedData = JSON.parse(data).filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(updatedData, null, 2), (err) => {
      if (err) {
        throw error;
      }
      console.log("Contact was successfully removed");
    });
  });
}

function addContact(name, email, phone) {
  const newContact = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const newListContacts = [...JSON.parse(data), newContact];
    fs.writeFile(
      contactsPath,
      JSON.stringify(newListContacts, null, 2),
      (err) => {
        if (err) {
          throw error;
        }
        console.log("Contact was successfully added");
      }
    );
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
